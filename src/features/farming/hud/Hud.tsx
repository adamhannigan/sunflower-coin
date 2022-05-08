import React from "react";

import { Inventory } from "./components/Inventory";
import { Menu } from "./components/Menu";
import { AudioPlayer } from "components/ui/AudioPlayer";
import { VisitBanner } from "./components/VisitBanner";
import { Balance } from "features/hud/components/Balance";

/**
 * Heads up display - a concept used in games for the small overlayed display of information.
 * Balances, Inventory, actions etc.
 */
export const Hud: React.FC = () => {
  return (
    <div data-html2canvas-ignore="true" aria-label="Hud">
      <Menu />
      <Balance />
      <Inventory />
      <AudioPlayer />
      <VisitBanner />
    </div>
  );
};
