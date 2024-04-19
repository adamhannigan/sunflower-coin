import { canChop } from "features/game/events/landExpansion/chop";
import { CHICKEN_TIME_TO_EGG } from "features/game/lib/constants";
import { FruitName } from "features/game/types/fruits";
import { GameState, InventoryItemName } from "features/game/types/game";
import { CropName } from "features/game/types/crops";
import { canMine } from "features/game/events/landExpansion/stoneMine";
import { areUnsupportedChickensBrewing } from "features/game/events/landExpansion/removeBuilding";
import { Bud, StemTrait, TypeTrait } from "./buds";
import {
  isAdvancedCrop,
  isBasicCrop,
  isMediumCrop,
  isCropGrowing,
} from "features/game/events/landExpansion/harvest";
import { isFruitGrowing } from "features/game/events/landExpansion/fruitHarvested";
import { CompostName, isComposting } from "./composters";
import { getDailyFishingCount } from "./fishing";
import { FLOWERS, FLOWER_SEEDS } from "./flowers";
import { getCurrentHoneyProduced } from "../expansion/components/resources/beehive/beehiveMachine";
import { DEFAULT_HONEY_PRODUCTION_TIME } from "../lib/updateBeehives";
import { translate } from "lib/i18n/translate";

export type Restriction = [boolean, string];
type RemoveCondition = (gameState: GameState) => Restriction;

type CanRemoveArgs = {
  item: CropName;
  game: GameState;
};

export function cropIsGrowing({ item, game }: CanRemoveArgs): Restriction {
  const cropGrowing = Object.values(game.crops ?? {}).some(
    (plot) => isCropGrowing(plot) && plot.crop?.name === item
  );
  return [cropGrowing, translate("restrictionReason.isGrowing", { item })];
}

function beanIsPlanted(game: GameState): Restriction {
  const beanPlanted = game.collectibles["Magic Bean"]?.length ?? 0;

  return [!!beanPlanted, translate("restrictionReason.beanPlanted")];
}

export function areFruitsGrowing(
  game: GameState,
  fruit: FruitName
): Restriction {
  const fruitGrowing = Object.values(game.fruitPatches ?? {}).some(
    (patch) => isFruitGrowing(patch) && patch.fruit?.name === fruit
  );

  return [
    fruitGrowing,
    translate("restrictionReason.isGrowing", { item: fruit }),
  ];
}

export function areAnyFruitsGrowing(game: GameState): Restriction {
  const fruitGrowing = Object.values(game.fruitPatches ?? {}).some((patch) =>
    isFruitGrowing(patch)
  );

  return [fruitGrowing, translate("restrictionReason.fruitsGrowing")];
}

export function areAnyCropsGrowing(game: GameState): Restriction {
  const cropsGrowing = Object.values(game.crops ?? {}).some((plot) =>
    isCropGrowing(plot)
  );

  return [cropsGrowing, translate("restrictionReason.cropsGrowing")];
}

function areAnyBasicCropsGrowing(game: GameState): Restriction {
  const cropsGrowing = Object.values(game.crops ?? {}).some(
    (plot) => plot.crop && isBasicCrop(plot.crop?.name) && isCropGrowing(plot)
  );

  return [cropsGrowing, translate("restrictionReason.basicCropsGrowing")];
}

function areAnyMediumCropsGrowing(game: GameState): Restriction {
  const cropsGrowing = Object.values(game.crops ?? {}).some(
    (plot) => plot.crop && isMediumCrop(plot.crop?.name) && isCropGrowing(plot)
  );

  return [cropsGrowing, translate("restrictionReason.mediumCropsGrowing")];
}

function areAnyAdvancedCropsGrowing(game: GameState): Restriction {
  const cropsGrowing = Object.values(game.crops ?? {}).some(
    (plot) =>
      plot.crop && isAdvancedCrop(plot.crop?.name) && isCropGrowing(plot)
  );

  return [cropsGrowing, translate("restrictionReason.advancedCropsGrowing")];
}

function areAnyAdvancedOrMediumCropsGrowing(game: GameState): Restriction {
  const mediumCropsGrowing = areAnyMediumCropsGrowing(game);
  const advancedCropsGrowing = areAnyAdvancedCropsGrowing(game);

  if (mediumCropsGrowing[0]) {
    return mediumCropsGrowing;
  }

  return advancedCropsGrowing;
}

