// src/components/Prod/Prod.tsx
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
  padding: 40px 20px 0;
  font-size: 18px;
  font-weight: bold;
`;

const ProductPrice = styled.div`
  padding: 20px;
  font-size: 16px;
  color: #FFFFFF;
  margin-top: auto;
`;

const BuyButton = styled.button`
  width: 160px;
  height: 40px;
  background-color: #2156BD;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`;

const ProductPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductCards: React.FC<ProductCardsProps> = ({ products }) => {
  const navigate = useNavigate();

  const handleBuyClick = (productId: number) => {
    navigate(`/product/${productId}`);
};

  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductItem key={product.id}>
          <ProductImage>
            <img src={product.img} alt={product.name} />
          </ProductImage>
          <ProductInfo>
            <ProductName>{product.name}</ProductName>
            <ProductPriceContainer>
              <ProductPrice>Цена: {product.price} тг</ProductPrice>
              <BuyButton onClick={() => handleBuyClick(product.id)}>Купить</BuyButton>
            </ProductPriceContainer>
          </ProductInfo>
        </ProductItem>
      ))}
    </ProductGrid>
  );
};

export default ProductCards;









