import React, { useState } from 'react';
import check from './TDLimg/Vector.svg'; // Путь к изображению чекбокса (подставьте свой реальный путь)
import './ToDoList.css';

const Tdl: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState([false, false, false, false]);

    const toggleMenu = (index: number) => {
        setMenuVisible(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });     
    };

    fetch('https://frost.runtime.kz/api/categories')
  .then(response => response.json())
  .then(data => {
    console.log(data); // данные категорий получены от сервера
  })
  .catch(error => {
    console.error('Ошибка при получении данных:', error);
  });


    return (
        <div className="category">
            <div className="container">
                <div className="category__box">
                    <div className="c__items">
                        <div className="c">
                            <h2 className="category__title">Категория</h2>
                            <div className="dropdown">
                                <button onClick={() => toggleMenu(0)} className="nut_dropdown">
                                    все категории <img src={check} alt="" className="down" />
                                </button>
                                {menuVisible[0] && (
                                    <div className="noidung_dropdown show">
                                        <a href="#">все категории</a>
                                        <a href="#">все категории</a>
                                        <a href="#">все категории</a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mark">
                            <h3 className="mark__title">Марка</h3>
                            <div className="dropdown">
                                <button onClick={() => toggleMenu(1)} className="nut_dropdown">
                                    все марки <img src={check} alt="" className="down" />
                                </button>
                                {menuVisible[1] && (
                                    <div className="noidung_dropdown show">
                                        <a href="#">все марки</a>
                                        <a href="#">все марки</a>
                                        <a href="#">все марки</a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="inpu">
                            <input className="inpt" type="checkbox" id="scales" name="scales" defaultChecked />
                            <label className="input__txt" htmlFor="scales">
                                в наличии
                            </label>
                        </div>
                    </div>
                    <div className="b__items">
                        <div className="model">
                            <h2 className="model__title">Модель</h2>
                            <div className="dropdown">
                                <button onClick={() => toggleMenu(2)} className="nut_dropdown">
                                    все модели <img src={check} alt="" className="down" />
                                </button>
                                {menuVisible[2] && (
                                    <div className="noidung_dropdown show">
                                        <a href="#">все модели</a>
                                        <a href="#">все модели</a>
                                        <a href="#">все модели</a>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="generation">
                            <h3 className="generation__title">Поколения</h3>
                            <div className="dropdown">
                                <button onClick={() => toggleMenu(3)} className="nut_dropdown">
                                    все поколения <img src={check} alt="" className="down" />
                                </button>
                                {menuVisible[3] && (
                                    <div className="noidung_dropdown show">
                                        <a href="#">все поколения</a>
                                        <a href="#">все поколения</a>
                                        <a href="#">все поколения</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tdl;