function areAnyTreesChopped(game: GameState): Restriction {
  const treesChopped = Object.values(game.trees ?? {}).some(
    (tree) => !canChop(tree)
  );
  return [treesChopped, translate("restrictionReason.treesChopped")];
}

function areAnyStonesMined(game: GameState): Restriction {
  const stoneMined = Object.values(game.stones ?? {}).some(
    (stone) => !canMine(stone)
  );
  return [stoneMined, translate("restrictionReason.stoneMined")];
}

function areAnyIronsMined(game: GameState): Restriction {
  const ironMined = Object.values(game.iron ?? {}).some(
    (iron) => !canMine(iron)
  );
  return [ironMined, translate("restrictionReason.ironMined")];
}

function areAnyGoldsMined(game: GameState): Restriction {
  const goldMined = Object.values(game.gold ?? {}).some(
    (gold) => !canMine(gold)
  );
  return [goldMined, translate("restrictionReason.goldMined")];
}

function areAnyCrimstonessMined(game: GameState): Restriction {
  const crimstoneMined = Object.values(game.crimstones ?? {}).some(
    (crimstone) => !canMine(crimstone)
  );
  return [crimstoneMined, translate("restrictionReason.crimstoneMined")];
}

function areAnyMineralsMined(game: GameState): Restriction {
  const areStonesMined = areAnyStonesMined(game);
  const areIronsMined = areAnyIronsMined(game);
  const areGoldsMined = areAnyGoldsMined(game);

  if (areStonesMined[0]) {
    return areStonesMined;
  }
  if (areIronsMined[0]) {
    return areIronsMined;
  }

  return areGoldsMined;
}

export function areAnyChickensFed(game: GameState): Restriction {
  const chickensAreFed = Object.values(game.chickens).some(
    (chicken) =>
      chicken.fedAt && Date.now() - chicken.fedAt < CHICKEN_TIME_TO_EGG
  );

  return [chickensAreFed, translate("restrictionReason.chickensFed")];
}

function areAnyTreasureHolesDug(game: GameState): Restriction {
  const holesDug = Object.values(game.treasureIsland?.holes ?? {}).some(
    (hole) => {
      const today = new Date().toISOString().substring(0, 10);

      return new Date(hole.dugAt).toISOString().substring(0, 10) == today;
    }
  );

  return [holesDug, translate("restrictionReason.treasuresDug")];
}

function areAnyComposting(game: GameState): Restriction {
  return [
    isComposting(game, "Compost Bin") ||
      isComposting(game, "Turbo Composter") ||
      isComposting(game, "Premium Composter"),
    translate("restrictionReason.inUse"),
  ];
}

function hasFishedToday(game: GameState): Restriction {
  return [
    getDailyFishingCount(game) !== 0,
    translate("restrictionReason.recentlyFished"),
  ];
}

function areFlowersGrowing(game: GameState): Restriction {
  const flowerGrowing = Object.values(game.flowers.flowerBeds).some(
    (flowerBed) => {
      const flower = flowerBed.flower;

      if (!flower) return false;

      return (
        flower.plantedAt +
          FLOWER_SEEDS()[FLOWERS[flower.name].seed].plantSeconds * 1000 >=
        Date.now()
      );
    }
  );

  return [flowerGrowing, translate("restrictionReason.flowersGrowing")];
}

function isBeehivesFull(game: GameState): boolean {
  // 0.9 Small buffer in case of any rounding errors
  return Object.values(game.beehives).every(
    (hive) =>
      getCurrentHoneyProduced(hive) >= DEFAULT_HONEY_PRODUCTION_TIME * 0.9
  );
}

function isProducingHoney(game: GameState): Restriction {
  return [
    areFlowersGrowing(game)[0] && !isBeehivesFull(game),
    translate("restrictionReason.beesBusy"),
  ];
}

function isFertiliserApplied(
  game: GameState,
  fertiliser: CompostName
): Restriction {
  const fertiliserApplied = Object.values(game.crops ?? {}).some(
    (plot) => plot.fertiliser?.name === fertiliser
  );
  return [fertiliserApplied, translate("restrictionReason.inUse")];
}

