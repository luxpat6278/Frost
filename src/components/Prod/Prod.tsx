import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  img: string;
  name: string;
  price: number;
}

interface ProductCardsProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  justify-items: center;
  padding: 20px;
  max-width: 1480px;
  margin: 0 auto;
`;

const ProductItem = styled.div`
  width: 370px;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px 0;
  img {
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
  }
`;

const ProductName = styled.div`
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const ProductPriceContainer = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #FFFF; // Цвет изменен для лучшей видимости
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BuyButton = styled.button`
  width: 160px;
  height: 40px;
  background-color: #2156bd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const NoProductsMessage = styled.p`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const ProductCards: React.FC<ProductCardsProps> = ({ products, loading, error }) => {
  const navigate = useNavigate();

  const handleBuyClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (loading) {
    return <NoProductsMessage>Загрузка...</NoProductsMessage>;
  }

  if (error) {
    return <NoProductsMessage>{error}</NoProductsMessage>;
  }

  if (products.length === 0) {
    return <NoProductsMessage>Нет товаров для отображения.</NoProductsMessage>;
  }

  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductItem key={product.id}>
          <ProductImage>
            <img src={product.img} alt={product.name} />
          </ProductImage>
          <ProductName>{product.name}</ProductName>
          <ProductPriceContainer>
            <div>Цена: {product.price} тг</div>
            <BuyButton onClick={() => handleBuyClick(product.id)}>Купить</BuyButton>
          </ProductPriceContainer>
        </ProductItem>
      ))}
    </ProductGrid>
  );
};

export default ProductCards;









