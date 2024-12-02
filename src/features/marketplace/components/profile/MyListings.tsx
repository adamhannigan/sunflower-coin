import { Label } from "components/ui/Label";
import { InnerPanel } from "components/ui/Panel";
import React, { useContext, useState } from "react";
import * as Auth from "features/auth/lib/Provider";
import { isMobile } from "mobile-device-detect";

import trade from "assets/icons/trade.png";
import sflIcon from "assets/icons/sfl.webp";

import { Context } from "features/game/GameProvider";
import { useSelector } from "@xstate/react";
import { getKeys } from "features/game/types/decorations";
import { getTradeableDisplay } from "../../lib/tradeables";
import Decimal from "decimal.js-light";
import { useNavigate, useParams } from "react-router-dom";
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { InventoryItemName } from "features/game/types/game";
import { Modal } from "components/ui/Modal";
import { ClaimPurchase } from "./ClaimPurchase";
import { Button } from "components/ui/Button";
import classNames from "classnames";
import { MachineState } from "features/game/lib/gameMachine";
import { AuthMachineState } from "features/auth/lib/authMachine";
import { RemoveListing } from "../RemoveListing";
import { formatNumber } from "lib/utils/formatNumber";
import { tradeToId } from "features/marketplace/lib/offers";
import { KNOWN_ITEMS } from "features/game/types";
import { TRADE_LIMITS } from "features/game/actions/tradeLimits";

const _isCancellingOffer = (state: MachineState) =>
  state.matches("marketplaceListingCancelling");
const _trades = (state: MachineState) => state.context.state.trades;
const _authToken = (state: AuthMachineState) =>
  state.context.user.rawToken as string;

export const MyListings: React.FC = () => {
  const { t } = useAppTranslation();
  const params = useParams();
  const { gameService } = useContext(Context);
  const { authService } = useContext(Auth.Context);

  const [claimId, setClaimId] = useState<string>();
  const [removeListingId, setRemoveListingId] = useState<string>();

  const isCancellingListing = useSelector(gameService, _isCancellingOffer);
  const trades = useSelector(gameService, _trades);
  const authToken = useSelector(authService, _authToken);

  const navigate = useNavigate();

  const listings = trades.listings ?? {};

  const filteredListings =
    params.id && params.collection
      ? Object.fromEntries(
          Object.entries(listings).filter(([_, listing]) => {
            const listingItemId = tradeToId({
              details: {
                collection: listing.collection,
                items: listing.items,
              },
            });

            return (
              listing.collection === params.collection &&
              listingItemId === Number(params.id)
            );
          }),
        )
      : listings;

  if (getKeys(filteredListings).length === 0) return null;

  const claim = () => {
    const listing = listings[claimId as string];

    gameService.send("purchase.claimed", {
      tradeIds: [claimId],
    });

    // For on chain items let's fire a refresh
    const tradeType = listing.signature ? "onchain" : "instant";

    if (tradeType === "onchain") {
      gameService.send("RESET");
    }

    setClaimId(undefined);
  };

  const handleHide = () => {
    if (isCancellingListing) return;

    setRemoveListingId(undefined);
  };

  return (
    <>
      <Modal show={!!removeListingId} onHide={handleHide}>
        <RemoveListing
          listingIds={removeListingId ? [removeListingId] : []}
          authToken={authToken}
          onClose={() => setRemoveListingId(undefined)}
        />
      </Modal>
      <Modal show={!!claimId} onHide={() => setClaimId(undefined)}>
        {claimId && (
          <ClaimPurchase
            sfl={listings[claimId as string].sfl}
            onClaim={claim}
            onClose={() => setClaimId(undefined)}
          />
        )}
      </Modal>

      <InnerPanel className="mb-1">
        <div className="p-2">
          <div className="flex items-center justify-between">
            <Label className="mb-2" type="default" icon={trade}>
              {t("marketplace.myListings")}
            </Label>
          </div>
          <div className="flex flex-wrap">
            {getKeys(filteredListings).length === 0 ? (
              <p className="text-sm">{t("marketplace.noMyListings")}</p>
            ) : (
              <table className="w-full text-xs  border-collapse bg-[#ead4aa] ">
                <thead>
                  <tr>
                    <th className="p-1.5 w-2/5 text-left">
                      <p>{t("marketplace.item")}</p>
                    </th>
                    <th className="p-1.5 text-left">
                      <p>{t("marketplace.unitPrice")}</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {getKeys(filteredListings).map((id, index) => {
                    const listing = listings[id];
                    const itemName = getKeys(
                      listing.items ?? {},
                    )[0] as InventoryItemName;
                    const itemId = tradeToId({
                      details: {
                        collection: listing.collection,
                        items: listing.items,
                      },
                    });
                    const details = getTradeableDisplay({
                      id: itemId,
                      type: listing.collection,
                    });

                    const isResource =
                      getKeys(TRADE_LIMITS).includes(
                        KNOWN_ITEMS[Number(params.id)],
                      ) && params.collection === "collectibles";
                    const quantity = listing.items[itemName];
                    const price = listing.sfl;

                    return (
                      <tr
                        key={index}
                        className={classNames(
                          "relative bg-[#ead4aa] !py-10 transition-all",
                          {
                            "hover:shadow-md hover:scale-[100.5%] cursor-pointer":
                              Number(params.id) !== itemId,
                          },
                        )}
                        style={{
                          borderBottom: "1px solid #b96f50",
                          borderTop: index === 0 ? "1px solid #b96f50" : "",
                        }}
                        onClick={() =>
                          navigate(
                            `/marketplace/${listing.collection}/${itemId}`,
                          )
                        }
                      >
                        <td className="p-1.5 text-left w-12">
                          <div className="flex items-center">
                            <img
                              src={details.image}
                              className={"h-8 mr-3 sm:mr-4"}
                            />
                            <p className="text-sm">
                              {isMobile
                                ? `${isResource ? "x " + quantity : ""}`
                                : `${isResource ? quantity + " x" : ""} ${details.name}`}
                            </p>
                          </div>
                        </td>
                        <td className="p-1.5 text-left relative">
                          <div className="flex items-center">
                            <img src={sflIcon} className="h-5 mr-1" />
                            <p className="text-sm">
                              {new Decimal(
                                isResource
                                  ? formatNumber(price / Number(quantity), {
                                      decimalPlaces: 4,
                                    })
                                  : price,
                              ).toFixed(4)}
                            </p>
                          </div>
                        </td>
                        <td className="p-1.5 truncate flex items-center justify-end pr-2 h-full">
                          <Button
                            variant="secondary"
                            className="w-auto h-10"
                            onClick={
                              listing.boughtAt
                                ? () => setClaimId(id)
                                : () => setRemoveListingId(id)
                            }
                          >
                            {t(listing.boughtAt ? "claim" : "cancel")}
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </InnerPanel>
    </>
  );
};
