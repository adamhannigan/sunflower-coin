import React, { useContext, useState } from "react";

import raft from "assets/land/prestige_raft.png";
import springPrestige from "assets/announcements/spring_prestige.png";
import lockIcon from "assets/skills/lock.png";

import { GRID_WIDTH_PX, PIXEL_SCALE } from "features/game/lib/constants";
import { NPC } from "features/island/bumpkin/components/NPC";
import { NPC_WEARABLES } from "lib/npcs";
import { Modal } from "react-bootstrap";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Context } from "features/game/GameProvider";
import { MachineState } from "features/game/lib/gameMachine";
import { MapPlacement } from "./MapPlacement";

import { Button } from "components/ui/Button";
import { SUNNYSIDE } from "assets/sunnyside";
import { ITEM_DETAILS } from "features/game/types/images";
import { Label } from "components/ui/Label";
import { Panel } from "components/ui/Panel";
import { useActor } from "@xstate/react";
import { ISLAND_UPGRADE } from "features/game/events/landExpansion/upgradeFarm";
import { getKeys } from "features/game/types/craftables";

const expansions = (state: MachineState) =>
  state.context.state.inventory["Basic Land"]?.toNumber() ?? 0;

const IslandUpgraderModal: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const { gameService } = useContext(Context);
  const [gameState] = useActor(gameService);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const { island, inventory } = gameState.context.state;
  const upgrade = ISLAND_UPGRADE[island.type];

  const remaindingExpansions =
    upgrade.expansions - (inventory["Basic Land"]?.toNumber() ?? 0);

  const onUpgrade = () => {
    gameService.send("island.explore");
    gameService.send("SAVE");
    setShowSuccess(true);
  };

  if (showConfirmation) {
    return (
      <Panel bumpkinParts={NPC_WEARABLES.grubnuk}>
        <div className="p-2">
          <p className="text-sm">
            Are you sure you want to upgrade to a new island. You will not be
            able to return.
          </p>
          <div className="flex my-2">
            {getKeys(upgrade.items).map((name) => (
              <Label
                icon={ITEM_DETAILS[name].image}
                className="mr-3"
                type="default"
              >{`${upgrade.items[name]} ${name}`}</Label>
            ))}
          </div>
        </div>

        <div className="flex">
          <Button onClick={() => setShowConfirmation(false)}>No</Button>
          <Button className="ml-1" onClick={onUpgrade}>
            Yes
          </Button>
        </div>
      </Panel>
    );
  }

  return (
    <CloseButtonPanel bumpkinParts={NPC_WEARABLES.grubnuk} onClose={onClose}>
      <div className="p-2">
        <div className="flex items-center  mb-2 ">
          <p className="text-sm mr-2">Upgrade Island</p>
          <img src={SUNNYSIDE.icons.heart} className="h-6" />
        </div>
        <p className="text-xs mb-2">
          An exotic island awaits you with new resources and opportunities to
          grow your farm.
        </p>
        <p className="text-xs mb-2">
          Would you like to upgrade? Your resources will be safely transferred
          to your new island.
        </p>
        <img src={springPrestige} className="w-full rounded-md" />

        <div className="flex items-center mt-2 mb-1">
          {remaindingExpansions > 0 && (
            <Label icon={lockIcon} type="danger" className="mr-3">
              Locked
            </Label>
          )}
          {getKeys(upgrade.items).map((name) => (
            <Label
              icon={ITEM_DETAILS[name].image}
              className="mr-3"
              type={
                inventory[name]?.gte(upgrade.items[name] ?? 0)
                  ? "default"
                  : "danger"
              }
            >{`${upgrade.items[name]} x ${name}`}</Label>
          ))}
        </div>
        {remaindingExpansions > 0 && (
          <p className="text-xs">{`You are not ready. Expand ${remaindingExpansions} more times`}</p>
        )}
      </div>
      <Button
        disabled={remaindingExpansions > 0}
        onClick={() => setShowConfirmation(true)}
      >
        Continue
      </Button>
    </CloseButtonPanel>
  );
};

export const IslandUpgrader: React.FC = () => {
  const [showModal, setShowModal] = useState(true);

  return (
    <>
      <Modal show={showModal} centered onHide={() => setShowModal(false)}>
        <IslandUpgraderModal onClose={() => setShowModal(false)} />
      </Modal>

      <MapPlacement x={12} y={0} width={4}>
        <div
          className="absolute cursor-pointer hover:img-highlight"
          onClick={() => setShowModal(true)}
          style={{
            top: `${2 * PIXEL_SCALE}px`,
            left: `${2 * PIXEL_SCALE}px`,
          }}
        >
          <img
            src={raft}
            style={{
              width: `${62 * PIXEL_SCALE}px`,
            }}
          />
          <div
            className="absolute"
            style={{
              top: `${16 * PIXEL_SCALE}px`,
              left: `${24 * PIXEL_SCALE}px`,
              width: `${1 * GRID_WIDTH_PX}px`,
              transform: "scaleX(-1)",
            }}
          >
            <NPC parts={NPC_WEARABLES["grubnuk"]} />
          </div>
        </div>
      </MapPlacement>
    </>
  );
};
