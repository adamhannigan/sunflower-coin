import React, { useState } from "react";

import { Panel } from "components/ui/Panel";
import { Modal } from "react-bootstrap";
import { getKeys } from "features/game/types/craftables";

import { Recipes } from "../../ui/Recipes";
import {
  Consumable,
  ConsumableName,
  CONSUMABLES,
} from "features/game/types/consumables";
import { MachineInterpreter } from "features/island/buildings/lib/craftingMachine";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCook: (name: ConsumableName) => void;
  crafting: boolean;
  craftingService?: MachineInterpreter;
}
export const KitchenModal: React.FC<Props> = ({
  isOpen,
  onCook,
  onClose,
  crafting,
  craftingService,
}) => {
  const kitchenRecipes = getKeys(CONSUMABLES).reduce((acc, name) => {
    if (CONSUMABLES[name].building !== "Kitchen") {
      return acc;
    }

    return [...acc, CONSUMABLES[name]];
  }, [] as Consumable[]);
  const [selected, setSelected] = useState<Consumable>(kitchenRecipes[0]);

  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Panel
        bumpkinParts={{
          body: "Light Brown Farmer Potion",
          hair: "Explorer Hair",
          pants: "Lumberjack Overalls",
          shirt: "Blue Farmer Shirt",
          tool: "Axe",
          background: "Farm Background",
          shoes: "Black Farmer Boots",
        }}
      >
        <Recipes
          selected={selected}
          setSelected={setSelected}
          recipes={kitchenRecipes}
          onCook={onCook}
          onClose={onClose}
          crafting={crafting}
          craftingService={craftingService}
        />
      </Panel>
    </Modal>
  );
};
