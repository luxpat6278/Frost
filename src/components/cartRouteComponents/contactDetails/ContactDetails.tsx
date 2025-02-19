import "./ContactDetails.css";
import React, { useEffect, useState } from "react";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard";
import InputMask from "react-input-mask";
import { useSelector } from "react-redux";
import { useTranslation } from "../../../hooks/useTranslation";

interface ContactDetailsProps {
  setCurrentComponent: (component: string) => void;
  ordersData: { phone: string };
  setOrdersData: React.Dispatch<React.SetStateAction<{ phone: string }>>;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ setCurrentComponent, ordersData, setOrdersData }) => {
  const user = useSelector((state: any) => state.auth.user);
  const [errorPhone, setErrorPhone] = useState<string>("");

  const { t } = useTranslation();

  const onChangePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrdersData({
      ...ordersData,
      phone: event.target.value,
    });
  };

  const isPhoneComplete = (phone: string): boolean => {
    return phone.length === 16;
  };

  const proceed = () => {
    if (isPhoneComplete(ordersData.phone)) {
      setCurrentComponent("delivery");
    } else {
      setErrorPhone(t("contactsPhone"));
    }
  };

  return (
    <div className="cart-menu-container dark:border-[#252525] dark:bg-[#252525]">
      <span className="cart-text">{t("contactsDetails")}</span>

      <div className="contacts-container">
        <div className="contacts-container-left">
          <p className="contacts-text dark:text-white">{t("contactsLastName")}</p>
          <input
            className="contacts-last-name contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            defaultValue={user?.lastName || ""}
          />

          <p className="contacts-text dark:text-white">{t("contactsFirstName")}</p>
          <input
            className="contacts-first-name contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            defaultValue={user?.firstName || ""}
          />

          <p className="contacts-text dark:text-white">
            {t("contactsPatronym")} <span className="optional-text dark:text-white">{t("contactsOptional")}</span>
          </p>
          <input className="contacts-patronymic contacts-style dark:border-[#393939] dark:bg-[#393939]" type="text" />

          {errorPhone ? (
            <>
              <p className="error-message">{t("contactsPhone")}</p>
              <InputMask
                mask="+7 999 999 99 99"
                value={ordersData.phone}
                onChange={onChangePhoneNumber}
                className="contacts-phone contacts-style dark:border-[#393939] dark:bg-[#393939]"
                maskChar={null}
                placeholder="+7"
              >
                {(inputProps) => <input {...inputProps} type="text" />}
              </InputMask>
            </>
          ) : (
            <>
              <p className="contacts-text dark:text-white">{t("contactsPhone")}</p>
              <InputMask
                mask="+7 999 999 99 99"
                value={ordersData.phone}
                onChange={onChangePhoneNumber}
                className="contacts-phone contacts-style dark:border-[#393939] dark:bg-[#393939]"
                maskChar={null}
                placeholder="+7"
              >
                {(inputProps) => <input {...inputProps} type="text" />}
              </InputMask>
            </>
          )}
        </div>

        <div className="contacts-container-right">
          <p className="contacts-text dark:text-white">{t("contactsEmail")}</p>
          <input
            className="contacts-email contacts-style dark:border-[#393939] dark:bg-[#393939]"
            type="text"
            defaultValue={user?.email || ""}
          />

          {user ? (
            <>
              <p className="contacts-text-disabled dark:text-white">{t("contactsPassword")}</p>
              <input
                className="contacts-password contacts-style dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                disabled
              />

              <p className="contacts-text-disabled dark:text-white">{t("contactsRepeatPassword")}</p>
              <input
                className="contacts-confirm-password contacts-style dark:border-[#393939] dark:bg-[#393939]"
                type="text"
                disabled
              />
            </>
          ) : (
            <>
              <p className="contacts-text dark:text-white">{t("contactsPassword")}</p>
              <input className="contacts-password contacts-style" type="text" />

              <p className="contacts-text dark:text-white">{t("contactsRepeatPassword")}</p>
              <input className="contacts-confirm-password contacts-style" type="text" />
            </>
          )}

          <div className="contacts-button-container">
            <ButtonStandard name={t("confirmButton")} className="contactsCartComponent" clickHandler={proceed} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
