import Modal from "../../../ui/modal/Modal";
import "./LogInModal.css";
import React, { useState } from "react";
import ButtonStandard from "../../../ui/buttonStandard/ButtonStandard";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../../slices/authSlice";
import Spinner from "../../../ui/spinner/Spinner";
import { setLoading } from "../../../slices/loadingSlice";
import { useTranslation } from "../../../hooks/useTranslation";

// Типы пропсов
interface LogInModalProps {
  isOpen: boolean;
  close: () => void;
  onClick: () => void;
  title: string;
  goToSignUpFromLogIn: () => void;
}

function LogInModal({
  isOpen,
  close,
  onClick,
  title,
  goToSignUpFromLogIn,
}: LogInModalProps) {
  // useTranslation
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.loading.isLoading); // Можно улучшить типизацию для состояния loading

  // States for login and password
  const [emailInput, setEmailInput] = useState<string>("");
  const [passInput, setPassInput] = useState<string>("");

  // Errors for wrong login and password
  const [errorLogin, setErrorLogin] = useState<string>("");
  const [errorPassword, setErrorPassword] = useState<string>("");

  // Email (login)
  const handleEmailInput = (content: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(content.target.value);
  };

  // Password
  const handlePassInput = (content: React.ChangeEvent<HTMLInputElement>) => {
    setPassInput(content.target.value);
  };

  const handleClick = () => {
    dispatch(setLoading(true));
    dispatch(signIn(emailInput, passInput))
      .then(() => {
        dispatch(setLoading(false));
      })
      .catch(() => {
        dispatch(setLoading(false));
        setErrorLogin(t("loginInvalidEmail"));
        setErrorPassword(t("loginInvalidPassword"));
      });
  };

  // Reseting inputs when closed
  const resetForm = () => {
    setEmailInput("");
    setPassInput("");
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
        <div className="modal-content-top dark:bg-[#393939]">
          <p className="dark:text-white">{t("loginSignIn")}</p>
        </div>

        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <Spinner />
            </div>
          </div>
        ) : (
          <div className="modal-content-center dark:bg-[#252525]">
            {errorLogin && <div className="error-container">{errorLogin}</div>}

            <input
              className="authorization-input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
              type="text"
              value={emailInput}
              onChange={handleEmailInput}
              placeholder={t("loginEmail")}
            />

            {errorPassword && <div className="error-container">{errorPassword}</div>}

            <input
              className="authorization-input dark:border-[#393939] dark:bg-[#393939] dark:text-white"
              type="password"
              value={passInput}
              onChange={handlePassInput}
              placeholder={t("loginPassword")}
            />
          </div>
        )}

        <div className="modal-content-bottom dark:bg-[#252525]">
          <ButtonStandard
            name={t("loginSignInButton")}
            className="logInModal"
            clickHandler={handleClick}
          />

          <span className="signin-signup dark:text-white">
            {t("loginNoProfile")}{" "}
            <span className="signin-signup-style" onClick={goToSignUpFromLogIn}>
              {t("loginSignUp")}
            </span>
          </span>
        </div>
      </Modal>
    </div>
  );
}

export default LogInModal;
