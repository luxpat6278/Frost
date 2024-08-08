import React from 'react';
import './Footer.css'; // Это можно оставить, если вы хотите явно импортировать CSS

import insta from './Fimg/Insta.svg';
import mail from './Fimg/Mail.svg';
import phone from './Fimg/Phone.svg';

const Footer: React.FC = () => {
  return (
<div className='footer'>
    <div className="footer-container">
      <div className="footer-wrap">
        <div className="footer-left">
          <img className="instagram" src={insta} alt="instagram" />
          <a href = "#" className='inst__link'>Instagram</a>
        </div>
        <div className="footer-middle">
          <img className="gmail" src={mail} alt="gmail" />
          <a href = "#" className='gmail__link'>company@gmail.com</a>
        </div>
        <div className="footer-right">
          <img className="phone-call" src={phone} alt="phone-call" />
          <div className="footer-right-left">
            <p>Astana:</p>
            <a href = "#" className='call__phone'>+7 775 000 77 49</a>
          </div>
          <img className="phone-call" src={phone} alt="phone-call" />
          <div className="footer-right-right">
            <p>Almaty:</p>
            <a href = "#"  className='call__phone'> +7 775 000 77 49</a>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Footer;