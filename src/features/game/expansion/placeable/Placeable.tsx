import React, { useContext, useEffect, useRef, useState } from "react";
import { useActor } from "@xstate/react";
import { Context } from "features/game/GameProvider";
import { MachineInterpreter } from "./editingMachine";
import { GRID_WIDTH_PX, PIXEL_SCALE } from "features/game/lib/constants";

import Draggable from "react-draggable";
import { detectCollision } from "./lib/collisionDetection";
import classNames from "classnames";
import { Coordinates } from "../components/MapPlacement";
import {
  BUILDINGS_DIMENSIONS,
  PlaceableName,
} from "features/game/types/buildings";
import {
  ANIMAL_DIMENSIONS,
  COLLECTIBLES_DIMENSIONS,
} from "features/game/types/craftables";
import { BUILDING_COMPONENTS } from "features/island/buildings/components/building/Building";
import { COLLECTIBLE_COMPONENTS } from "features/island/collectibles/Collectible";

import { Section } from "lib/utils/hooks/useScrollIntoView";
import { SUNNYSIDE } from "assets/sunnyside";
import { READONLY_RESOURCE_COMPONENTS } from "features/island/resources/Resource";
import { ITEM_DETAILS } from "features/game/types/images";
import { HungryChicken } from "features/island/chickens/Chicken";

const PLACEABLES: Record<PlaceableName, React.FC<any>> = {
  Chicken: () => <HungryChicken />,
  ...BUILDING_COMPONENTS,
  ...COLLECTIBLE_COMPONENTS,
  ...READONLY_RESOURCE_COMPONENTS,
  "Dirt Path": () => (
    <img
      src={ITEM_DETAILS["Dirt Path"].image}
      style={{ width: `${PIXEL_SCALE * 22}px` }}
    />
  ),
};

export const getInitialCoordinates = (origin?: Coordinates) => {
  // This container helps us to calculate the scroll pixels as in our application
  // window do not scroll but this container dose
  const pageScrollContainer = document.getElementsByClassName(
    "page-scroll-container"
  )[0];

  const viewportMidPointX =
    window.innerWidth / 2 + pageScrollContainer.scrollLeft;
  const viewportMidPointY =
    window.innerHeight / 2 + pageScrollContainer.scrollTop;

  const land = document
    .getElementById(Section.GenesisBlock)
    ?.getBoundingClientRect();
  let landMidX =
    pageScrollContainer.scrollLeft +
    (land?.left ?? 0) +
    ((land?.width ?? 0) / 2 ?? 0);
  let landMidY =
    pageScrollContainer.scrollTop +
    (land?.top ?? 0) +
    ((land?.height ?? 0) / 2 ?? 0);

  if (origin) {
    const xOffset = viewportMidPointX - landMidX;
    const yOffset = viewportMidPointY - landMidY;

    landMidX -= GRID_WIDTH_PX * origin.x - xOffset;
    landMidY += GRID_WIDTH_PX * origin.y + yOffset;
  }

  // This division and then multiplication with GRID_WIDTH_PX has been done as
  // due to a small pixel difference in rounding, the actual placeable square was
  // a bit off from the land square.
  const INITIAL_POSITION_X =
    Math.round((viewportMidPointX - landMidX) / GRID_WIDTH_PX) * GRID_WIDTH_PX;
  const INITIAL_POSITION_Y =
    Math.round((viewportMidPointY - landMidY) / GRID_WIDTH_PX) * GRID_WIDTH_PX;
  return [INITIAL_POSITION_X, INITIAL_POSITION_Y];
};

export const Placeable: React.FC = () => {
  const nodeRef = useRef(null);
  const { gameService } = useContext(Context);

  const [showHint, setShowHint] = useState(true);

  const child = gameService.state.children.editing as MachineInterpreter;

  const [machine, send] = useActor(child);
  const { placeable, collisionDetected, origin, coordinates } = machine.context;
  const { width, height } = {
    ...BUILDINGS_DIMENSIONS,
    ...COLLECTIBLES_DIMENSIONS,
    ...ANIMAL_DIMENSIONS,
  }[placeable];

  const detect = ({ x, y }: Coordinates) => {
    const collisionDetected = detectCollision(gameService.state.context.state, {
      x,
      y,
      width,
      height,
    });

    send({ type: "UPDATE", coordinates: { x, y }, collisionDetected });
  };

  const [DEFAULT_POSITION_X, DEFAULT_POSITION_Y] =
    getInitialCoordinates(origin);

  useEffect(() => {
    const [startingX, startingY] = getInitialCoordinates({ x: 0, y: 0 });

    detect({
      x: Math.round(startingX / GRID_WIDTH_PX),
      y: Math.round(-startingY / GRID_WIDTH_PX),
    });
  }, []);

  useEffect(() => {
    setShowHint(true);
  }, [origin]);

  return (
    <>
      <div
        id="bg-overlay "
        className=" bg-black opacity-40 fixed inset-0"
        style={{
          zIndex: 99,
          height: "200%",
          right: "-1000px",
          left: "-1000px",
          top: "-1000px",
          overflow: "hidden",
          bottom: "1000px",
        }}
      />
      <div className="fixed left-1/2 top-1/2" style={{ zIndex: 100 }}>
        <Draggable
          key={`${origin?.x}-${origin?.y}`}
          defaultPosition={{
            x: DEFAULT_POSITION_X,
            y: DEFAULT_POSITION_Y,
          }}
          nodeRef={nodeRef}
          grid={[GRID_WIDTH_PX, GRID_WIDTH_PX]}
          onStart={() => {
            // reset
            send("DRAG");
          }}
          onDrag={(_, data) => {
            const x = Math.round(data.x / GRID_WIDTH_PX);
            const y = Math.round(-data.y / GRID_WIDTH_PX);

            detect({ x, y });
            setShowHint(false);
          }}
          onStop={(_, data) => {
            const x = Math.round(data.x / GRID_WIDTH_PX);
            const y = Math.round(-data.y / GRID_WIDTH_PX);

            detect({ x, y });

            send("DROP");
          }}
        >
          <div
            ref={nodeRef}
            data-prevent-drag-scroll
            className={classNames("flex flex-col items-center", {
              "cursor-grab": !machine.matches({ editing: "dragging" }),
              "cursor-grabbing": machine.matches({ editing: "dragging" }),
            })}
            style={{ pointerEvents: "auto" }}
          >
            {showHint && (
              <div
                className="flex absolute pointer-events-none"
                style={{
                  top: "-35px",
                  width: "135px",
                }}
              >
                <img src={SUNNYSIDE.icons.drag} className="h-6 mr-2" />
                <span className="text-white text-sm">Drag me</span>
              </div>
            )}
            <div
              draggable={false}
              className={classNames(
                " w-full h-full relative img-highlight pointer-events-none",
                {
                  "bg-green-background/80": !collisionDetected,
                  "bg-red-background/80": collisionDetected,
                }
              )}
              style={{
                width: `${width * GRID_WIDTH_PX}px`,
                height: `${height * GRID_WIDTH_PX}px`,
              }}
            >
              {PLACEABLES[placeable]({
                coordinates,
              })}
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
};
