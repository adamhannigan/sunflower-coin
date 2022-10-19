import React from "react";

import easterBunny from "assets/nfts/easter/easter_bunny_eggs.gif";
import { PIXEL_SCALE } from "features/game/lib/constants";
export const EasterBunny: React.FC = () => {
  return (
    <img
      src={easterBunny}
      style={{
        width: `${PIXEL_SCALE * 40}px`,
      }}
      alt="Easter Bunny"
    />
  );
};
