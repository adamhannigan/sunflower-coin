import { InventoryItemName } from "./game";
import { LabelType } from "components/ui/Label";

export enum LimitedItemType {
  BlacksmithItem = "BlacksmithItem",
  MarketItem = "MarketItem",
  BarnItem = "BarnItem",
  Flag = "Flag",
  MOMEventItem = "MOMEventItem",
  QuestItem = "QuestItem",
  MutantChicken = "MutantChicken",
  SalesmanItem = "SalesmanItem",
  WarTentItem = "WarTentItem",
  EasterEventItemName = "EasterEventItemName",
}

export type BuffLabel = {
  shortDescription: string;
  labelType: LabelType;
  boostTypeIcon?: string;
  boostedItemIcon?: string;
};

export const KNOWN_IDS: Record<InventoryItemName, number> = {
  "Sunflower Seed": 101,
  "Potato Seed": 102,
  "Pumpkin Seed": 103,
  "Carrot Seed": 104,
  "Cabbage Seed": 105,
  "Beetroot Seed": 106,
  "Cauliflower Seed": 107,
  "Parsnip Seed": 108,
  "Radish Seed": 109,
  "Wheat Seed": 110,
  "Kale Seed": 111,
  "Apple Seed": 112,
  "Blueberry Seed": 113,
  "Orange Seed": 114,
  "Magic Bean": 115,
  // "Shiny Bean": 116,
  // "Golden Bean": 117,
  "Eggplant Seed": 118,
  "Corn Seed": 119,
  "Banana Plant": 120,
  "Sunpetal Seed": 121,
  "Bloom Seed": 122,
  "Lily Seed": 123,
  "Soybean Seed": 124,
  "Grape Seed": 125,
  "Rice Seed": 126,
  "Olive Seed": 127,
  "Tomato Seed": 128,
  "Lemon Seed": 129,
  "Barley Seed": 130,

  Sunflower: 201,
  Potato: 202,
  Pumpkin: 203,
  Carrot: 204,
  Cabbage: 205,
  Beetroot: 206,
  Cauliflower: 207,
  Parsnip: 208,
  Radish: 209,
  Wheat: 210,
  Kale: 211,
  Apple: 212,
  Blueberry: 213,
  Orange: 214,
  Eggplant: 215,
  Corn: 216,
  Banana: 217,
  "Red Pansy": 218,
  "Yellow Pansy": 219,
  "Purple Pansy": 220,
  "White Pansy": 221,
  "Blue Pansy": 222,
  "Red Cosmos": 223,
  "Yellow Cosmos": 224,
  "Purple Cosmos": 225,
  "White Cosmos": 226,
  "Blue Cosmos": 227,
  "Red Balloon Flower": 228,
  "Yellow Balloon Flower": 229,
  "Purple Balloon Flower": 230,
  "White Balloon Flower": 231,
  "Blue Balloon Flower": 232,
  "Red Carnation": 233,
  "Yellow Carnation": 234,
  "Purple Carnation": 235,
  "White Carnation": 236,
  "Blue Carnation": 237,
  "Prism Petal": 238,
  "Celestial Frostbloom": 239,
  "Primula Enigma": 240,
  "Red Daffodil": 241,
  "Yellow Daffodil": 242,
  "Purple Daffodil": 243,
  "White Daffodil": 244,
  "Blue Daffodil": 245,
  "Red Lotus": 246,
  "Yellow Lotus": 247,
  "Purple Lotus": 248,
  "White Lotus": 249,
  "Blue Lotus": 250,
  Soybean: 251,
  Grape: 252,
  Rice: 253,
  Olive: 254,
  Tomato: 255,
  Lemon: 256,
  Barley: 257,

  Axe: 301,
  Pickaxe: 302,
  "Stone Pickaxe": 303,
  "Iron Pickaxe": 304,
  Hammer: 305,
  Rod: 306,
  "Rusty Shovel": 307,
  Shovel: 308,
  //  Power Shovel was remove, 309 is available
  "Sand Shovel": 310,
  "Sand Drill": 311,
  "Gold Pickaxe": 312,
  "Oil Drill": 313,
  "Petting Hand": 314,
  Brush: 315,
  "Music Box": 316,

  "Sunflower Statue": 401,
  "Potato Statue": 402,
  "Christmas Tree": 403,
  Scarecrow: 404,
  "Farm Cat": 405,
  "Farm Dog": 406,
  Gnome: 407,
  "Chicken Coop": 408,
  "Gold Egg": 409,
  "Golden Cauliflower": 410,
  "Sunflower Tombstone": 411,
  "Sunflower Rock": 412,
  "Goblin Crown": 413,
  Fountain: 414,
  "Woody the Beaver": 415,
  "Apprentice Beaver": 416,
  "Foreman Beaver": 417,
  "Mysterious Parsnip": 418,
  "Carrot Sword": 419,
  Nancy: 420,
  Kuebiko: 421,
  "Nyon Statue": 422,
  "Farmer Bath": 423,
  "Homeless Tent": 424,
  "Mysterious Head": 425,
  "Golden Bonsai": 426,
  "Rock Golem": 427,
  "Tunnel Mole": 428,
  "Rocky the Mole": 429,
  Nugget: 430,
  "Wicker Man": 431,
  "Victoria Sisters": 432,
  "Peeled Potato": 433,
  "Cabbage Boy": 434,
  "Cabbage Girl": 435,
  "Wood Nymph Wendy": 436,
  "Stellar Sunflower": 437,
  "Potent Potato": 438,
  "Radical Radish": 439,
  // "Colossal Crop": 440,
  "Immortal Pear": 441,
  "Lady Bug": 442,
  "Squirrel Monkey": 443,
  "Black Bearry": 444,
  "Ayam Cemani": 445,
  "Maneki Neko": 446,
  "Tiki Totem": 447,
  "Lunar Calendar": 448,
  "Treasure Map": 449,
  "Heart of Davy Jones": 450,
  "Heart Balloons": 451,
  Flamingo: 452,
  "Blossom Tree": 453,
  "Iron Idol": 454,
  Karkinos: 455,
  "Mushroom House": 456,
  "Purple Trail": 457,
  Obie: 458,
  Maximus: 459,
  "Genie Lamp": 460,
  Hoot: 461,
  "Basic Scarecrow": 462,
  "Emerald Turtle": 463,
  "Tin Turtle": 464,
  Bale: 465,
  "Sir Goldensnout": 466,
  "Scary Mike": 467,
  "Laurie the Chuckle Crow": 468,
  "Freya Fox": 469,
  "El Pollo Veloz": 470,
  Poppy: 471,
  "Grain Grinder": 472,
  Kernaldo: 473,
  "Queen Cornelia": 474,
  "Lab Grown Carrot": 475,
  "Lab Grown Pumpkin": 476,
  "Lab Grown Radish": 477,
  Walrus: 478,
  Alba: 479,
  "Knowledge Crab": 480,
  Anchor: 481,
  Goblet: 482,
  "Rubber Ducky": 483,
  "Kraken Head": 484,
  "Skill Shrimpy": 485,
  "Soil Krabby": 486,
  Nana: 487,
  "Banana Chicken": 488,
  "Grinx's Hammer": 489,
  "Humming Bird": 490,
  "Queen Bee": 491,
  "Flower Fox": 492,
  "Hungry Caterpillar": 493,
  "Crim Peckster": 494,
  "Turbo Sprout": 495,
  Soybliss: 496,
  "Grape Granny": 497,
  "Royal Throne": 498,
  "Lily Egg": 499,
  "Knight Chicken": 500,

  "Pumpkin Soup": 501,
  "Roasted Cauliflower": 502,
  Sauerkraut: 503,
  "Radish Pie": 504,
  "Sunflower Cake": 505,
  "Potato Cake": 506,
  "Pumpkin Cake": 507,
  "Carrot Cake": 508,
  "Cabbage Cake": 509,
  "Beetroot Cake": 510,
  "Cauliflower Cake": 511,
  "Parsnip Cake": 512,
  "Radish Cake": 513,
  "Wheat Cake": 514,
  "Boiled Eggs": 515,
  "Bumpkin Broth": 516,
  "Bumpkin Salad": 517,
  "Goblin's Treat": 518,
  "Mashed Potato": 519,
  "Cauliflower Burger": 520,
  "Club Sandwich": 521,
  "Roast Veggies": 522,
  Pancakes: 523,
  "Apple Pie": 524,
  "Blueberry Jam": 525,
  "Fermented Carrots": 526,
  "Honey Cake": 527,
  "Kale & Mushroom Pie": 528,
  "Kale Stew": 529,
  "Mushroom Jacket Potatoes": 530,
  "Mushroom Soup": 531,
  "Orange Cake": 532,
  "Sunflower Crunch": 533,
  "Reindeer Carrot": 534,
  "Apple Juice": 535,
  "Orange Juice": 536,
  "Purple Smoothie": 537,
  "Power Smoothie": 538,
  "Bumpkin Detox": 539,
  "Pirate Cake": 540,
  "Bumpkin Roast": 541,
  "Goblin Brunch": 542,
  "Fruit Salad": 543,
  "Kale Omelette": 544,
  "Cabbers n Mash": 545,
  "Fancy Fries": 546,
  "Bumpkin ganoush": 547,
  Cornbread: 548,
  "Eggplant Cake": 549,
  Popcorn: 550,
  Chowder: 551,
  Gumbo: 552,
  "Fermented Fish": 553,
  "Banana Blast": 554,
  "Beetroot Blaze": 555,
  "Rapid Roast": 556,
  "Shroom Syrup": 557,
  "Carrot Juice": 558,
  "Seafood Basket": 559,
  "Fish Burger": 560,
  "Fish n Chips": 561,
  "Fish Omelette": 562,
  "Fried Calamari": 563,
  "Fried Tofu": 564,
  "Grape Juice": 565,
  "Ocean's Olive": 566,
  "Quick Juice": 567,
  "Rice Bun": 568,
  "Slow Juice": 569,
  "Steamed Red Rice": 570,
  "Sushi Roll": 571,
  "The Lot": 572,
  "Tofu Scramble": 573,
  Antipasto: 574,
  Caponata: 575,
  "Glazed Carrots": 576,
  Paella: 577,

  Wood: 601,
  Stone: 602,
  Iron: 603,
  Gold: 604,
  Egg: 605,
  Chicken: 606,
  Cow: 607,
  Pig: 608,
  Sheep: 609,
  "Speed Chicken": 610,
  "Fat Chicken": 611,
  "Rich Chicken": 612,
  Rooster: 613,
  Honey: 614,
  "Wild Mushroom": 615,
  "Magic Mushroom": 616,
  Diamond: 617,
  Tree: 618,
  "Stone Rock": 619,
  "Iron Rock": 620,
  "Gold Rock": 621,
  "Crop Plot": 622,
  "Fruit Patch": 623,
  Boulder: 624,
  "Basic Land": 625,
  Earthworm: 626,
  Grub: 627,
  "Red Wiggler": 628,
  "Sprout Mix": 629,
  "Fruitful Blend": 630,
  "Rapid Root": 631,
  "Fishing Lure": 632,
  Beehive: 633,
  "Flower Bed": 634,
  "Crimstone Rock": 635,
  Crimstone: 636,
  "Sunstone Rock": 637,
  Sunstone: 638,
  Oil: 639,
  "Oil Reserve": 640,
  Leather: 641,
  Wool: 642,
  "Merino Wool": 643,
  Feather: 644,
  Milk: 645,
  Hay: 646,
  "Kernel Blend": 647,
  NutriBarley: 648,
  "Mixed Grain": 649,
  "Barn Delight": 650,

  "Green Thumb": 701,
  "Barn Manager": 702,
  "Seed Specialist": 703,
  Wrangler: 704,
  Lumberjack: 705,
  Prospector: 706,
  Logger: 707,
  "Gold Rush": 708,
  Artist: 709,
  Coder: 710,
  "Liquidity Provider": 711,
  "Discord Mod": 712,
  "Trading Ticket": 713,
  Warrior: 714,
  "Beta Pass": 715,
  "Red Envelope": 716,
  "Love Letter": 717,
  "Block Buck": 718,
  "Solar Flare Ticket": 719,
  "Dawn Breaker Ticket": 720,
  "Sunflower Supporter": 721,
  "Solar Flare Banner": 722,
  "Dawn Breaker Banner": 723,
  "Witches' Eve Banner": 724,
  "Crow Feather": 725,
  "Gold Pass": 726,
  "Potion Ticket": 727,
  "Bud Ticket": 728,
  "Bud Seedling": 729,
  "Catch the Kraken Banner": 730,
  "Mermaid Scale": 731,
  "Community Coin": 732,
  "Arcade Token": 733,
  "Farmhand Coupon": 734,
  Farmhand: 735,
  "Spring Blossom Banner": 736,
  "Tulip Bulb": 737,
  "Clash of Factions Banner": 738,
  Scroll: 739,
  "Lifetime Farmer Banner": 740,
  "Goblin Emblem": 741,
  "Bumpkin Emblem": 742,
  "Sunflorian Emblem": 743,
  "Nightshade Emblem": 744,
  Mark: 745,
  "Pharaoh's Treasure Banner": 746,
  "Amber Fossil": 747,
  Gem: 748,

  "Australian Flag": 801,
  "Belgian Flag": 802,
  "Brazilian Flag": 803,
  "Chinese Flag": 804,
  "Finnish Flag": 805,
  "French Flag": 806,
  "German Flag": 807,
  "Indonesian Flag": 808,
  "Indian Flag": 809,
  "Iranian Flag": 810,
  "Italian Flag": 811,
  "Japanese Flag": 812,
  "Moroccan Flag": 813,
  "Dutch Flag": 814,
  "Philippine Flag": 815,
  "Polish Flag": 816,
  "Portuguese Flag": 817,
  "Russian Flag": 818,
  "Saudi Arabian Flag": 819,
  "South Korean Flag": 820,
  "Spanish Flag": 821,
  "Sunflower Flag": 822,
  "Thai Flag": 823,
  "Turkish Flag": 824,
  "Ukrainian Flag": 825,
  "American Flag": 826,
  "Vietnamese Flag": 827,
  "Canadian Flag": 828,
  "Singaporean Flag": 829,
  "British Flag": 830,
  "Sierra Leone Flag": 831,
  "Romanian Flag": 832,
  "Rainbow Flag": 833,
  "Goblin Flag": 834,
  "Pirate Flag": 835,
  "Algerian Flag": 836,
  "Mexican Flag": 837,
  "Dominican Republic Flag": 838,
  "Argentinian Flag": 839,
  "Lithuanian Flag": 840,
  "Malaysian Flag": 841,
  "Colombian Flag": 842,

  // Special events
  "Egg Basket": 901,
  "Red Egg": 902,
  "Blue Egg": 903,
  "Yellow Egg": 904,
  "Pink Egg": 905,
  "Purple Egg": 906,
  "Orange Egg": 907,
  "Green Egg": 908,
  "Easter Bunny": 909,
  "Engine Core": 910,
  Observatory: 911,
  "Goblin Key": 912,
  "Sunflower Key": 913,
  "Ancient Goblin Sword": 914,
  "Ancient Human Warhammer": 915,
  "Rapid Growth": 916,
  "War Bond": 917,
  "Goblin War Point": 918,
  "Human War Point": 919,
  "Human War Banner": 920,
  "Goblin War Banner": 921,
  "Jack-o-lantern": 923,
  //Golden crop event
  "Golden Crop": 924,
  "Wooden Compass": 925,
  "Pablo The Bunny": 926,
  "Iron Compass": 927,
  "Old Bottle": 928,
  "Emerald Compass": 929,
  "Earn Alliance Banner": 930,
  "Treasure Key": 931,
  "Luxury Key": 932,
  "Rare Key": 933,
  "Prize Ticket": 934,
  "Baby Panda": 935,
  Baozi: 936,
  "Community Egg": 937,
  "Hungry Hare": 938,
  "Bumpkin Faction Banner": 939,
  "Nightshade Faction Banner": 940,
  "Sunflorian Faction Banner": 941,
  "Goblin Faction Banner": 942,

  // Buildings
  Market: 1001,
  "Fire Pit": 1002,
  Workbench: 1003,
  Tent: 1004,
  "Water Well": 1005,
  "Hen House": 1006,
  Bakery: 1007,
  Kitchen: 1008,
  Deli: 1009,
  "Smoothie Shack": 1010,
  Toolshed: 1011,
  Warehouse: 1012,
  "Town Center": 1013,
  "Compost Bin": 1014,
  "Turbo Composter": 1015,
  "Premium Composter": 1016,
  House: 1017,
  Manor: 1018,
  Greenhouse: 1019,
  "Crop Machine": 1020,
  Barn: 1021,
  "Crafting Box": 1022,

  // Temporary Bumpkin items
  "Chef Apron": 1101,
  "Chef Hat": 1102,
  "Sunflower Amulet": 1103,
  "Carrot Amulet": 1104,
  "Beetroot Amulet": 1105,
  "Green Amulet": 1106,
  "Warrior Shirt": 1107,
  "Warrior Helmet": 1108,
  "Warrior Pants": 1109,
  "Sunflower Shield": 1110,
  "Skull Hat": 1111,
  "War Skull": 1112,
  "War Tombstone": 1113,
  "Undead Rooster": 1114,

  // Decorations
  "White Tulips": 1201,
  "Potted Sunflower": 1202,
  Cactus: 1203,
  "Basic Bear": 1204,
  "Chef Bear": 1205,
  "Construction Bear": 1206,
  "Angel Bear": 1207,
  "Badass Bear": 1208,
  "Bear Trap": 1209,
  "Brilliant Bear": 1210,
  "Classy Bear": 1211,
  "Farmer Bear": 1212,
  "Sunflower Bear": 1213,
  "Rich Bear": 1214,
  "Potted Potato": 1215,
  "Potted Pumpkin": 1216,
  "Christmas Bear": 1217,
  "Rainbow Artist Bear": 1218,
  "Christmas Snow Globe": 1219,
  "Devil Bear": 1220,
  "Collectible Bear": 1221,
  "Cyborg Bear": 1222,
  "Abandoned Bear": 1223,
  "Turtle Bear": 1224,
  "T-Rex Skull": 1225,
  "Sunflower Coin": 1226,
  Foliant: 1227,
  "Skeleton King Staff": 1228,
  "Lifeguard Bear": 1229,
  "Snorkel Bear": 1230,
  "Parasaur Skull": 1231,
  "Golden Bear Head": 1232,
  "Pirate Bear": 1233,
  "Goblin Bear": 1234,
  Galleon: 1235,
  "Easter Bear": 1236,
  "Dinosaur Bone": 1237,
  "Human Bear": 1238,
  "Whale Bear": 1239,
  "Valentine Bear": 1240,
  "Palm Tree": 1241,
  "Beach Ball": 1242,
  "Easter Bush": 1243,
  "Giant Carrot": 1244,
  "Dirt Path": 1245,
  Bush: 1246,
  Fence: 1247,
  Shrub: 1248,
  "Luminous Lantern": 1249,
  "Radiance Lantern": 1250,
  "Aurora Lantern": 1251,
  "Bonnie's Tombstone": 1252,
  "Chestnut Fungi Stool": 1253,
  "Crimson Cap": 1254,
  "Dawn Umbrella Seat": 1255,
  "Eggplant Grill": 1256,
  "Giant Dawn Mushroom": 1257,
  "Grubnash's Tombstone": 1258,
  "Mahogany Cap": 1259,
  "Toadstool Seat": 1260,
  Clementine: 1261,
  Cobalt: 1262,
  "Shroom Glow": 1263,
  "Genie Bear": 1264,
  "Ocean Lantern": 1265,
  "Beta Bear": 1266,
  "Field Maple": 1267,
  "Red Maple": 1268,
  "Golden Maple": 1269,
  "Pine Tree": 1270,
  "Stone Fence": 1271,
  "Solar Lantern": 1272,
  "Betty Lantern": 1273,
  "Bumpkin Lantern": 1274,
  "Eggplant Bear": 1275,
  "Goblin Lantern": 1276,
  "Dawn Flower": 1277,
  Candles: 1278,
  "Haunted Stump": 1279,
  "Spooky Tree": 1280,
  "Giant Cabbage": 1281,
  "Giant Potato": 1282,
  "Giant Pumpkin": 1283,
  "Town Sign": 1284,
  Observer: 1285,
  "Crow Rock": 1286,
  "Mini Corn Maze": 1287,
  "White Crow": 1288,

  "Lifeguard Ring": 1289,
  Surfboard: 1290,
  "Hideaway Herman": 1291,
  "Shifty Sheldon": 1292,
  "Tiki Torch": 1293,
  "Beach Umbrella": 1294,
  "Sapo Docuras": 1295,
  "Sapo Travessuras": 1296,
  "Time Warp Totem": 1297,
  "Bumpkin Nutcracker": 1298,
  "Festive Tree": 1299,

  //Beach Bounty
  "Pirate Bounty": 1301,
  Pearl: 1302,
  Coral: 1303,
  "Clam Shell": 1304,
  Pipi: 1305,
  Starfish: 1306,
  Seaweed: 1307,
  "Sea Cucumber": 1308,
  Crab: 1309,

  // Exotic Crops
  "Black Magic": 1401,
  "Golden Helios": 1402,
  Chiogga: 1403,
  "Purple Cauliflower": 1404,
  "Adirondack Potato": 1405,
  "Warty Goblin Pumpkin": 1406,
  "White Carrot": 1407,

  // Digging Site
  "Camel Bone": 1408,
  "Cockle Shell": 1409,
  Hieroglyph: 1410,
  Sand: 1411,
  Scarab: 1412,
  Vase: 1413,

  // Fish
  Anchovy: 1501,
  Butterflyfish: 1502,
  Blowfish: 1503,
  Clownfish: 1504,
  "Sea Bass": 1505,
  "Sea Horse": 1506,
  "Horse Mackerel": 1507,
  Squid: 1508,
  "Red Snapper": 1509,
  "Moray Eel": 1510,
  "Olive Flounder": 1511,
  Napoleanfish: 1512,
  Surgeonfish: 1513,
  "Zebra Turkeyfish": 1514,
  Ray: 1515,
  "Hammerhead shark": 1516,
  Tuna: 1517,
  "Mahi Mahi": 1518,
  "Blue Marlin": 1519,
  Oarfish: 1520,
  "Football fish": 1521,
  Sunfish: 1522,
  Coelacanth: 1523,
  "Whale Shark": 1524,
  "Barred Knifejaw": 1525,
  "Saw Shark": 1526,
  "White Shark": 1527,

  "Twilight Anglerfish": 1528,
  "Starlight Tuna": 1529,
  "Radiant Ray": 1530,
  "Phantom Barracuda": 1531,
  "Gilded Swordfish": 1532,
  "Kraken Tentacle": 1533,
  Angelfish: 1534,
  Halibut: 1535,
  Parrotfish: 1536,
  "Crimson Carp": 1537,
  "Battle Fish": 1538,
  "Lemon Shark": 1539,

  "White Festive Fox": 2001,
  Rug: 2002,
  Wardrobe: 2003,
  "Sunrise Bloom Rug": 2004,
  "Blossom Royale": 2005,
  Rainbow: 2006,
  "Enchanted Rose": 2007,
  "Flower Cart": 2008,
  Capybara: 2009,
  Blossombeard: 2010,
  "Flower Rug": 2011,
  "Tea Rug": 2012,
  "Green Field Rug": 2013,
  "Fancy Rug": 2014,
  Clock: 2015,
  Vinny: 2016,
  "Desert Gnome": 2017,
  "Gaucho Rug": 2018,
  "Bullseye Board": 2019,
  "Chess Rug": 2020,
  Cluckapult: 2021,
  "Golden Gallant": 2022,
  "Golden Garrison": 2023,
  "Golden Guardian": 2024,
  "Novice Knight": 2025,
  "Regular Pawn": 2026,
  "Rookie Rook": 2027,
  "Silver Sentinel": 2028,
  "Silver Squire": 2029,
  "Silver Stallion": 2030,
  "Trainee Target": 2031,
  "Twister Rug": 2032,
  "Battlecry Drum": 2033,
  "Rice Panda": 2034,
  "Benevolence Flag": 2035,
  "Devotion Flag": 2036,
  "Generosity Flag": 2037,
  "Splendor Flag": 2038,
  "Jelly Lamp": 2039,
  "Paint Can": 2040,

  // Faction Shop
  "Sunflorian Throne": 2041,
  "Nightshade Throne": 2042,
  "Goblin Throne": 2043,
  "Bumpkin Throne": 2044,
  "Golden Sunflorian Egg": 2045,
  "Goblin Mischief Egg": 2046,
  "Bumpkin Charm Egg": 2047,
  "Nightshade Veil Egg": 2048,
  "Emerald Goblin Goblet": 2049,
  "Opal Sunflorian Goblet": 2050,
  "Sapphire Bumpkin Goblet": 2051,
  "Amethyst Nightshade Goblet": 2052,
  "Golden Faction Goblet": 2053,
  "Ruby Faction Goblet": 2054,
  "Sunflorian Bunting": 2055,
  "Nightshade Bunting": 2056,
  "Goblin Bunting": 2057,
  "Bumpkin Bunting": 2058,
  "Sunflorian Candles": 2059,
  "Nightshade Candles": 2060,
  "Goblin Candles": 2061,
  "Bumpkin Candles": 2062,
  "Sunflorian Left Wall Sconce": 2063,
  "Nightshade Left Wall Sconce": 2064,
  "Goblin Left Wall Sconce": 2065,
  "Bumpkin Left Wall Sconce": 2066,
  "Sunflorian Right Wall Sconce": 2067,
  "Nightshade Right Wall Sconce": 2068,
  "Goblin Right Wall Sconce": 2069,
  "Bumpkin Right Wall Sconce": 2070,
  "Gourmet Hourglass": 2071,
  "Harvest Hourglass": 2072,
  "Timber Hourglass": 2073,
  "Ore Hourglass": 2074,
  "Orchard Hourglass": 2075,
  "Blossom Hourglass": 2076,
  "Fisher's Hourglass": 2077,
  "Sunflorian Faction Rug": 2078,
  "Nightshade Faction Rug": 2079,
  "Goblin Faction Rug": 2080,
  "Bumpkin Faction Rug": 2081,
  "Goblin Gold Champion": 2082,
  "Goblin Silver Champion": 2083,
  "Goblin Bronze Champion": 2084,
  "Bumpkin Bronze Champion": 2085,
  "Bumpkin Gold Champion": 2086,
  "Bumpkin Silver Champion": 2087,
  "Nightshade Bronze Champion": 2088,
  "Nightshade Gold Champion": 2089,
  "Nightshade Silver Champion": 2090,
  "Sunflorian Bronze Champion": 2091,
  "Sunflorian Gold Champion": 2092,
  "Sunflorian Silver Champion": 2093,

  // Mutant Flowers
  "Desert Rose": 2100,
  // Pharaoh's Treasure
  "Hapy Jar": 2101,
  "Duamutef Jar": 2102,
  "Qebehsenuef Jar": 2103,
  "Imsety Jar": 2104,
  Cannonball: 2105,
  Sarcophagus: 2106,
  "Clay Tablet": 2107,
  "Snake in Jar": 2108,
  "Reveling Lemon": 2109,
  "Anubis Jackal": 2110,
  Sundial: 2111,
  "Sand Golem": 2112,
  "Cactus King": 2113,
  "Lemon Frog": 2114,
  "Scarab Beetle": 2115,
  "Pharaoh Chicken": 2116,
  "Adrift Ark": 2117,
  Castellan: 2118,
  "Sunlit Citadel": 2119,
  "Pharaoh Gnome": 2120,
  "Lemon Tea Bath": 2121,
  "Tomato Clown": 2122,
  Pyramid: 2123,
  Oasis: 2124,
  "Paper Reed": 2125,
  "Baobab Tree": 2126,
  Camel: 2127,
  "Tomato Bombard": 2128,
  "Stone Beetle": 2129,
  "Iron Beetle": 2130,
  "Gold Beetle": 2131,
  "Fairy Circle": 2132,
  Squirrel: 2133,
  Macaw: 2134,
  Butterfly: 2135,
  Marty: 2136,
  Miffy: 2137,
  Mog: 2138,
  Morty: 2139,
};

// The reverse of above
export const KNOWN_ITEMS: Record<string, InventoryItemName> = Object.assign(
  {},
  ...Object.entries(KNOWN_IDS).map(([a, b]) => ({ [b]: a })),
);

export const IDS = Object.values(KNOWN_IDS);
