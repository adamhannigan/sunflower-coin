import mapJSON from "assets/map/bumpkin_house.json";

import { SceneId } from "../mmoMachine";
import { NPCBumpkin } from "./BaseScene";
import { FactionHouseScene } from "./FactionHouseScene";

export const BUMPKIN_HOUSE_NPCS: NPCBumpkin[] = [
  {
    x: 384,
    y: 199,
    npc: "haymitch",
    direction: "left",
  },
  {
    x: 182,
    y: 160,
    npc: "buttercup",
    direction: "right",
  },
  {
    x: 389,
    y: 335,
    npc: "chef maple",
    direction: "left",
  },
];

export class BumpkinHouseScene extends FactionHouseScene {
  sceneId: SceneId = "bumpkin_house";

  constructor() {
    super({
      name: "bumpkin_house",
      map: { json: mapJSON },
      audio: { fx: { walk_key: "wood_footstep" } },
    });
  }

  preload() {
    super.preload();

    this.load.image("pet_sleeping", "world/bumpkin_pet_sleeping.webp");
    this.load.image("pet_satiated", "world/bumpkin_pet_happy.webp");
    this.load.image("pet_hungry", "world/bumpkin_pet_hungry.webp");
  }

  setUpPet() {
    // check game state to determine the pet status
    // render the correct pet
    this.add.image(240, 230, "pet_sleeping");
  }

  create() {
    super.create();
    this.map = this.make.tilemap({
      key: "faction_house",
    });

    this.initialiseNPCs(BUMPKIN_HOUSE_NPCS);

    this.setupPrize({ x: 240, y: 368 });
    this.setUpPet();
  }

  update() {
    super.update();
  }
}
