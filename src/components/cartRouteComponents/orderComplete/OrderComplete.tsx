import "./OrderComplete.css";
import React from "react";
import { useTranslation } from "../../../hooks/useTranslation.js";

interface OrderCompleteProps {
  orderNumber: string;
  setIsProfilePage: (isProfile: boolean) => void;
}

const OrderComplete: React.FC<OrderCompleteProps> = ({ orderNumber, setIsProfilePage }) => {
  const { t } = useTranslation();

  function handleProfileRedirect() {
    setIsProfilePage(true);
  }

  return (
    <div className="cart-menu-container dark:border-[#252525] dark:bg-[#252525]">
      <span className="cart-text">{t("orderCompleteNotification")}</span>

      <div className="final-container">
        <div className="final-left">
          <p className="dark:text-white">
            {`${t("orderCompleteOrderNumber")} ${orderNumber}. ${t("orderCompleteSeeProfile")}`}
          </p>
        </div>
        <div className="final-right">
          <a onClick={handleProfileRedirect} className="cursor-pointer dark:text-blue-400">
            {t("orderCompleteProfile")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
