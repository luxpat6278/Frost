import "./DeliveryDetails.css"
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard"
import axios from "axios"
import { useTranslation } from "../../../hooks/useTranslation"

// Типы для пропсов
interface DeliveryDetailsProps {
  setCurrentComponent: (component: string) => void
  ordersData: {
    area: string
    city: string
    street: string
    house: string
    apartment: string
  }
  setOrdersData: React.Dispatch<React.SetStateAction<{
    area: string
    city: string
    street: string
    house: string
    apartment: string
  }>>
  setOrderNumber: (orderNumber: string) => void
  setErrorMessages: React.Dispatch<React.SetStateAction<{
    area: string
    city: string
    street: string
    house: string
    apartment: string
    phone: string
  }>>
  errorMessages: {
    area: string
    city: string
    street: string
    house: string
    apartment: string
    phone: string
  }
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  setCurrentComponent,
  ordersData,
  setOrdersData,
  setOrderNumber,
  setErrorMessages,
  errorMessages
}) => {
  // Поле ввода для области
  function onChangeArea(event: React.ChangeEvent<HTMLInputElement>) {
    setOrdersData({
      ...ordersData,
      area: event.target.value,
    })
  }

  // Поле ввода для города
  function onChangeCity(event: React.ChangeEvent<HTMLInputElement>) {
    setOrdersData({
      ...ordersData,
      city: event.target.value,
    })
  }

  // Поле ввода для улицы
  function onChangeStreet(event: React.ChangeEvent<HTMLInputElement>) {
    setOrdersData({
      ...ordersData,
      street: event.target.value,
    })
  }

  // Поле ввода для дома
  function onChangeHouse(event: React.ChangeEvent<HTMLInputElement>) {
    setOrdersData({
      ...ordersData,
      house: event.target.value,
    })
  }

  // Поле ввода для квартиры
  function onChangeApartment(event: React.ChangeEvent<HTMLInputElement>) {
    setOrdersData({
      ...ordersData,
      apartment: event.target.value,
    })
  }

  // Запрос на получение номера заказа
  function submitDelivery() {
    axios
      .post("https://frost.runtime.kz/api/orders", ordersData)
      .then(function (response) {
        setOrderNumber(response.data)
        setCurrentComponent("final")
      })
      .catch(function (error) {
        const errors = error.response.data.errors
        setErrorMessages({
          apartment: errors.apartment ? errors.apartment[0] : "",
          area: errors.area ? errors.area[0] : "",
          city: errors.city ? errors.city[0] : "",
          house: errors.house ? errors.house[0] : "",
          phone: errors.phone ? errors.phone[0] : "",
          street: errors.street ? errors.street[0] : "",
        })
      })
  }

  function proceed() {
    submitDelivery()
  }

  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <div className="delivery-details-container dark:border-[#252525] dark:bg-[#252525]">
      <span className="delivery-details-text">{t("deliveryDetails")}</span>

      <div className="delivery-details-content">
        <div className="delivery-details-left">
          {errorMessages.area ? (
            <p className="error-message">{errorMessages.area}</p>
          ) : (
            <p className="delivery-details-text dark:text-white">{t("deliveryRegion")}</p>
          )}
          <input
            className="delivery-details-area delivery-details-input dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.area}
            onChange={onChangeArea}
          />

          {errorMessages.city ? (
            <p className="error-message">{errorMessages.city}</p>
          ) : (
            <p className="delivery-details-text dark:text-white">{t("deliveryCity")}</p>
          )}
          <input
            className="delivery-details-city delivery-details-input dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.city}
            onChange={onChangeCity}
          />
        </div>

        <div className="delivery-details-right">
          {errorMessages.street ? (
            <p className="error-message">{errorMessages.street}</p>
          ) : (
            <p className="delivery-details-text dark:text-white">{t("deliveryStreet")}</p>
          )}
          <input
            className="delivery-details-street delivery-details-input dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            value={ordersData.street}
            onChange={onChangeStreet}
          />

          <div className="house-apartment">
            <div className="house">
              {errorMessages.house ? (
                <p className="error-message">{errorMessages.house}</p>
              ) : (
                <p className="delivery-details-text dark:text-white">{t("deliveryHouse")}</p>
              )}
              <input
                className="delivery-details-house house-apartment-input dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                value={ordersData.house}
                onChange={onChangeHouse}
              />
            </div>

            <div className="apartment">
              {errorMessages.apartment ? (
                <p className="error-message">{errorMessages.apartment}</p>
              ) : (
                <p className="delivery-details-text dark:text-white">{t("deliveryApartment")}</p>
              )}
              <input
                className="delivery-details-apartment house-apartment-input dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                value={ordersData.apartment}
                onChange={onChangeApartment}
              />
            </div>
          </div>

          <div className="delivery-details-button-container">
            <ButtonStandard name={t("confirmButton")} className="delivery-details-button" clickHandler={proceed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryDetails