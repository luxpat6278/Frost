import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import useModal from "../../hooks/useModal";
import LogInModal from "../modals/logInModal/LogInModal";
import SignUpModal from "../modals/signUpModal/SignUpModal";
import cartImage from "../../images/cart.png";
import logoutImage from "../../images/logout.png";
import { checkTokenAndGetUser, signOut } from "../../slices/authSlice";
import "./Header.css";
import { toggleTheme } from "../../slices/themeSlice";
import LocaleDropdown from "../../ui/dropDown/LocaleDropdown";
import sunIcon from "../../images/theme_sun.png";
import moonIcon from "../../images/theme_moon.png";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.user);
  const tokenDetails = useSelector((state: any) => state.auth.tokenInfo);
  const cartItemCount = useSelector((state: any) => state.counter.counter);
  const userName = currentUser ? ${currentUser.firstName.charAt(0).toUpperCase()}${currentUser.firstName.slice(1)} : "";
  const navigate = useNavigate();

  // Modal state hooks
  const [isLogInOpen, openLogInModal, closeLogInModal] = useModal();
  const [isSignUpOpen, openSignUpModal, closeSignUpModal] = useModal();
  const [isEndRegistrationOpen, openEndRegistrationModal, closeEndRegistrationModal] = useModal();

  // Transition between modals
  const switchToSignUp = () => {
    openSignUpModal();
    closeLogInModal();
  };

  const switchToLogIn = () => {
    openLogInModal();
    closeSignUpModal();
  };

  // Updating Redux state if "tokenDetails" is in local storage, but "currentUser" is not set
  useEffect(() => {
    if (!currentUser && tokenDetails) {
      dispatch(checkTokenAndGetUser());
      closeLogInModal();
    }
  }, [dispatch, tokenDetails, currentUser, closeLogInModal]);

  // Redirecting a user to main page after log out
  const handleLogOut = () => {
    navigate("/");
    dispatch(signOut());
  };

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  // Dark/light theme
  const currentTheme = useSelector((state: any) => state.theme.theme);

  // Transition to cart
  const redirectToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="header-container dark:border-b-[#222222] dark:bg-[#222222] dark:text-white">
      <div className="header-wrap">
        <div className="header-left">
          <a href={/}>
            {currentTheme === "dark" ? (
              <img className="header-left-logo" src="/src/images/logo2.png" alt="Logo" />
            ) : (
              <img className="header-left-logo" src="/src/images/logo.png" alt="Logo" />
            )}
          </a>
        </div>

        {currentUser !== null && tokenDetails ? (
          <div className="header-right-profile">
            <div className="header-right-username" onClick={() => navigate("/account")}>
              {userName}
            </div>

            <LocaleDropdown />

            <div className="mx-[5px] h-[40px] w-[40px] cursor-pointer p-[10px]">
              <button onClick={toggleThemeHandler}>
                {currentTheme === "dark" ? (
                  <img
                    className="h-[20px] w-[20px] rotate-0 transform invert transition-transform duration-300 ease-in-out"
                    src={sunIcon}
                    alt="sun icon"
                  />
                ) : (
                  <img
                    className="h-[20px] w-[20px] rotate-180 transform transition-transform duration-300 ease-in-out"
                    src={moonIcon}
                    alt="moon icon"
                  />
                )}
              </button>
            </div>

            <div
              className={cartItemCount > 0 ? "cart-page-active" : "cart-page"}
              data-count={cartItemCount > 0 ? cartItemCount : null}
              onClick={redirectToCart}
            >
              <img className="cart-logo dark:invert" src={cartImage} alt="cart-logo" />
            </div>

            <div className="logout dark:invert">
              <img className="logout-logo" src={logoutImage} alt="logout-logo" onClick={handleLogOut} />
            </div>
          </div>
        ) : (
          <div className="header-right">
            {!tokenDetails ? (
              <>
                <div className="mx-[5px] h-[40px] w-[40px] cursor-pointer p-[10px]">
                  <button onClick={toggleThemeHandler}>
                    {currentTheme === "dark" ? (
                      <img
                        className="h-[20px] w-[20px] rotate-0 transform invert transition-transform duration-300 ease-in-out"
                        src="src/images/theme_sun.png"
                        alt="sun icon"
                      />
                    ) : (
                      <img
                        className="h-[20px] w-[20px] rotate-180 transform transition-transform duration-300 ease-in-out"
                        src="src/images/theme_moon.png"
                        alt="moon icon"
                      />
                    )}
                  </button>
                </div>

                <div className="log-in-section">
                  <LogInModal
                    title="Войти"
                    onClick={openLogInModal}
                    isOpen={isLogInOpen}
                    close={closeLogInModal}
                    goToSignUpFromLogIn={switchToSignUp}
                  />
                </div>

                <div className="sign-up-section">
                  <SignUpModal
                    title="Регистрация"
                    onClick={openSignUpModal}
                    isOpen={isSignUpOpen}
                    close={closeSignUpModal}
                    onClickLogIn={switchToLogIn}
                    openEndRegistration={() => {
                      openEndRegistrationModal();
                      setTimeout(() => {
                        closeEndRegistrationModal();
                      }, 3000);
                    }}
                  />
                </div>
              </>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;