export const canShake = (shakenAt?: number) => {
  if (!shakenAt) return true;

  const today = new Date().toISOString().substring(0, 10);

  return new Date(shakenAt).toISOString().substring(0, 10) !== today;
};

function hasShakenManeki(game: GameState): Restriction {
  const manekiNekos = [
    ...(game.collectibles["Maneki Neko"] ?? []),
    ...(game.home.collectibles["Maneki Neko"] ?? []),
  ];
  const hasShakenRecently = manekiNekos.some((maneki) => {
    const shakenAt = maneki.shakenAt || 0;

    return !canShake(shakenAt);
  });

  return [hasShakenRecently, translate("restrictionReason.pawShaken")];
}

function hasShakenTree(game: GameState): Restriction {
  const trees = game.collectibles["Festive Tree"] ?? [];
  const hasShakenRecently = trees.some((tree) => {
    return (
      tree.shakenAt &&
      new Date(tree.shakenAt).getFullYear() === new Date().getFullYear()
    );
  });

  return [hasShakenRecently, translate("restrictionReason.festiveSeason")];
}
export const REMOVAL_RESTRICTIONS: Partial<
  Record<InventoryItemName, RemoveCondition>
> = {
  // Mutant Chickens
  "Undead Rooster": (game) => areAnyChickensFed(game),
  "Ayam Cemani": (game) => areAnyChickensFed(game),
  "El Pollo Veloz": (game) => areAnyChickensFed(game),
  "Fat Chicken": (game) => areAnyChickensFed(game),
  "Rich Chicken": (game) => areAnyChickensFed(game),
  "Speed Chicken": (game) => areAnyChickensFed(game),
  "Chicken Coop": (game) => areAnyChickensFed(game),
  "Gold Egg": (game) => areAnyChickensFed(game),
  Rooster: (game) => areAnyChickensFed(game),
  Bale: (game) => areAnyChickensFed(game),
  "Banana Chicken": (game) => areFruitsGrowing(game, "Banana"),
  "Crim Peckster": (game) => areAnyCrimstonessMined(game),

  // Crop Boosts
  Nancy: (game) => areAnyCropsGrowing(game),
  Scarecrow: (game) => areAnyCropsGrowing(game),
  Kuebiko: (game) => areAnyCropsGrowing(game),
  "Lunar Calendar": (game) => areAnyCropsGrowing(game),
  "Basic Scarecrow": (game) => areAnyBasicCropsGrowing(game),
  "Sir Goldensnout": (game) => areAnyCropsGrowing(game),
  "Scary Mike": (game) => areAnyMediumCropsGrowing(game),
  "Laurie the Chuckle Crow": (game) => areAnyAdvancedCropsGrowing(game),
  Gnome: (game) => areAnyAdvancedOrMediumCropsGrowing(game),
  "Cabbage Boy": (game) => cropIsGrowing({ item: "Cabbage", game }),
  "Cabbage Girl": (game) => cropIsGrowing({ item: "Cabbage", game }),
  Karkinos: (game) => cropIsGrowing({ item: "Cabbage", game }),
  "Easter Bunny": (game) => cropIsGrowing({ item: "Carrot", game }),
  "Pablo The Bunny": (game) => cropIsGrowing({ item: "Carrot", game }),
  "Golden Cauliflower": (game) => cropIsGrowing({ item: "Cauliflower", game }),
  "Mysterious Parsnip": (game) => cropIsGrowing({ item: "Parsnip", game }),
  "Peeled Potato": (game) => cropIsGrowing({ item: "Potato", game }),
  "Victoria Sisters": (game) => cropIsGrowing({ item: "Pumpkin", game }),
  "Freya Fox": (game) => cropIsGrowing({ item: "Pumpkin", game }),
  Poppy: (game) => cropIsGrowing({ game, item: "Corn" }),
  Kernaldo: (game) => cropIsGrowing({ game, item: "Corn" }),
  "Queen Cornelia": (game) => cropIsGrowing({ game, item: "Corn" }),
  Maximus: (game) => cropIsGrowing({ item: "Eggplant", game }),
  Obie: (game) => cropIsGrowing({ item: "Eggplant", game }),
  "Purple Trail": (game) => cropIsGrowing({ item: "Eggplant", game }),

  // Fruit Boosts
  "Squirrel Monkey": (game) => areFruitsGrowing(game, "Orange"),
  "Black Bearry": (game) => areFruitsGrowing(game, "Blueberry"),
  "Lady Bug": (game) => areFruitsGrowing(game, "Apple"),
  Nana: (game) => areFruitsGrowing(game, "Banana"),
  "Immortal Pear": (game) => areAnyFruitsGrowing(game),

  // Composter boosts
  "Soil Krabby": (game) => areAnyComposting(game),

  // Fertiliser Boosts
  "Knowledge Crab": (game) => isFertiliserApplied(game, "Sprout Mix"),

  // Wood Boosts
  "Woody the Beaver": (game) => areAnyTreesChopped(game),
  "Apprentice Beaver": (game) => areAnyTreesChopped(game),
  "Foreman Beaver": (game) => areAnyTreesChopped(game),
  "Wood Nymph Wendy": (game) => areAnyTreesChopped(game),
  "Tiki Totem": (game) => areAnyTreesChopped(game),

  // Mineral Boosts
  "Rock Golem": (game) => areAnyStonesMined(game),
  "Tunnel Mole": (game) => areAnyStonesMined(game),
  "Rocky the Mole": (game) => areAnyIronsMined(game),
  "Iron Idol": (game) => areAnyIronsMined(game),
  Nugget: (game) => areAnyGoldsMined(game),
  "Tin Turtle": (game) => areAnyStonesMined(game),
  "Emerald Turtle": (game) => areAnyMineralsMined(game),

  // Mutant Crops
  "Carrot Sword": (game) => beanIsPlanted(game),
  "Stellar Sunflower": (game) => cropIsGrowing({ item: "Sunflower", game }),
  "Potent Potato": (game) => cropIsGrowing({ item: "Potato", game }),
  "Radical Radish": (game) => cropIsGrowing({ item: "Radish", game }),

  "Heart of Davy Jones": (game) => areAnyTreasureHolesDug(game),
  "Maneki Neko": (game) => hasShakenManeki(game),
  "Festive Tree": (game) => hasShakenTree(game),
  "Time Warp Totem": (_: GameState) => [
    true,
    translate("restrictionReason.inUse"),
  ],

  "Grinx's Hammer": (game: GameState) => {
    const canRemove =
      Date.now() > (game.expandedAt ?? 0) + 7 * 24 * 60 * 60 * 1000;

    return [!canRemove, translate("restrictionReason.recentlyUsed")];
  },

  // Fishing Boosts
  Alba: (game) => hasFishedToday(game),
  Walrus: (game) => hasFishedToday(game),

  // Honey
  "Queen Bee": (game) => isProducingHoney(game),
  "Flower Fox": (game) => areFlowersGrowing(game),
};

