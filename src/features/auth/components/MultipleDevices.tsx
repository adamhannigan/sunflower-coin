import React from "react";

import suspiciousGoblin from "assets/npcs/suspicious_goblin.gif";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

export const MultipleDevices: React.FC = () => {
  const { t } = useAppTranslation();
  return (
    <div className="flex flex-col text-center items-center p-1">
      <p>{t("error.multipleDevices.one")}</p>

      <img src={suspiciousGoblin} alt="Warning" className="w-16 m-2" />

      <p className="mt-2 mb-2 text-sm">{t("error.multipleDevices.two")}</p>
    </div>
  );
};
