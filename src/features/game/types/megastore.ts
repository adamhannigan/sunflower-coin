import { BumpkinItem } from "./bumpkin";
import { InventoryItemName } from "./game";
import { ChapterName } from "./chapters";

export type SeasonalTierItemName =
  | SeasonalCollectibleName
  | SeasonalWearableName
  | MegastoreKeys;

export type SeasonalCollectibleName =
  | "Cow Scratcher"
  | "Spinning Wheel"
  | "Sleepy Rug"
  | "Meteorite"
  | "Sheaf of Plenty"
  | "Mechanical Bull"
  | "Crop Circle";

export type SeasonalWearableName =
  | "Cowboy Hat"
  | "Cowgirl Skirt"
  | "Cowboy Shirt"
  | "Dream Scarf"
  | "Milk Apron"
  | "Cowboy Trouser";

export type MegastoreKeys = "Treasure Key" | "Rare Key" | "Luxury Key";

type SeasonalStoreBase = {
  cost: {
    items: Partial<Record<InventoryItemName, number>>;
    sfl: number;
  };
};

export type SeasonalStoreWearable = SeasonalStoreBase & {
  wearable: BumpkinItem;
};
export type SeasonalStoreCollectible = SeasonalStoreBase & {
  collectible: InventoryItemName;
};

export type SeasonalStoreItem =
  | SeasonalStoreWearable
  | SeasonalStoreCollectible;

export type SeasonalStore = {
  basic: {
    items: SeasonalStoreItem[];
  };
  rare: {
    items: SeasonalStoreItem[];
    requirement: number;
  };
  epic: {
    items: SeasonalStoreItem[];
    requirement: number;
  };
  mega: {
    items: SeasonalStoreItem[];
    requirement: number;
  };
};

export type SeasonalStoreTier = keyof SeasonalStore;

const EMPTY_SEASONAL_STORE: SeasonalStore = {
  basic: {
    items: [],
  },
  rare: {
    items: [],
    requirement: 0,
  },
  epic: {
    items: [],
    requirement: 0,
  },
  mega: {
    items: [],
    requirement: 0,
  },
};

// Test only
const PHARAOH_ITEMS: SeasonalStoreItem[] = [
  {
    wearable: "Red Farmer Shirt",
    cost: {
      items: {},
      sfl: 5,
    },
  },
  {
    collectible: "Basic Bear",
    cost: {
      items: {
        Wood: 1,
      },
      sfl: 10,
    },
  },
  {
    collectible: "Treasure Key",
    cost: {
      items: {
        Wood: 100,
      },
      sfl: 10,
    },
  },
];

const RARE_PHARAOH_ITEMS: SeasonalStoreItem[] = [
  {
    wearable: "Rancher Hair",
    cost: {
      items: {
        Wood: 1,
        Stone: 1,
      },
      sfl: 10,
    },
  },
  {
    wearable: "Axe",
    cost: {
      items: {
        Wood: 1,
      },
      sfl: 5,
    },
  },
  {
    wearable: "Yellow Farmer Shirt",
    cost: {
      items: {
        Wood: 1,
      },
      sfl: 10,
    },
  },
  {
    collectible: "Rare Key",
    cost: {
      items: {
        Wood: 250,
      },
      sfl: 20,
    },
  },
];
const EPIC_PHARAOH_ITEMS: SeasonalStoreItem[] = [
  {
    wearable: "Blue Farmer Shirt",
    cost: {
      items: {
        Wood: 1,
      },
      sfl: 2,
    },
  },
  {
    collectible: "Luxury Key",
    cost: {
      items: {
        Wood: 500,
      },
      sfl: 50,
    },
  },
];

