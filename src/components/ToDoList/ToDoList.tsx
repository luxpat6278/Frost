import React, { useState, useEffect } from 'react';
import check from './TDLimg/Vector.svg'; // Подставьте свой реальный путь
import './ToDoList.css';
import styled from 'styled-components';

interface Category {
    id: number;
    name: string;
}

interface Brand {
    id: number;
    name: string;
}

interface Model {
    id: number;
    name: string;
}

interface Generation {
    id: number;
    name: string;
}

const StyledButton = styled.button<{ $isActive: boolean }>`
    background-color: ${({ $isActive }) => ($isActive ? 'blue' : 'gray')};
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    margin: 5px 0;

    &:hover {
        opacity: 0.8;
    }
`;

const Tdl: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState([false, false, false, false]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [generations, setGenerations] = useState<Generation[]>([]);

    // Состояния для выбранных элементов
    const [selectedCategory, setSelectedCategory] = useState<string>('Все категории');
    const [selectedBrand, setSelectedBrand] = useState<string>('Все марки');
    const [selectedModel, setSelectedModel] = useState<string>('Все модели');
    const [selectedGeneration, setSelectedGeneration] = useState<string>('Все поколения');

    useEffect(() => {
        // Получение категорий
        fetch('https://frost.runtime.kz/api/categories')
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => {
                console.error('Ошибка при получении категорий:', error);
            });

        // Получение марок
        fetch('https://frost.runtime.kz/api/brands')
            .then(response => response.json())
            .then(data => {
                setBrands(data);
            })
            .catch(error => {
                console.error('Ошибка при получении марок:', error);
            });

        // Получение моделей
        fetch('https://frost.runtime.kz/api/models')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setModels(data);
                } else {
                    console.error('Данные моделей не являются массивом:', data);
                }
            })
            .catch(error => {
                console.error('Ошибка при получении моделей:', error);
            });

        // Получение поколений
        fetch('https://frost.runtime.kz/api/generations')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setGenerations(data);
                } else {
                    console.error('Данные поколений не являются массивом:', data);
                }
            })
            .catch(error => {
                console.error('Ошибка при получении поколений:', error);
            });
    }, []);

    const toggleMenu = (index: number) => {
        setMenuVisible(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    // Обработчики выбора с отменой выбора
    const handleSelectCategory = (category: Category) => {
        setSelectedCategory(prev => (prev === category.name ? 'Все категории' : category.name));
        toggleMenu(0);
    };

    const handleSelectBrand = (brand: Brand) => {
        setSelectedBrand(prev => (prev === brand.name ? 'Все марки' : brand.name));
        toggleMenu(1);
    };

    const handleSelectModel = (model: Model) => {
        setSelectedModel(prev => (prev === model.name ? 'Все модели' : model.name));
        toggleMenu(2);
    };

    const handleSelectGeneration = (generation: Generation) => {
        setSelectedGeneration(prev => (prev === generation.name ? 'Все поколения' : generation.name));
        toggleMenu(3);
    };

    return (
        <div className="category">
            <div className="container">
                <div className="category__box">
                    <div className="c__items">
                        <div className="c">
                            <h2 className="category__title">Категория</h2>
                            <div className="dropdown">
                                <button onClick={() => toggleMenu(0)} className="nut_dropdown">
                                    {selectedCategory} <img src={check} alt="" className="down" />
                                </button>
                                {menuVisible[0] && (
                                    <div className="noidung_dropdown show">
                                        {categories.map(category => (
                                            <StyledButton key={category.id} $isActive={selectedCategory === category.name} onClick={() => handleSelectCategory(category)}>
                                                {category.name}
                                            </StyledButton>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mark">
                            <h3 className="mark__title">Марка</h3>
                            <div className="dropdown">
                                <button onClick={() => toggleMenu(1)} className="nut_dropdown">
                                    {selectedBrand} <img src={check} alt="" className="down" />
                                </button>
                                {menuVisible[1] && (
                                    <div className="noidung_dropdown show">
                                        {brands.map(brand => (
                                            <StyledButton key={brand.id} $isActive={selectedBrand === brand.name} onClick={() => handleSelectBrand(brand)}>
                                                {brand.name}
                                            </StyledButton>
                                        ))}
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
                                    {selectedModel} <img src={check} alt="" className="down" />
                                </button>
                                {menuVisible[2] && (
                                    <div className="noidung_dropdown show">
                                        {models.map(model => (
                                            <StyledButton key={model.id} $isActive={selectedModel === model.name} onClick={() => handleSelectModel(model)}>
                                                {model.name}
                                            </StyledButton>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="generation">
                            <h3 className="generation__title">Поколения</h3>
                            <div className="dropdown">
                                <button onClick={() => toggleMenu(3)} className="nut_dropdown">
                                    {selectedGeneration} <img src={check} alt="" className="down" />
                                </button>
                                {menuVisible[3] && (
                                    <div className="noidung_dropdown show">
                                        {generations.map(generation => (
                                            <StyledButton key={generation.id} $isActive={selectedGeneration === generation.name} onClick={() => handleSelectGeneration(generation)}>
                                                {generation.name}
                                            </StyledButton>
                                        ))}
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







