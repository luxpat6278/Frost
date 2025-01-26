import React, { useState, useEffect, useCallback } from 'react';
import check from './TDLimg/Vector.svg';
import './ToDoList.css';
import styled from 'styled-components';
import ProductCards from '../Prod/Prod'; // Импортируйте компонент ProductCards

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

interface Product {
    id: number;
    name: string;
    img: string;
    price: number;
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
    const [menuVisible, setMenuVisible] = useState<boolean[]>([false, false, false, false]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<Brand[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [generations, setGenerations] = useState<Generation[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
    const [selectedModelId, setSelectedModelId] = useState<number | null>(null);
    const [selectedGenerationId, setSelectedGenerationId] = useState<number | null>(null);

    const [showAvailableOnly, setShowAvailableOnly] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(6);

    // Fetch categories and brands on component mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [categoryResponse, brandResponse] = await Promise.all([
                    fetch('https://frost.runtime.kz/api/categories'),
                    fetch('https://frost.runtime.kz/api/brands'),
                ]);

                const categoryData = await categoryResponse.json();
                const brandData = await brandResponse.json();

                setCategories(categoryData);
                setBrands(brandData);
            } catch (error) {
                setError('Ошибка при получении данных');
                console.error('Ошибка при получении данных:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Fetch products when any filter parameter changes
    useEffect(() => {
        const fetchFilteredData = async () => {
            setLoading(true);
            setError(null);
            try {
                const baseUrl = 'https://frost.runtime.kz/api/products';
                const filters = new URLSearchParams();

                if (selectedCategoryId !== null) {
                    filters.append('category', selectedCategoryId.toString());
                }
                if (selectedBrandId !== null) {
                    filters.append('brandId', selectedBrandId.toString());
                }
                if (selectedModelId !== null) {
                    filters.append('modelId', selectedModelId.toString());
                }
                if (selectedGenerationId !== null) {
                    filters.append('generationId', selectedGenerationId.toString());
                }
                if (showAvailableOnly) {
                    filters.append('available', '1');
                }

                filters.append('page', page.toString());
                filters.append('size', size.toString());

                const query = filters.toString();
                console.log('Query:', query);

                const response = await fetch(`${baseUrl}?${query}`);
                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }
                const data = await response.json();

                console.log('Filtered Products:', data);

                setProducts(data.items || []); 
            } catch (error) {
                setError('Ошибка при фильтрации товаров');
                console.error('Ошибка при фильтрации товаров:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilteredData();
    }, [selectedCategoryId, selectedBrandId, selectedModelId, selectedGenerationId, showAvailableOnly, page, size]);


    useEffect(() => {
        if (selectedBrandId !== null) {
            const fetchModels = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://frost.runtime.kz/api/models?brandId=${selectedBrandId}`);
                    const data = await response.json();
                    setModels(data);
                } catch (error) {
                    setError('Ошибка при получении моделей');
                    console.error('Ошибка при получении моделей:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchModels();
        } else {
            setModels([]);
        }
    }, [selectedBrandId]);

    useEffect(() => {
        if (selectedModelId !== null) {
            const fetchGenerations = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`https://frost.runtime.kz/api/generations?modelId=${selectedModelId}`);
                    const data = await response.json();
                    setGenerations(data);
                } catch (error) {
                    setError('Ошибка при получении поколений');
                    console.error('Ошибка при получении поколений:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchGenerations();
        } else {
            setGenerations([]);
        }
    }, [selectedModelId]);

    const toggleMenu = useCallback((index: number) => {
        setMenuVisible(prevState => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    }, []);

    const handleSelectCategory = useCallback((category: Category) => {
        setSelectedCategoryId(prev => (prev === category.id ? null : category.id));
        toggleMenu(0);
    }, [toggleMenu]);

    const handleSelectBrand = useCallback(async (brand: Brand) => {
        setSelectedBrandId(prev => (prev === brand.id ? null : brand.id));
        toggleMenu(1);

        try {
            const response = await fetch(`https://frost.runtime.kz/api/models?brandId=${brand.id}`);
            const data = await response.json();
            setModels(data);
        } catch (error) {
            setError('Ошибка при получении моделей');
            console.error('Ошибка при получении моделей:', error);
        }
    }, [toggleMenu]);

    const handleSelectModel = useCallback((model: Model) => {
        setSelectedModelId(prev => (prev === model.id ? null : model.id));
        toggleMenu(2);
    }, [toggleMenu]);

    const handleSelectGeneration = useCallback((generation: Generation) => {
        setSelectedGenerationId(prev => (prev === generation.id ? null : generation.id));
        toggleMenu(3);
    }, [toggleMenu]);

    const handleToggleAvailability = useCallback(() => {
        setShowAvailableOnly(prev => !prev);
    }, []);

    return (
        <div className="category">
            <div className="container">
                <div className="category__box">
                    <div className="c__items">
                        <div className="c">
                            <h2 className="category__title">Категория</h2>
                            <div className="dropdown">
                                <button onClick={() => toggleMenu(0)} className="nut_dropdown">
                                    {selectedCategoryId !== null ? categories.find(cat => cat.id === selectedCategoryId)?.name : 'Все категории'} <img src={check} alt="check icon" className="down" />
                                </button>
                                {menuVisible[0] && (
                                    <div className="noidung_dropdown show">
                                        {categories.map(category => (
                                            <StyledButton key={category.id} $isActive={selectedCategoryId === category.id} onClick={() => handleSelectCategory(category)}>
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
                                    {selectedBrandId !== null ? brands.find(brand => brand.id === selectedBrandId)?.name : 'Все марки'} <img src={check} alt="check icon" className="down" />
                                </button>
                                {menuVisible[1] && (
                                    <div className="noidung_dropdown show">
                                        {brands.map(brand => (
                                            <StyledButton key={brand.id} $isActive={selectedBrandId === brand.id} onClick={() => handleSelectBrand(brand)}>
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
                                    {selectedModelId !== null ? models.find(model => model.id === selectedModelId)?.name : 'Все модели'} <img src={check} alt="check icon" className="down" />
                                </button>
                                {menuVisible[2] && (
                                    <div className="noidung_dropdown show">
                                        {models.map(model => (
                                            <StyledButton key={model.id} $isActive={selectedModelId === model.id} onClick={() => handleSelectModel(model)}>
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
                                    {selectedGenerationId !== null ? generations.find(gen => gen.id === selectedGenerationId)?.name : 'Все поколения'} <img src={check} alt="check icon" className="down" />
                                </button>
                                {menuVisible[3] && (
                                    <div className="noidung_dropdown show">
                                        {generations.map(generation => (
                                            <StyledButton key={generation.id} $isActive={selectedGenerationId === generation.id} onClick={() => handleSelectGeneration(generation)}>
                                                {generation.name}
                                            </StyledButton>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ProductCards products={products} loading={loading} error={error} />
            </div>
        </div>
    );
};

export default Tdl;
