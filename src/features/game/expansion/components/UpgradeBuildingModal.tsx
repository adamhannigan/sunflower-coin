import React, { useContext } from "react";
import { Modal } from "components/ui/Modal";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { Context } from "features/game/GameProvider";
import { useSelector } from "@xstate/react";
import { MachineState } from "features/game/lib/gameMachine";
import { Button } from "components/ui/Button";
import { NPC_WEARABLES } from "lib/npcs";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { getKeys } from "features/game/types/craftables";
import { SUNNYSIDE } from "assets/sunnyside";
import { Label } from "components/ui/Label";
import { InnerPanel } from "components/ui/Panel";
import { RequirementLabel } from "components/ui/RequirementsLabel";
import Decimal from "decimal.js-light";
import {
  BUILDING_UPGRADES,
  BuildingLevel,
} from "features/game/events/landExpansion/upgradeBuilding";
import { AnimalBuildingType } from "features/game/types/animals";
import { InlineDialogue } from "features/world/ui/TypingMessage";

interface Props {
  buildingName: AnimalBuildingType;
  level: Exclude<BuildingLevel, 1>;
  show: boolean;
  onClose: () => void;
}

const _state = (state: MachineState) => state.context.state;

export const UpgradeBuildingModal: React.FC<Props> = ({
  buildingName,
  level,
  onClose,
  show,
}) => {
  const { gameService } = useContext(Context);

  const state = useSelector(gameService, _state);
  const { t } = useAppTranslation();

  const requirements = BUILDING_UPGRADES[buildingName][level];

  const upgrade = () => {
    // Implement the upgrade logic here
    gameService.send("building.upgraded", {
      buildingType: buildingName,
    });

    onClose();
  };

  const hasRequirements = () => {
    // Check if player has enough coins
    if (state.coins < requirements.coins) {
      return false;
    }

    // Check if player has enough items
    return getKeys(requirements.items).every((itemName) => {
      const requiredAmount = requirements.items[itemName] ?? new Decimal(0);
      const playerAmount = state.inventory[itemName] ?? new Decimal(0);
      return playerAmount.gte(requiredAmount);
    });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <CloseButtonPanel
        bumpkinParts={NPC_WEARABLES.blacksmith}
        onClose={onClose}
      >
        <div className="flex flex-col">
          <div className="p-1">
            <Label
              type="default"
              icon={SUNNYSIDE.icons.hammer}
              className="mb-2"
            >
              {t("upgrade")}
            </Label>
            <InlineDialogue
              message={t("upgrade.intro", {
                building: buildingName,
                animals: "chickens",
              })}
            />
          </div>
          <div className="flex flex-col items-start w-full mt-2">
            <Label
              type="default"
              icon={SUNNYSIDE.icons.basket}
              className="ml-1 mb-2"
            >
              {t("requirements")}
            </Label>
            <InnerPanel className="flex flex-wrap gap-2 w-full">
              {getKeys(requirements.items).map((itemName) => (
                <div key={itemName} className="flex-shrink-0 mb-2 mr-2">
                  <RequirementLabel
                    type="item"
                    item={itemName}
                    balance={state.inventory[itemName] ?? new Decimal(0)}
                    requirement={requirements.items[itemName] ?? new Decimal(0)}
                  />
                </div>
              ))}
              <div className="flex-shrink-0 mb-2 mr-2">
                <RequirementLabel
                  type="coins"
                  balance={state.coins}
                  requirement={requirements.coins}
                />
              </div>
            </InnerPanel>
          </div>
          <Button
            className="mt-2"
            onClick={upgrade}
            disabled={!hasRequirements()}
          >
            {t("upgrade.building", { building: buildingName })}
          </Button>
        </div>
      </CloseButtonPanel>
    </Modal>
  );
};
