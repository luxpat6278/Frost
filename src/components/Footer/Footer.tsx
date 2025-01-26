import "./Footer.css";
import instagramLogo from "../../images/instagram.png";
import gmailLogo from "../../images/gmail.png";
import phoneCallLogo from "../../images/phone-call.png";
import { useTranslation } from "../../hooks/useTranslation";

const Footer: React.FC = () => {
  // Translation hook
  const { t } = useTranslation();

  return (
    <div className="footerWrapper dark:border-[#222222] dark:bg-[#222222]">
      <div className="footerContent">
        <div className="footerSocial dark:bg-[#222222]">
          <img className="socialLogo" src={instagramLogo} alt="Instagram" />
          <a
            href="http://instagram.com"
            className="socialLink dark:text-white max-lg:hidden"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="footerText">bakytdreamer</p>
          </a>
        </div>

        <div className="footerEmail dark:bg-[#222222]">
          <img className="emailLogo" src={gmailLogo} alt="Gmail" />
          <p className="footerText max-lg:hidden">ba.temirgali@gmail.com</p>
        </div>

        <div className="footerContact dark:bg-[#222222]">
          <img className="contactLogo" src={phoneCallLogo} alt="Phone Call" />
          <p className="footerText max-lg:hidden">{t("footerContacts")}</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;