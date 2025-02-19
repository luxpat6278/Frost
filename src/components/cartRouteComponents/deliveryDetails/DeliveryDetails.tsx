import "./DeliveryDetails.css";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard";
import axios from "axios";
import { useTranslation } from "../../../hooks/useTranslation";

interface OrdersData {
  area: string;
  city: string;
  street: string;
  house: string;
  apartment: string;
  phone: string;
}

interface ErrorMessages {
  area?: string;
  city?: string;
  street?: string;
  house?: string;
  apartment?: string;
  phone?: string;
}

interface DeliveryDetailsProps {
  setCurrentComponent: (component: string) => void;
  ordersData: OrdersData;
  setOrdersData: React.Dispatch<React.SetStateAction<OrdersData>>;
  setOrderNumber: (order: string) => void;
  setErrorMessages: React.Dispatch<React.SetStateAction<ErrorMessages>>;
  errorMessages: ErrorMessages;
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  setCurrentComponent,
  ordersData,
  setOrdersData,
  setOrderNumber,
  setErrorMessages,
  errorMessages,
}) => {
  const { t } = useTranslation();

  // Универсальная функция для обновления ordersData
  const handleInputChange =
    (field: keyof OrdersData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setOrdersData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  // Отправка данных о доставке
  const submitDelivery = async () => {
    try {
      const response = await axios.post("https://frost.runtime.kz/api/orders", ordersData);
      setOrderNumber(response.data);
      setCurrentComponent("final");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data?.errors) {
        const errors = error.response.data.errors as Partial<ErrorMessages>;
        setErrorMessages({
          area: errors.area || "",
          city: errors.city || "",
          street: errors.street || "",
          house: errors.house || "",
          apartment: errors.apartment || "",
          phone: errors.phone || "",
        });
      }
    }
  };

  return (
    <div className="cart-menu-container dark:border-[#252525] dark:bg-[#252525]">
      <span className="cart-text">{t("deliveryDetails")}</span>

      <div className="delivery-container">
        <div className="delivery-container-left">
          {errorMessages.area ? (
            <p className="error-message">{errorMessages.area}</p>
          ) : (
            <p className="delivery-text dark:text-white">{t("deliveryRegion")}</p>
          )}
          <input
            className="delivery-area contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.area}
            onChange={handleInputChange("area")}
          />

          {errorMessages.city ? (
            <p className="error-message">{errorMessages.city}</p>
          ) : (
            <p className="delivery-text dark:text-white">{t("deliveryCity")}</p>
          )}
          <input
            className="delivery-city contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.city}
            onChange={handleInputChange("city")}
          />
        </div>

        <div className="delivery-container-right">
          {errorMessages.street ? (
            <p className="error-message">{errorMessages.street}</p>
          ) : (
            <p className="delivery-text dark:text-white">{t("deliveryStreet")}</p>
          )}
          <input
            className="delivery-street contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.street}
            onChange={handleInputChange("street")}
          />

          <div className="house-apartment">
            <div className="house">
              {errorMessages.house ? (
                <p className="error-message">{errorMessages.house}</p>
              ) : (
                <p className="delivery-text dark:text-white">{t("deliveryHouse")}</p>
              )}
              <input
                className="delivery-house ha-style dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                value={ordersData.house}
                onChange={handleInputChange("house")}
              />
            </div>

            <div className="apartment">
              {errorMessages.apartment ? (
                <p className="error-message">{errorMessages.apartment}</p>
              ) : (
                <p className="delivery-text dark:text-white">{t("deliveryApartment")}</p>
              )}
              <input
                className="delivery-apt ha-style dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                value={ordersData.apartment}
                onChange={handleInputChange("apartment")}
              />
            </div>
          </div>

          <div className="delivery-button-container">
            <ButtonStandard name={t("confirmButton")} className="deliveryComponent" clickHandler={submitDelivery} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
