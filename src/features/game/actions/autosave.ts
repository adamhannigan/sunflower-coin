import { removeSession } from "features/auth/actions/login";
import { wallet } from "lib/blockchain/wallet";
import { CONFIG } from "lib/config";
import { ERRORS } from "lib/errors";
import { sanitizeHTTPResponse } from "lib/network";
import { GameEventName, PlacementEvent, PlayingEvent } from "../events";
import { PastAction } from "../lib/gameMachine";
import { makeGame } from "../lib/transforms";
import { getSessionId } from "./loadSession";
import Decimal from "decimal.js-light";
import { SeedBoughtAction } from "../events/landExpansion/seedBought";

type Request = {
  actions: PastAction[];
  farmId: number;
  sessionId: string;
  token: string;
  offset: number;
  fingerprint: string;
  deviceTrackerId: string;
  transactionId: string;
};

const API_URL = CONFIG.API_URL;

const EXCLUDED_EVENTS: GameEventName<PlayingEvent | PlacementEvent>[] = [
  "expansion.revealed",
  "bot.detected",
];

/**
 * Squashes similar events into a single event
 * Filters out UI only events
 */
function squashEvents(events: PastAction[]): PastAction[] {
  return events.reduce((items, event, index) => {
    if (EXCLUDED_EVENTS.includes(event.type)) {
      return items;
    }

    if (index > 0) {
      const previous = items[items.length - 1];

      const isShopEvent =
        event.type === "seed.bought" && previous.type === "seed.bought";

      // We can combine the amounts when buying/selling the same item
      if (isShopEvent && event.item === previous.item) {
        return [
          ...items.slice(0, -1),
          {
            ...event,
            amount: new Decimal((previous as SeedBoughtAction).amount)
              .plus(new Decimal(event.amount))
              .toNumber(),
          } as PastAction,
        ];
      }
    }

    return [...items, event];
  }, [] as PastAction[]);
}

function serialize(events: PastAction[], offset: number) {
  return events.map((action) => ({
    ...action,
    createdAt: new Date(action.createdAt.getTime() + offset).toISOString(),
  }));
}

export async function autosaveRequest(
  request: Omit<Request, "actions" | "offset"> & { actions: any[] }
) {
  const ttl = (window as any)["x-amz-ttl"];

  // Useful for using cached results
  const cachedKey = getSessionId();

  return await window.fetch(`${API_URL}/autosave/${request.farmId}`, {
    method: "POST",
    headers: {
      ...{
        "content-type": "application/json;charset=UTF-8",
        Authorization: `Bearer ${request.token}`,
        "X-Fingerprint": request.fingerprint,
        "X-Transaction-ID": request.transactionId,
      },
      ...(ttl ? { "X-Amz-TTL": (window as any)["x-amz-ttl"] } : {}),
    },
    body: JSON.stringify({
      sessionId: request.sessionId,
      actions: request.actions,
      clientVersion: CONFIG.CLIENT_VERSION as string,
      cachedKey,
      deviceTrackerId: request.deviceTrackerId,
    }),
  });
}

export async function autosave(request: Request) {
  if (!API_URL) return { verified: true };

  console.log({ events: request.actions });
  // Shorten the payload
  const events = squashEvents(request.actions);

  // Serialize values before sending
  const actions = serialize(events, request.offset);

  if (actions.length === 0) {
    return { verified: true };
  }

  const response = await autosaveRequest({
    ...request,
    actions,
  });

  if (response.status === 503) {
    throw new Error(ERRORS.MAINTENANCE);
  }

  if (response.status === 401) {
    removeSession(wallet.myAccount as string);
  }

  if (response.status === 429) {
    throw new Error(ERRORS.TOO_MANY_REQUESTS);
  }

  if (response.status !== 200 || !response.ok) {
    const data = await response.json();
    console.log({ data });

    throw new Error(ERRORS.AUTOSAVE_SERVER_ERROR);
  }

  const { farm, changeset } = await sanitizeHTTPResponse<{
    farm: any;
    changeset: any;
  }>(response);

  const game = makeGame(farm);

  return { verified: true, farm: game, changeset };
}
