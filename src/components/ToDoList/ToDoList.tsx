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

    const [selectedCategory, setSelectedCategory] = useState<string>('Все категории');
    const [selectedBrand, setSelectedBrand] = useState<string>('Все марки');
    const [selectedModel, setSelectedModel] = useState<string>('Все модели');
    const [selectedGeneration, setSelectedGeneration] = useState<string>('Все поколения');

    const [modelId, setModelId] = useState<number | null>(null);
    const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получение категорий
                const categoryResponse = await fetch('https://frost.runtime.kz/api/categories');
                const categoryData = await categoryResponse.json();
                setCategories(categoryData);

                // Получение марок
                const brandResponse = await fetch('https://frost.runtime.kz/api/brands');
                const brandData = await brandResponse.json();
                setBrands(brandData);

                // Получение моделей
                if (modelId !== null) {
                    const modelResponse = await fetch(`https://frost.runtime.kz/api/models?modelId=${modelId}`);
                    const modelData = await modelResponse.json();
                    if (Array.isArray(modelData)) {
                        setModels(modelData);
                    } else {
                        console.error('Данные моделей не являются массивом:', modelData);
                    }
                }

                // Получение поколений
                const generationResponse = await fetch('https://frost.runtime.kz/api/generations');
                const generationData = await generationResponse.json();
                if (Array.isArray(generationData)) {
                    setGenerations(generationData);
                } else {
                    console.error('Данные поколений не являются массивом:', generationData);
                }
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
    }, [modelId]);

    useEffect(() => {
        const fetchFilteredData = async () => {
            try {
                const baseUrl = 'https://frost.runtime.kz/api/products';
                const filters = new URLSearchParams();

                if (selectedCategory !== 'Все категории') {
                    filters.append('category', selectedCategory);
                }
                if (selectedBrand !== 'Все марки') {
                    filters.append('brand', selectedBrand);
                }
                if (selectedModel !== 'Все модели') {
                    filters.append('model', selectedModel);
                }
                if (selectedGeneration !== 'Все поколения') {
                    filters.append('generation', selectedGeneration);
                }
                if (showAvailableOnly) {
                    filters.append('available', '1');
                }

                const response = await fetch(`${baseUrl}?${filters.toString()}`);
                const data = await response.json();
                // Обработка данных
                // Например, обновление состояния товаров
            } catch (error) {
                console.error('Ошибка при фильтрации товаров:', error);
            }
        };

        fetchFilteredData();
    }, [selectedCategory, selectedBrand, selectedModel, selectedGeneration, showAvailableOnly]);

    const toggleMenu = (index: number) => {
        setMenuVisible(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

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
        setModelId(prev => (prev === model.id ? null : model.id));
        toggleMenu(2);
    };

    const handleSelectGeneration = (generation: Generation) => {
        setSelectedGeneration(prev => (prev === generation.name ? 'Все поколения' : generation.name));
        toggleMenu(3);
    };

    const handleToggleAvailability = () => {
        setShowAvailableOnly(prev => !prev);
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
                            <input
                                className="inpt"
                                type="checkbox"
                                id="scales"
                                name="scales"
                                checked={showAvailableOnly}
                                onChange={handleToggleAvailability}
                            />
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
