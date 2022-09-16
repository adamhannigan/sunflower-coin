import Decimal from "decimal.js-light";
import { ConsumableName } from "features/game/types/consumables";
import { GameState } from "features/game/types/game";
import cloneDeep from "lodash.clonedeep";

export type FeedBumpkinAction = {
  type: "bumpkin.feed";
  food: ConsumableName;
};

type Options = {
  state: Readonly<GameState>;
  action: FeedBumpkinAction;
  createdAt?: number;
};

export function feedBumpkin({
  state,
  action,
  createdAt = Date.now(),
}: Options): GameState {
  const stateCopy = cloneDeep(state);

  const bumpkin = stateCopy.bumpkin;
  const quantity = stateCopy.inventory[action.food] ?? new Decimal(0);

  if (bumpkin === undefined) {
    throw new Error("You do not have a Bumpkin");
  }

  if (quantity.lte(0)) {
    throw new Error("You have none of this food type");
  }

  stateCopy.inventory[action.food] = quantity.sub(1);

  return stateCopy;
}
