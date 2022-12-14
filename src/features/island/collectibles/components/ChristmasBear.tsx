import React from "react";

import bear from "assets/sfts/bears/christmas_bear.png";
import { PIXEL_SCALE } from "features/game/lib/constants";

export const ChristmasBear: React.FC = () => {
  return (
    <>
      <img
        src={bear}
        style={{
          width: `${PIXEL_SCALE * 20}px`,
          bottom: `${PIXEL_SCALE * 0}px`,
          left: `${PIXEL_SCALE * 0}px`,
        }}
        className="absolute"
        alt="Christmas Bear"
      />
    </>
  );
};
