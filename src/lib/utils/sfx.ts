import { Howl } from "howler";

import warChantMp3 from "../../assets/sound-effects/war_chant.mp3";

// Arcade - Common - Game Over
import gameOver from "../../assets/community/arcade/audio/game_over.mp3";

// Arcade - Greedy Goblin
import greedyGoblinIntro from "../../assets/community/arcade/greedy_goblin/audio/intro.mp3";
import greedyGoblinPlaying from "../../assets/community/arcade/greedy_goblin/audio/playing.mp3";
import greedyGoblinPick from "../../assets/community/arcade/greedy_goblin/audio/pick.mp3";

// Arcade - Chicken Fight
import chickenFightPlaying from "../../assets/community/arcade/chicken_fight/audio/playing.mp3";
import chickenFightPunch from "../../assets/community/arcade/chicken_fight/audio/punch.mp3";
import chickenFightHit from "../../assets/community/arcade/chicken_fight/audio/hit.mp3";
import { SOUNDS } from "assets/sound-effects/soundEffects";

export const loadAudio = (sounds: Howl[]) => {
  for (const sound of sounds) {
    if (sound.state() === "loaded" || sound.state() === "loading") return;

    sound.load();
  }
};

export const harvestAudio = new Howl({
  src: ["src/assets/sound-effects/harvest.mp3"],
  volume: 0.2,
  preload: false,
});

export const plantAudio = new Howl({
  src: ["src/assets/sound-effects/plant.mp3"],
  volume: 0.2,
  preload: false,
});

export const bakeryAudio = new Howl({
  src: ["src/assets/sound-effects/kitchen.mp3"],
  volume: 0.5,
  preload: false,
});

export const blacksmithAudio = new Howl({
  src: ["src/assets/sound-effects/blacksmith.mp3"],
  volume: 0.2,
  preload: false,
});

export const shopAudio = new Howl({
  src: ["src/assets/sound-effects/shop.mp3"],
  volume: 0.2,
  preload: false,
});

export const bankAudio = new Howl({
  src: ["src/assets/sound-effects/bank.mp3"],
  volume: 0.2,
  preload: false,
});

export const beggarAudio = new Howl({
  src: ["src/assets/sound-effects/beggar.mp3"],
  volume: 0.3,
  preload: false,
});

export const wishingWellAudio = new Howl({
  src: ["src/assets/sound-effects/wishing_well.mp3"],
  volume: 0.5,
  preload: false,
});

export const miningAudio = new Howl({
  src: ["src/assets/sound-effects/mining.mp3"],
  volume: 0.5,
  preload: false,
});

export const miningFallAudio = new Howl({
  src: ["src/assets/sound-effects/mining_fall.mp3"],
  volume: 0.5,
  preload: false,
});

export const chopAudio = new Howl({
  src: ["src/assets/sound-effects/chop.mp3"],
  volume: 0.3,
  preload: false,
});

export const treeFallAudio = new Howl({
  src: ["src/assets/sound-effects/tree_fall.mp3"],
  volume: 0.3,
  preload: false,
});

export const tailorAudio = new Howl({
  src: ["src/assets/sound-effects/tailor.mp3"],
  volume: 0.2,
  preload: false,
});

export const homeDoorAudio = new Howl({
  src: ["src/assets/sound-effects/home_door.mp3"],
  volume: 0.1,
  preload: false,
});

export const barnAudio = new Howl({
  src: ["src/assets/sound-effects/barn.mp3"],
  volume: 0.1,
  preload: false,
});

export const diaryAudio = new Howl({
  src: ["src/assets/sound-effects/diary.mp3"],
  volume: 0.2,
  preload: false,
});

export const battleAudio = new Howl({
  src: ["src/assets/sound-effects/battle.mp3"],
  volume: 0.2,
  preload: false,
});

export const fountainAudio = new Howl({
  src: ["src/assets/sound-effects/fountain.mp3"],
  volume: 0.2,
  preload: false,
});

export const observatoryAnimationAudio = new Howl({
  src: ["src./assets/sound-effects/mom_observatory_animation_sounds.mp3"],
  volume: 0.5,
  loop: true,
  preload: false,
});

export const merchantAudio = new Howl({
  src: ["src/assets/sound-effects/merchant.mp3"],
  volume: 0.2,
  preload: false,
});

export const burningSound = new Howl({
  src: ["src/assets/sound-effects/fire-crackling.mp3"],
  volume: 0.5,
  preload: false,
});

export const warChant = new Howl({
  src: [warChantMp3],
  volume: 0.2,
});

// Arcade - Greedy Goblin
export const greedyGoblinAudio = {
  greedyGoblinIntroAudio: new Howl({
    src: [greedyGoblinIntro],
    volume: 0.3,
  }),
  greedyGoblinPlayingAudio: new Howl({
    src: [greedyGoblinPlaying],
    volume: 0.2,
    loop: true,
  }),
  greedyGoblinPickAudio: new Howl({
    src: [greedyGoblinPick],
    volume: 0.2,
  }),
  greedyGoblinGameOverAudio: new Howl({
    src: [gameOver],
    volume: 0.2,
  }),
};

// Arcade - Greedy Goblin
export const chickenFightAudio = {
  chickenFightPlayingAudio: new Howl({
    src: [chickenFightPlaying],
    volume: 0.2,
    loop: true,
  }),
  chickenFightPunchAudio: new Howl({
    src: [chickenFightPunch],
    volume: 0.3,
  }),
  chickenFightHitAudio: new Howl({
    src: [chickenFightHit],
    volume: 0.2,
  }),
  chickenFightGameOverAudio: new Howl({
    src: [gameOver],
    volume: 0.2,
  }),
};

// Plaza
export const mazeOver = new Howl({
  src: [SOUNDS.notifications.maze_over],
  volume: 0.2,
});
