import { INITIAL_FARM } from "features/game/lib/constants";
import { skillUse } from "./skillUsed";

describe("skillUse", () => {
  const dateNow = Date.now();

  it("requires Bumpkin to have a skill", () => {
    expect(() => {
      skillUse({
        state: {
          ...INITIAL_FARM,
          bumpkin: {
            ...INITIAL_FARM.bumpkin,
            skills: {},
          },
        },
        action: { type: "skill.used", skill: "Green Thumb" },
        createdAt: dateNow,
      });
    }).toThrow("You do not have this skill");
  });

  it("requires the skill to be a power", () => {
    expect(() => {
      skillUse({
        state: {
          ...INITIAL_FARM,
          bumpkin: {
            ...INITIAL_FARM.bumpkin,
            skills: { "Green Thumb": 1 },
          },
        },
        action: { type: "skill.used", skill: "Green Thumb" },
        createdAt: dateNow,
      });
    }).toThrow("This skill does not have a power");
  });

  it("requires the skill to be off cooldown", () => {
    expect(() => {
      skillUse({
        state: {
          ...INITIAL_FARM,
          bumpkin: {
            ...INITIAL_FARM.bumpkin,
            skills: { "Instant Growth": 1 },
            previousPowerUseAt: { "Instant Growth": dateNow },
          },
        },
        action: { type: "skill.used", skill: "Instant Growth" },
        createdAt: dateNow,
      });
    }).toThrow("This skill is still under cooldown");
  });

  it("adds the power.useAt to the bumpkin", () => {
    const result = skillUse({
      state: {
        ...INITIAL_FARM,
        bumpkin: {
          ...INITIAL_FARM.bumpkin,
          skills: { "Instant Growth": 1 },
        },
      },
      action: { type: "skill.used", skill: "Instant Growth" },
      createdAt: dateNow,
    });

    expect(result.bumpkin?.previousPowerUseAt).toEqual({
      "Instant Growth": dateNow,
    });
  });

  describe("useInstantGrowth", () => {
    it("activates Instant Growth", () => {
      const state = skillUse({
        state: {
          ...INITIAL_FARM,
          bumpkin: {
            ...INITIAL_FARM.bumpkin,
            skills: { "Instant Growth": 1 },
          },
          crops: {
            "123": {
              crop: {
                id: "456",
                name: "Kale",
                plantedAt: Date.now(),
                amount: 20,
              },
              createdAt: Date.now(),
              x: 1,
              y: 1,
              height: 1,
              width: 1,
            },
            "789": {
              crop: {
                id: "147",
                name: "Kale",
                plantedAt: Date.now(),
                amount: 20,
              },
              createdAt: Date.now(),
              x: 1,
              y: 1,
              height: 1,
              width: 1,
            },
          },
        },
        action: {
          type: "skill.used",
          skill: "Instant Growth",
        },
        createdAt: Date.now(),
      });

      expect(state.crops["123"].crop?.plantedAt).toEqual(1);
      expect(state.crops["789"].crop?.plantedAt).toEqual(1);
    });

    it("doesn't activate Instant Growth if they have a different skill", () => {
      const state = skillUse({
        state: {
          ...INITIAL_FARM,
          bumpkin: {
            ...INITIAL_FARM.bumpkin,
            skills: { "Instant Gratification": 1 },
          },
          crops: {
            "123": {
              crop: {
                id: "456",
                name: "Kale",
                plantedAt: Date.now(),
                amount: 20,
              },
              createdAt: Date.now(),
              x: 1,
              y: 1,
              height: 1,
              width: 1,
            },
            "789": {
              crop: {
                id: "147",
                name: "Kale",
                plantedAt: Date.now(),
                amount: 20,
              },
              createdAt: Date.now(),
              x: 1,
              y: 1,
              height: 1,
              width: 1,
            },
          },
        },
        action: {
          type: "skill.used",
          skill: "Instant Gratification",
        },
        createdAt: Date.now(),
      });

      expect(state.crops["123"].crop?.plantedAt).toEqual(Date.now());
      expect(state.crops["789"].crop?.plantedAt).toEqual(Date.now());
    });
  });

  describe("useTreeBlitz", () => {
    it("activates Tree Blitz", () => {
      const state = skillUse({
        state: {
          ...INITIAL_FARM,
          bumpkin: {
            ...INITIAL_FARM.bumpkin,
            skills: { "Tree Blitz": 1 },
          },
          trees: {
            "123": {
              wood: {
                amount: 1,
                choppedAt: Date.now(),
              },
              x: 1,
              y: 1,
              height: 2,
              width: 2,
              createdAt: Date.now(),
            },
            "456": {
              wood: {
                amount: 1,
                choppedAt: Date.now(),
              },
              x: 3,
              y: 1,
              height: 2,
              width: 2,
              createdAt: Date.now(),
            },
          },
        },
        action: { type: "skill.used", skill: "Tree Blitz" },
        createdAt: Date.now(),
      });

      expect(state.trees["123"].wood.choppedAt).toEqual(1);
      expect(state.trees["456"].wood.choppedAt).toEqual(1);
    });
    it("does not activate Tree Blitz when they have a different skill", () => {
      const state = skillUse({
        state: {
          ...INITIAL_FARM,
          bumpkin: {
            ...INITIAL_FARM.bumpkin,
            skills: { "Instant Growth": 1 },
          },
          trees: {
            "123": {
              wood: {
                amount: 1,
                choppedAt: Date.now(),
              },
              x: 1,
              y: 1,
              height: 2,
              width: 2,
              createdAt: Date.now(),
            },
            "456": {
              wood: {
                amount: 1,
                choppedAt: Date.now(),
              },
              x: 3,
              y: 1,
              height: 2,
              width: 2,
              createdAt: Date.now(),
            },
          },
        },
        action: { type: "skill.used", skill: "Instant Growth" },
        createdAt: Date.now(),
      });

      expect(state.trees["123"].wood.choppedAt).toEqual(Date.now());
      expect(state.trees["456"].wood.choppedAt).toEqual(Date.now());
    });
  });

  describe.only("useGreenhouseGuru", () => {
    it("activates Greenhouse Guru", () => {
      const state = skillUse({
        state: {
          ...INITIAL_FARM,
          bumpkin: {
            ...INITIAL_FARM.bumpkin,
            skills: { "Greenhouse Guru": 1 },
          },
          greenhouse: {
            oil: 76,
            pots: {
              "1": {
                plant: {
                  amount: 1,
                  name: "Olive",
                  plantedAt: 1733803854974,
                },
              },
              "2": {
                plant: {
                  amount: 1,
                  name: "Olive",
                  plantedAt: 1733803856819,
                },
              },
              "3": {
                plant: {
                  amount: 1,
                  name: "Olive",
                  plantedAt: 1733803855784,
                },
              },
              "4": {
                plant: {
                  amount: 1,
                  name: "Olive",
                  plantedAt: 1733803857337,
                },
              },
            },
          },
        },
        action: { type: "skill.used", skill: "Greenhouse Guru" },
        createdAt: Date.now(),
      });

      expect(state.greenhouse.pots[1].plant?.plantedAt).toEqual(1);
    });
  });
});
