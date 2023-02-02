import React, { useState } from "react";

import { MapPlacement } from "features/game/expansion/components/MapPlacement";

import { Modal } from "react-bootstrap";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { ITEM_DETAILS } from "features/game/types/images";
import { getEntries } from "features/game/types/craftables";
import { Label } from "components/ui/Label";
import { SUNNYSIDE } from "assets/sunnyside";
import { secondsToString } from "lib/utils/time";
import { TREASURES } from "features/game/types/treasure";
import { NPC } from "features/island/bumpkin/components/DynamicMiniNFT";
import { Equipped } from "features/game/types/bumpkin";

enum RarityOrder {
  "rare",
  "good",
  "average",
}

const TREASURE_TROVE_ITEMS = getEntries(TREASURES)
  // Sort by name first
  .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
  // Then sort by rarity
  .sort(
    ([, treasureA], [, treasureB]) =>
      RarityOrder[treasureA.type] - RarityOrder[treasureB.type]
  );

const LIMITED_TREASURE_TROVE_ITEMS = TREASURE_TROVE_ITEMS.filter(
  ([, treasure]) => !!treasure.endDate && treasure.endDate >= Date.now()
);

const UNLIMITED_TREASURE_TROVE_ITEMS = TREASURE_TROVE_ITEMS.filter(
  ([, treasure]) => !treasure.endDate
);

const TreasureTroveItem: React.FC<{
  treasureName: keyof typeof TREASURES;
  rarity: "good" | "average" | "rare";
  endDate?: number;
}> = ({ treasureName, rarity, endDate }) => (
  <div key={treasureName} className="flex justify-between">
    <div className="flex-col space-y-1">
      <div className="flex">
        <div className="w-12 justify-center items-center flex mr-2">
          <img src={ITEM_DETAILS[treasureName].image} className="h-8" />
        </div>
        <div className="justify-center items-center flex">
          <span className="text-sm mb-1">{treasureName}</span>
        </div>
      </div>
      {endDate && (
        <div className="flex items-center">
          <Label type="info" className="flex items-center">
            <img src={SUNNYSIDE.icons.stopwatch} className="w-3 left-0 mr-1" />
            {`${secondsToString((endDate - Date.now()) / 1000, {
              length: "medium",
              isShortFormat: true,
            })} left`}
          </Label>
          <span className="text-xxs ml-2 italic">Time Limited!</span>
        </div>
      )}
    </div>

    <div className="flex items-center">
      {rarity === "rare" && <Label type="warning">Rare</Label>}
      {rarity === "good" && <Label type="info">Uncommon</Label>}
      {rarity === "average" && <Label type="success">Common</Label>}
    </div>
  </div>
);

export const TreasureTrove: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const bumpkin: Equipped = {
    body: "Pirate Potion",
    hair: "White Long Hair",
    hat: "Pirate Hat",
    shirt: "Fancy Top",
    pants: "Pirate Pants",
    tool: "Pirate Scimitar",
    background: "Seashore Background",
    shoes: "Black Farmer Boots",
  };

  return (
    <MapPlacement x={-5} y={1} height={1} width={1}>
      <NPC onClick={() => setShowModal(true)} {...bumpkin} />
      <Modal centered show={showModal} onHide={() => setShowModal(false)}>
        <CloseButtonPanel
          onClose={() => setShowModal(false)}
          title={"Treasure Trove"}
          bumpkinParts={bumpkin}
        >
          <div
            className="flex flex-col p-2 overflow-y-auto scrollable overflow-x-hidden divide-y-2 divide-dashed divide-brown-600"
            style={{ maxHeight: 400 }}
          >
            <div className="pb-2">
              {LIMITED_TREASURE_TROVE_ITEMS.map(([name, treasure]) => (
                <div className="pt-1 space-y-2" key={name}>
                  <TreasureTroveItem
                    treasureName={name}
                    rarity={treasure.type}
                    endDate={treasure.endDate}
                  />
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              {UNLIMITED_TREASURE_TROVE_ITEMS.map(([name, treasure]) => (
                <TreasureTroveItem
                  key={name}
                  treasureName={name}
                  rarity={treasure.type}
                />
              ))}
            </div>
          </div>
        </CloseButtonPanel>
      </Modal>
    </MapPlacement>
  );
};