const BULL_RUN_ITEMS: SeasonalStoreItem[] = [
  {
    wearable: "Cowboy Hat",
    cost: {
      items: {
        Horseshoe: 300,
      },
      sfl: 0,
    },
  },
  {
    wearable: "Cowgirl Skirt",
    cost: {
      items: {
        Horseshoe: 50,
      },
      sfl: 0,
    },
  },
  {
    collectible: "Cow Scratcher",
    cost: {
      items: {
        "Cow Skull": 20,
      },
      sfl: 0,
    },
  },
  {
    collectible: "Spinning Wheel",
    cost: {
      items: {
        Horseshoe: 250,
      },
      sfl: 0,
    },
  },
  {
    collectible: "Treasure Key",
    cost: {
      items: {
        Horseshoe: 200,
      },
      sfl: 0,
    },
  },
];

const RARE_BULL_RUN_ITEMS: SeasonalStoreItem[] = [
  {
    wearable: "Cowboy Shirt",
    cost: {
      items: {
        Horseshoe: 600,
      },
      sfl: 0,
    },
  },
  {
    wearable: "Dream Scarf",
    cost: {
      items: {
        Horseshoe: 1250,
      },
      sfl: 0,
    },
  },
  {
    collectible: "Sleepy Rug",
    cost: {
      items: {},
      sfl: 50,
    },
  },
  {
    collectible: "Meteorite",
    cost: {
      items: {
        "Cow Skull": 60,
      },
      sfl: 0,
    },
  },
  {
    collectible: "Rare Key",
    cost: {
      items: {
        Horseshoe: 500,
      },
      sfl: 0,
    },
  },
];

const EPIC_BULL_RUN_ITEMS: SeasonalStoreItem[] = [
  {
    wearable: "Cowboy Trouser",
    cost: {
      items: {
        Horseshoe: 750,
      },
      sfl: 0,
    },
  },
  {
    wearable: "Milk Apron",
    cost: {
      items: {
        "Cow Skull": 225,
      },
      sfl: 0,
    },
  },
  {
    collectible: "Mechanical Bull",
    cost: {
      items: {},
      sfl: 500,
    },
  },
  {
    collectible: "Luxury Key",
    cost: {
      items: {
        Horseshoe: 1000,
      },
      sfl: 0,
    },
  },
  {
    collectible: "Crop Circle",
    cost: {
      items: {
        Horseshoe: 1250,
      },
      sfl: 0,
    },
  },
];

const MEGA_BULL_RUN_ITEMS: SeasonalStoreItem[] = [
  {
    collectible: "Sheaf of Plenty",
    cost: {
      items: {
        Horseshoe: 2500,
      },
      sfl: 0,
    },
  },
];

export const MEGASTORE: Record<ChapterName, SeasonalStore> = {
  "Catch the Kraken": EMPTY_SEASONAL_STORE,
  "Clash of Factions": EMPTY_SEASONAL_STORE,
  "Dawn Breaker": EMPTY_SEASONAL_STORE,
  "Solar Flare": EMPTY_SEASONAL_STORE,
  "Spring Blossom": EMPTY_SEASONAL_STORE,
  "Witches' Eve": EMPTY_SEASONAL_STORE,
  "Pharaoh's Treasure": {
    basic: {
      items: PHARAOH_ITEMS,
    },
    rare: {
      items: RARE_PHARAOH_ITEMS,
      requirement: 3,
    },
    epic: {
      items: EPIC_PHARAOH_ITEMS,
      requirement: 3,
    },
    mega: {
      items: EPIC_PHARAOH_ITEMS,
      requirement: 3,
    },
  },
  "Bull Run": {
    basic: {
      items: BULL_RUN_ITEMS,
    },
    rare: {
      items: RARE_BULL_RUN_ITEMS,
      requirement: 4,
    },
    epic: {
      items: EPIC_BULL_RUN_ITEMS,
      requirement: 4,
    },
    mega: {
      items: MEGA_BULL_RUN_ITEMS,
      requirement: 4,
    },
  },
  "Winds of Change": EMPTY_SEASONAL_STORE,
};
