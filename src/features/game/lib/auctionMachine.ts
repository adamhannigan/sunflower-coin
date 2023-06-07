import { createMachine, Interpreter, assign } from "xstate";
import { escalate, sendParent } from "xstate/lib/actions";
import { randomID } from "lib/utils/random";
import { bid } from "features/game/actions/bid";
import { GameState, InventoryItemName } from "features/game/types/game";
import { getAuctionResults } from "features/game/actions/getAuctionResults";
import { autosave } from "features/game/actions/autosave";
import { mintAuctionItem } from "features/game/actions/mintAuctionItem";
import { BumpkinItem } from "../types/bumpkin";

export type AuctionBase = {
  auctionId: string;
  startAt: number;
  endAt: number;
  supply: number;
  sfl: number;
  ingredients: Partial<Record<InventoryItemName, number>>;
  type: "collectible" | "wearable";
};

export type AuctioneerItemName = BumpkinItem | InventoryItemName;

type CollectibleAuction = AuctionBase & {
  type: "collectible";
  collectible: InventoryItemName;
};

type WearableAuction = AuctionBase & {
  type: "wearable";
  wearable: BumpkinItem;
};

export type Auction = CollectibleAuction | WearableAuction;

export interface Context {
  farmId: number;
  sessionId: string;
  token: string;
  deviceTrackerId: string;
  bid?: GameState["auctioneer"]["bid"];
  auctions: Auction[];
  auctionId: string;
  transactionId?: string;
  results?: {
    status: "loser" | "winner" | "pending";
    minimum: {
      tickets: number;
      experience: number;
    };
    participantCount: number;
    supply: number;
  };
}

type BidEvent = {
  type: "BID";
  item: AuctioneerItemName;
  tickets: number;
};

type MintEvent = {
  type: "MINT";
  item: AuctioneerItemName;
};

export type MintedEvent = {
  item: AuctioneerItemName;
  sessionId: string;
};

type RefreshEvent = {
  type: "REFRESH";
};

export type BlockchainEvent =
  | BidEvent
  | RefreshEvent
  | { type: "DRAFT_BID" }
  | { type: "CHECK_RESULTS" }
  | { type: "MINT" }
  | { type: "REFUND" };

export type AuctioneerMachineState = {
  value:
    | "loading"
    | "initialising"
    | "playing"
    | "draftingBid"
    | "bidding"
    | "bidded"
    | "checkingResults"
    | "loser"
    | "refunding"
    | "refunded"
    | "pending"
    | "winner"
    // TODO - minting in parent machines
    | "minting"
    | "minted";
  context: Context;
};

export type MachineInterpreter = Interpreter<
  Context,
  any,
  BlockchainEvent,
  AuctioneerMachineState
>;

export const auctioneerMachine = createMachine<
  Context,
  BlockchainEvent,
  AuctioneerMachineState