export const BUD_REMOVAL_RESTRICTIONS: Record<
  StemTrait | TypeTrait,
  RemoveCondition
> = {
  // HATS
  "3 Leaf Clover": (game) => areAnyCropsGrowing(game),
  "Fish Hat": (game) => hasFishedToday(game),
  "Diamond Gem": (game) => areAnyMineralsMined(game),
  "Gold Gem": (game) => areAnyGoldsMined(game),
  "Miner Hat": (game) => areAnyIronsMined(game),
  "Carrot Head": (game) => cropIsGrowing({ item: "Carrot", game }),
  "Basic Leaf": (game) => areAnyBasicCropsGrowing(game),
  "Sunflower Hat": (game) => cropIsGrowing({ item: "Sunflower", game }),
  "Ruby Gem": (game) => areAnyStonesMined(game),
  Mushroom: (game) => [false, translate("restrictionReason.noRestriction")],
  "Magic Mushroom": (game) => [
    false,
    translate("restrictionReason.noRestriction"),
  ],
  "Acorn Hat": (game) => areAnyTreesChopped(game),
  Banana: (game) => areAnyFruitsGrowing(game),
  "Tree Hat": (game) => areAnyTreesChopped(game),
  "Egg Head": (game) => areAnyChickensFed(game),
  "Apple Head": (game) => areAnyFruitsGrowing(game),

  "Axe Head": (game) => [false, translate("restrictionReason.noRestriction")],
  "Rainbow Horn": (game) => [
    false,
    translate("restrictionReason.noRestriction"),
  ],
  "Red Bow": (game) => [false, translate("restrictionReason.noRestriction")],
  "Silver Horn": (game) => [
    false,
    translate("restrictionReason.noRestriction"),
  ],
  "Sunflower Headband": (game) => [
    false,
    translate("restrictionReason.noRestriction"),
  ],
  "Sunshield Foliage": (game) => [
    false,
    translate("restrictionReason.noRestriction"),
  ],
  "Tender Coral": (game) => [
    false,
    translate("restrictionReason.noRestriction"),
  ],
  Seashell: (game) => [false, translate("restrictionReason.noRestriction")],
  Hibiscus: (game) => [false, translate("restrictionReason.noRestriction")],

  // TYPES
  Plaza: (game) => areAnyBasicCropsGrowing(game),
  Woodlands: (game) => areAnyTreesChopped(game),
  Cave: (game) => areAnyMineralsMined(game),
  Sea: (game) => hasFishedToday(game),
  Castle: (game) => areAnyMediumCropsGrowing(game),
  // TODO Port needs to be implemented
  Port: (game) => [false, translate("restrictionReason.noRestriction")],
  Retreat: (game) => areAnyChickensFed(game),
  Saphiro: (game) => areAnyCropsGrowing(game),
  Snow: (game) => areAnyAdvancedCropsGrowing(game),
  Beach: (game) => areAnyFruitsGrowing(game),
};

