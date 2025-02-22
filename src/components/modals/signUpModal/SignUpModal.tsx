import Modal from "../../../ui/modal/Modal";
import "./SignUpModal.css";
import React, { useState } from "react";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard";
import axios from "axios";
import Spinner from "../../../ui/spinner/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../slices/authSlice";
import { setLoading } from "../../../slices/loadingSlice";
import { useTranslation } from "../../../hooks/useTranslation";



// Типы пропсов
interface SignUpModalProps {
  isOpen: boolean;
  close: () => void;
  onClick: () => void;
  title: string;
  onClickLogIn: () => void;
  openEndRegistration: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  close,
  onClick,
  title,
  onClickLogIn,
  openEndRegistration,
}) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading.isLoading); // Можно улучшить типизацию для состояния loading

  // Состояния для имени, фамилии, почты, пароля и его подтверждения
  const [firstNameInput, setFirstNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [emailInput, setEmailInput] = useState<string>("");
  const [passInput, setPassInput] = useState<string>("");
  const [confirmPassInput, setConfirmPassInput] = useState<string>("");

  // Состояние для уведомления об ошибке
  const [errorMessage, setErrorMessage] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleClick = function () {
    dispatch(setLoading(true));

    axios
      .post("https://frost.runtime.kz/api/registration", {
        first_name: firstNameInput,
        last_name: lastNameInput,
        email: emailInput,
        password: passInput,
      })
      .then(function (response) {
        console.log(response.data);
        dispatch(setLoading(false));
        close();
        openEndRegistration();
        dispatch(signIn(emailInput, passInput));
      })
      .catch(function (error) {
        const errors = error.response.data.errors;

        setErrorMessage({
          first_name: errors.first_name ? errors.first_name[0] : "",
          last_name: errors.last_name ? errors.last_name[0] : "",
          email: errors.email ? errors.email[0] : "",
          password: errors.password ? errors.password[0] : "",
        });

        dispatch(setLoading(false));
      });
  };

  const handleFirstNameInput = (content: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameInput(content.target.value);
  };

  const handleLastNameInput = (content: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameInput(content.target.value);
  };

  const handleEmailInput = (content: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(content.target.value);
  };

  const handlePassInput = (content: React.ChangeEvent<HTMLInputElement>) => {
    setPassInput(content.target.value);
  };

  const handleConfirmPassInput = (content: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassInput(content.target.value);
  };

  // Обновление формы регистрации при закрытии
  const resetForm = () => {
    setFirstNameInput("");
    setLastNameInput("");
    setEmailInput("");
    setPassInput("");
    setConfirmPassInput("");
  };

  const handleClose = () => {
    close();
    resetForm();
  };

  return (
    <div className="modal-container">
      <span className="modal-title dark:text-white" onClick={onClick}>
        {title}
      </span>

      <Modal open={isOpen} close={handleClose}>
        <div className="modal-content-top dark:bg-[#393939] dark:text-white">
          <p>{t("signUpCreate")}</p>
        </div>

        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <Spinner />
            </div>
          </div>
        ) : (
          <>
            <div className="modal-content-center dark:bg-[#252525]">
              <div className="authorization-full-name">
                <div className="authorization-first-name">
                  <div className="invalid">
                    <span>{errorMessage.first_name}</span>
                  </div>

                  <input
                    className={`authorization-input firstNameLastName dark:border-[#393939] dark:bg-[#393939] dark:text-white`}
                    type="text"
                    value={firstNameInput}
                    onChange={handleFirstNameInput}
                    placeholder={t("signUpFirstName")}
                  />
                </div>

                <div className="authorization-last-name">
                  <div className="invalid">
                    <span>{errorMessage.last_name}</span>
                  </div>

                  <input
                    className="authorization-input firstNameLastName dark:border-[#393939] dark:bg-[#393939] dark:text-white"
                    type="text"
                    value={lastNameInput}
                    onChange={handleLastNameInput}
                    placeholder={t("signUpLastName")}
                  />
                </div>
              </div>

              <div className="invalid">
                <span>{errorMessage.email}</span>
              </div>

              <input
                className="authorization-input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
                type="email"
                value={emailInput}
                onChange={handleEmailInput}
                placeholder={t("signUpEmail")}
              />

              <div className="invalid">
                <span>{errorMessage.password}</span>
              </div>

              <input
                className="authorization-input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
                type="password"
                value={passInput}
                onChange={handlePassInput}
                placeholder={t("signUpPassword")}
              />

              <input
                className="authorization-input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
                type="password"
                value={confirmPassInput}
                onChange={handleConfirmPassInput}
                placeholder={t("signUpRepeatPassword")}
              />
            </div>

            <div className="modal-content-bottom dark:bg-[#252525]">
              <ButtonStandard
                name="Зарегистрироваться"
                clickHandler={handleClick}
                className="signUpModal"
              />

              <span className="signin-signup dark:text-white">
                {t("signUpProfileExists")}{" "}
                <span className="signin-signup-style" onClick={onClickLogIn}>
                  {t("signUpSignIn")}
                </span>
              </span>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default SignUpModal;
