import "./OrderComplete.css"
import React from "react"
import { useTranslation } from "../../../hooks/useTranslation.tsx"

interface OrderCompleteProps {
  orderNumber: string | number;
  setIsProfilePage: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderComplete: React.FC<OrderCompleteProps> = ({ orderNumber, setIsProfilePage }) => {
  // useTranslation.jsx
  const { t } = useTranslation()

  const handleProfileRedirect = () => {
    setIsProfilePage(true)
  }

  return (
    <div className="order-complete-container dark:border-[#252525] dark:bg-[#252525]">
      <span className="order-complete-text">{t("orderCompleteNotification")}</span>

      <div className="order-complete-inner-container">
        <div className="order-complete-left">
          <p className="dark:text-white">{${t("orderCompleteOrderNumber")} ${orderNumber}. ${t("orderCompleteSeeProfile")}}</p>
        </div>
        <div className="order-complete-right">
          <a onClick={handleProfileRedirect}>{t("orderCompleteProfile")}</a>
        </div>
      </div>
    </div>
  )
}

export default OrderComplete
