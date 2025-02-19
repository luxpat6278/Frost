import "./Footer.css";
import instagramLogo from "../../images/instagram";
import gmailLogo from "../../images/gmail";
import phoneCallLogo from "../../images/phone-call";
import { useTranslation } from "../../hooks/useTranslation";

// Типы для использования в компоненте
interface FooterProps {}

function Footer({}: FooterProps) {
  // useTranslation.jsx
  const { t } = useTranslation();

  return (
    <div className="footer-container dark:border-[#222222] dark:bg-[#222222]">
      <div className="footer-wrap">
        <div className="footer-instagram dark:bg-[#222222]">
          <img className="instagram" src={instagramLogo} alt="instagram" />
          <a href="http://instagram.com" className="instagram-text dark:text-white max-lg:hidden" target="_blank" rel="noopener noreferrer">
            <p className="footer-text">bakytdreamer</p>
          </a>
        </div>

        <div className="footer-gmail dark:bg-[#222222]">
          <img className="gmail" src={gmailLogo} alt="gmail" />
          <p className="footer-text max-lg:hidden">ba.temirgali@gmail.com</p>
        </div>

        <div className="footer-whatsapp dark:bg-[#222222]">
          <img className="phone-call" src={phoneCallLogo} alt="phone-call" />
          <p className="footer-text max-lg:hidden">{t("footerContacts")}</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
