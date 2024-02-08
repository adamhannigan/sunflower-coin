import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { NPCName, NPC_WEARABLES } from "lib/npcs";
import React, { useContext, useEffect, useState } from "react";
import { Label } from "components/ui/Label";
import { SUNNYSIDE } from "assets/sunnyside";
import { Context } from "features/game/GameProvider";
import { useActor } from "@xstate/react";
import {
  Airdrop,
  Bumpkin,
  GameState,
  Inventory,
  InventoryItemName,
  Order,
  Reward,
} from "features/game/types/game";
import { Button } from "components/ui/Button";

import giftIcon from "assets/icons/gift.png";
import walletIcon from "assets/icons/wallet.png";
import chatDisc from "assets/icons/chat_disc.png";
import box from "assets/icons/box.png";
import flowerGift from "assets/icons/flower_gift.png";
import sfl from "assets/icons/token_2.png";
import chest from "assets/icons/chest.png";

import Decimal from "decimal.js-light";
import { OuterPanel, Panel } from "components/ui/Panel";
import classNames from "classnames";
import { getKeys } from "features/game/types/craftables";
import { RequirementLabel } from "components/ui/RequirementsLabel";
import { getOrderSellPrice } from "features/game/events/landExpansion/deliver";
import { getSeasonalTicket } from "features/game/types/seasons";
import { ITEM_DETAILS } from "features/game/types/images";
import { ResizableBar } from "components/ui/ProgressBar";
import { FLOWERS, FlowerName } from "features/game/types/flowers";
import { Box } from "components/ui/Box";
import { ClaimReward } from "features/game/expansion/components/ClaimReward";

export const Dialogue: React.FC<{
  message: string;
  trail?: number;
}> = ({ message, trail = 30 }) => {
  const [displayedMessage, setDisplayedMessage] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < message.length) {
        const newDisplayedMessage = message.substring(0, currentIndex + 1);
        setDisplayedMessage(newDisplayedMessage);
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, trail);

    return () => {
      clearInterval(interval);
    };
  }, [message, trail, currentIndex]);

  return <div className="leading-[1] text-[16px]">{displayedMessage}</div>;
};

const CONTENT_HEIGHT = 350;

export const SpecialEventBumpkin: React.FC = () => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [reward, setReward] = useState<Airdrop>();
  const [showWallet, setShowWallet] = useState(false);
  const [showLink, setShowLink] = useState(false);

  const name: NPCName = "pumpkin' pete";

  const { inventory, specialEvents } = gameState.context.state;

  const event = specialEvents.current[getKeys(specialEvents.current)[0]];

  const claimReward = (day: number) => {
    gameService.send("specialEvent.taskCompleted", {
      event: "Lunar New Year",
      task: day,
    });
  };

  if (showLink) {
    return (
      <Panel>
        <div className="p-2">
          <Label icon={giftIcon} type="warning" className="mb-2">
            Congratulations!
          </Label>
          <p className="text-sm mb-2">
            Please fill in the form bellow to claim your airdrop.
          </p>
          <p className="text-xs mb-2">
            Airdrops are handled externally and may take a few days to arrive.
          </p>
        </div>
        <Button>Continue</Button>
      </Panel>
    );
  }

  if (showWallet) {
    return (
      <Panel>
        <div className="p-2">
          <Label icon={walletIcon} type="default" className="mb-2">
            Wallet Required
          </Label>
          <p className="text-sm mb-2">
            A Web3 wallet is required to claim this airdrop
          </p>
          <p className="text-xs mb-2">
            Airdrops are handled externally and may take a few days to arrive.
          </p>
        </div>
        <Button>Continue</Button>
      </Panel>
    );
  }

  if (reward) {
    return (
      <Panel>
        <ClaimReward
          reward={reward}
          onClaim={console.log}
          onClose={console.log}
        />
      </Panel>
    );
  }

  return (
    <CloseButtonPanel
      onClose={console.log}
      bumpkinParts={NPC_WEARABLES["pumpkin' pete"]}
    >
      <>
        <div>
          <div className="flex justify-between items-center mb-3 p-2">
            <Label type="default" icon={SUNNYSIDE.icons.player}>
              {name}
            </Label>
            <Label type="info" className="mr-8" icon={SUNNYSIDE.icons.timer}>
              3 Days Left
            </Label>
          </div>
          <div
            style={{ maxHeight: CONTENT_HEIGHT }}
            className="overflow-y-auto scrollable pr-3 pl-2 "
          >
            <div className="h-16">
              <Dialogue
                trail={25}
                message={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi nec..."
                }
              />
            </div>
            {event?.tasks.map((task, index) => (
              <>
                <div className="flex justify-between items-center mb-2">
                  <Label type="default" icon={SUNNYSIDE.icons.stopwatch}>
                    {`Day ${index + 1}`}
                  </Label>
                  {/* <Label
                    type="warning"
                    icon={challenge.reward.text ? giftIcon : sfl}
                    className=""
                  >
                    {challenge.reward.text ?? "0.15 SFL"}
                  </Label> */}
                </div>

                <OuterPanel
                  className="-ml-2 -mr-2 relative flex flex-col space-y-0.5 mb-3"
                  // onClick={() =>
                  //   setReward({
                  //     items: task.reward.items,
                  //     sfl: task.reward.sfl,
                  //     createdAt: Date.now(),
                  //     id: "1",
                  //     wearables: {},
                  //   })
                  // }
                >
                  {getKeys(task.requirements.items).map((itemName) => {
                    return (
                      <RequirementLabel
                        key={itemName}
                        type="item"
                        item={itemName}
                        balance={inventory[itemName] ?? new Decimal(0)}
                        showLabel
                        requirement={
                          new Decimal(task.requirements.items[itemName] ?? 0)
                        }
                      />
                    );
                  })}
                  <Button onClick={() => claimReward(1)}>Complete</Button>
                </OuterPanel>
              </>
            ))}
          </div>
        </div>
      </>
    </CloseButtonPanel>
  );
};