>(
  {
    id: "auctioneerMachine",
    initial: "loading",
    states: {
      loading: {
        entry: "setTransactionId",
        invoke: {
          src: async (context, event) => {
            const { item, tickets } = event as BidEvent;

            console.log({ event });
            const auctions: any[] = [];

            return {
              auctions,
            };
          },
          onDone: {
            target: "initialising",
            actions: [
              assign({
                auctions: (_, event) => event.data.auctions,
              }),
            ],
          },
          onError: {
            target: "error",
          },
        },
      },
      initialising: {
        always: [
          {
            target: "bidded",
            cond: (context) => !!context.bid,
          },
          {
            target: "playing",
          },
        ],
      },
      playing: {
        entry: "clearTransactionId",
        on: {
          DRAFT_BID: {
            target: "draftingBid",
          },
        },
      },
      draftingBid: {
        on: {
          BID: {
            target: "bidding",
          },
        },
      },
      bidding: {
        entry: "setTransactionId",
        invoke: {
          src: async (context, event) => {
            const { item, tickets } = event as BidEvent;

            console.log({ event });
            const { game } = await bid({
              farmId: Number(context.farmId),
              token: context.token as string,
              auctionId: context.auctionId,
              transactionId: context.transactionId as string,
              tickets,
            });

            return {
              inventory: game.inventory,
              balance: game.balance,
              bid: game.auctioneer.bid,
            };
          },
          onDone: {
            target: "bidded",
            actions: [
              sendParent((context, event) => ({
                type: "UPDATE_SESSION",
                inventory: event.data.inventory,
                balance: event.data.balance,
                sessionId: context.sessionId,
                deviceTrackerId: context.deviceTrackerId,
              })),
              assign({
                bid: (_, event) => event.data.bid,
              }),
            ],
          },
          onError: {
            actions: escalate((_, event) => ({
              message: event.data.message,
            })),
          },
        },
      },
      bidded: {
        on: {
          CHECK_RESULTS: "checkingResults",
          REFRESH: "finish",
        },
      },
      checkingResults: {
        entry: "setTransactionId",
        invoke: {
          src: async (context, event) => {
            const auctionResult = await getAuctionResults({
              farmId: Number(context.farmId),
              token: context.token as string,
              auctionId: context.bid?.auctionId as string,
              transactionId: context.transactionId as string,
            });

            return { auctionResult };
          },
          onDone: [
            {
              cond: (_, event) => event.data.auctionResult.status === "winner",
              target: "winner",
            },
            {
              cond: (_, event) => event.data.auctionResult.status === "loser",
              target: "loser",
              actions: assign({
                results: (_, event) => event.data.auctionResult,
              }),
            },
            {
              target: "pending",
            },
          ],
          onError: {
            actions: escalate((_, event) => ({
              message: event.data.message,
            })),
          },
        },
      },

      winner: {
        on: {
          MINT: "minting",
        },
      },

      minting: {
        entry: "setTransactionId",
        invoke: {
          src: async (context, event) => {
            const { item } = event as MintEvent;
            console.log({ event });
            const { sessionId } = await mintAuctionItem({
              farmId: Number(context.farmId),
              sessionId: context.sessionId as string,
              token: context.token as string,
              auctionId: context.bid?.auctionId as string,
              transactionId: context.transactionId as string,
            });

            return {
              sessionId,
              item,
            } as MintedEvent;
          },
          onDone: {
            target: "minted",
            actions: assign((_, event) => ({
              sessionId: event.data.sessionId,
              actions: [],
            })),
          },
          onError: {
            target: "error",
          },
        },
      },
      minted: {
        on: {
          REFRESH: "finish",
        },
      },

      loser: {
        on: {
          REFUND: "refunding",
        },
      },

      pending: {},

      refunding: {
        entry: "setTransactionId",
        invoke: {
          src: async (context, event) => {
            console.log({ event });
            try {
              const { farm } = await autosave({
                farmId: Number(context.farmId),
                sessionId: context.sessionId as string,
                actions: [
                  {
                    type: "bid.refunded",
                    createdAt: new Date(),
                  } as any,
                ],
                token: context.token as string,
                fingerprint: "0x",
                deviceTrackerId: context.deviceTrackerId as string,
                transactionId: context.transactionId as string,
              });

              return {
                inventory: farm?.inventory,
                balance: farm?.balance,
                sessionId: context.sessionId,
                deviceTrackerId: context.deviceTrackerId,
              };
            } catch (e) {
              console.log(`e: `, e);
            }
          },
          onDone: {
            target: "refunded",
          },
          onError: {
            target: "error",
          },
        },
      },

      refunded: {
        on: {
          REFRESH: "finish",
        },
      },

      finish: {
        type: "final",
      },
      error: {},
    },
  },
  {
    actions: {
      setTransactionId: assign<Context, any>({
        transactionId: () => randomID(),
      }),
      clearTransactionId: assign<Context, any>({
        transactionId: () => randomID(),
      }),
    },
  }
);