export const hasBudRemoveRestriction = (
  state: GameState,
  bud: Bud
): Restriction => {
  const stemRemoveRestriction = BUD_REMOVAL_RESTRICTIONS[bud.stem];
  const typeRemoveRestriction = BUD_REMOVAL_RESTRICTIONS[bud.type];

  const [stemRestricted, stemReason] = stemRemoveRestriction(state);
  if (stemRestricted) return [stemRestricted, stemReason];

  const [typeRestricted, typeReason] = typeRemoveRestriction(state);
  if (typeRestricted) return [typeRestricted, typeReason];

  return [false, translate("restrictionReason.noRestriction")];
};

export const hasRemoveRestriction = (
  name: InventoryItemName | "Bud",
  id: string,
  state: GameState
): Restriction => {
  if (name === "Bud") {
    const bud = state.buds?.[Number(id)];
    return bud
      ? hasBudRemoveRestriction(state, bud)
      : [false, translate("restrictionReason.noRestriction")];
  }

  if (name === "Genie Lamp") {
    const collectibleGroup = state.collectibles[name];
    if (!collectibleGroup)
      return [true, translate("restrictionReason.genieLampRubbed")];

    const collectibleToRemove = collectibleGroup.find(
      (collectible) => collectible.id === id
    );
    if (!collectibleToRemove)
      return [true, translate("restrictionReason.genieLampRubbed")];

    const rubbedCount = collectibleToRemove.rubbedCount ?? 0;
    if (rubbedCount > 0) {
      return [true, translate("restrictionReason.genieLampRubbed")];
    }
  }

  if (name === "Chicken Coop") {
    if (areUnsupportedChickensBrewing(state))
      return [true, translate("restrictionReason.chickensFed")];
  }

  const removeRestriction = REMOVAL_RESTRICTIONS[name];
  if (removeRestriction) return removeRestriction(state);

  return [false, translate("restrictionReason.noRestriction")];
};

export const hasMoveRestriction = (
  name: InventoryItemName,
  id: string,
  state: GameState
): Restriction => {
  const isAoEItem =
    name === "Bale" ||
    name === "Basic Scarecrow" ||
    name === "Emerald Turtle" ||
    name === "Tin Turtle" ||
    name === "Sir Goldensnout" ||
    name === "Scary Mike" ||
    name === "Laurie the Chuckle Crow" ||
    name === "Queen Cornelia" ||
    name === "Gnome";

  const [isRestricted, restrictionReason] = hasRemoveRestriction(
    name,
    id,
    state
  );

  return [isRestricted && isAoEItem, restrictionReason];
};
