import React, { useContext } from "react";

import { Balance } from "components/Balance";
import { Inventory } from "components/Inventory";
import { VisitBanner } from "../../../components/ui/VisitBanner";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { BumpkinHUD } from "./components/BumpkinHUD";

import { Menu } from "./components/Menu";
import { Buildings } from "../buildings/Buildings";

/**
 * Heads up display - a concept used in games for the small overlayed display of information.
 * Balances, Inventory, actions etc.
 */
export const Hud: React.FC = () => {
  const { gameService, shortcutItem } = useContext(Context);
  const [gameState] = useActor(gameService);

  const landId = gameState.context.state.id;

  return (
    <div data-html2canvas-ignore="true" aria-label="Hud">
      <Menu />

      <Buildings />

      <BumpkinHUD />
      <Balance balance={gameState.context.state.balance} />
      <Inventory
        inventory={gameState.context.state.inventory}
        shortcutItem={shortcutItem}
        isFarming
      />
      {/* <AudioPlayer isFarming /> */}
      <VisitBanner id={landId} />
    </div>
  );
};
