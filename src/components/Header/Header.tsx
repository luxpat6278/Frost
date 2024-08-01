import React from 'react';
import './Header.css';
import logo from './himg/Frost logo.svg';
import search from './himg/Group 9.svg';
import basket from './himg/group-2.svg';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="container">
                <div className="head">
                    <img src={logo} alt="" className="header__logo" />
                    <div className="city">
                        <p className="astana">г. Астана </p>
                        <p className="almata">г. Алматы </p>
                    </div>
                    <div className="num">
                        <a href="#" className="number number1">+7 777 777 77 77</a>
                        <a href="#" className="number number2">+7 777 777 77 77</a>
                    </div>
                    <div className="inp">
                        <input type="text" placeholder="Поиск по каталогу..." />
                        <button type="submit">
                            <img src={search} alt="Поиск" className="body_img" />
                        </button>
                    </div>
                    <div className="sig__log">
                        <a href="#" className="log__in">Вход в личный кабинет</a>
                        <a href="#" className="sig__in">Зарегистрироваться</a>
                    </div>
                    <div className="basket">
                        <a href="#" className="basket_link">
                            <img className="basket.img" src={basket} alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
