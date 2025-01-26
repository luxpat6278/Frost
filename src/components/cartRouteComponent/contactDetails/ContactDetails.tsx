import "./ContactDetails.css"
import React, { useEffect, useState } from "react"
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard"
import InputMask from "react-input-mask"
import { useSelector } from "react-redux"
import { useTranslation } from "../../../hooks/useTranslation"

// Типы для пропсов
interface ContactDetailsProps {
  setCurrentComponent: (component: string) => void
  ordersData: { phone: string; email: string; [key: string]: any }
  setOrdersData: React.Dispatch<React.SetStateAction<{ phone: string; email: string; [key: string]: any }>>
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ setCurrentComponent, ordersData, setOrdersData }) => {
  const user = useSelector((state: any) => state.auth.user)
  const [errorPhone, setErrorPhone] = useState<string>("")

  // useTranslation.jsx
  const { t } = useTranslation()

  function onChangePhoneNumber(event: React.ChangeEvent<HTMLInputElement>) {
    setOrdersData({
      ...ordersData,
      phone: event.target.value,
    })
  }

  // Проверка на заполнение телефонной строки
  function isPhoneComplete(phone: string): boolean {
    return phone.length === 16
  }

  function proceed() {
    if (isPhoneComplete(ordersData.phone)) {
      setCurrentComponent("delivery")
    } else {
      setErrorPhone(t("contactsPhone"))
    }
  }

  return (
    <div className="contact-details-container dark:border-[#252525] dark:bg-[#252525]">
      <span className="contact-details-text">{t("contactsDetails")}</span>

      <div className="contact-details-content">
        <div className="contact-details-left">
          <p className="contact-details-label dark:text-white">{t("contactsLastName")}</p>

          <input
            className="contact-details-input contact-details-last-name dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            defaultValue={user.lastName}
          />

          <p className="contact-details-label dark:text-white">{t("contactsFirstName")}</p>
          <input
            className="contact-details-input contact-details-first-name dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            defaultValue={user.firstName}
          />

          <p className="contact-details-label dark:text-white">
            {t("contactsPatronym")} <span className="optional-text dark:text-white">{t("contactsOptional")}</span>
          </p>
          <input className="contact-details-input contact-details-patronymic dark:border-[#393939] dark:bg-[#393939]" type="text" />

          {/* InputMask для номера телефона */}
          {errorPhone ? (
            <>
              <p className="error-message">{t("contactsPhone")}</p>
              <InputMask
                mask="+7 999 999 99 99"
                value={ordersData.phone}
                onChange={onChangePhoneNumber}
                className="contact-details-input contact-details-phone dark:border-[#393939] dark:bg-[#393939]"
                maskChar={null}
                placeholder="+7"
              >
                {(inputProps) => <input {...inputProps} type="text" />}
              </InputMask>
            </>
          ) : (
            <>
              <p className="contact-details-label dark:text-white">{t("contactsPhone")}</p>
              <InputMask
                mask="+7 999 999 99 99"
                value={ordersData.phone}
                onChange={onChangePhoneNumber}
                className="contact-details-input contact-details-phone dark:border-[#393939] dark:bg-[#393939]"
                maskChar={null}
                placeholder="+7"
              >
                {(inputProps) => <input {...inputProps} type="text" />}
              </InputMask>
            </>
          )}
        </div>

        <div className="contact-details-right">
          <p className="contact-details-label dark:text-white">{t("contactsEmail")}</p>

          <input
            className="contact-details-input contact-details-email dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            defaultValue={user.email}
          />

          {user ? (
            <>
              <p className="contact-details-label-disabled dark:text-white">{t("contactsPassword")}</p>
              <input
                className="contact-details-input contact-details-password dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                disabled
              />

              <p className="contact-details-label-disabled dark:text-white">{t("contactsRepeatPassword")}</p>
              <input
                className="contact-details-input contact-details-confirm-password dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                disabled
              />
            </>
          ) : (
            <>
              <p className="contact-details-label dark:text-white">{t("contactsPassword")}</p>
              <input className="contact-details-input contact-details-password" type="text" />

              <p className="contact-details-label dark:text-white">{t("contactsRepeatPassword")}</p>
              <input className="contact-details-input contact-details-confirm-password" type="text" />
            </>
          )}
          <div className="contact-details-button-container">
            <ButtonStandard name={t("confirmButton")} className="contact-details-button" clickHandler={proceed} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactDetails