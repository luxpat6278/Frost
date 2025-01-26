import React from "react";
import styled from "styled-components";

const ProductContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const ProductPrice = styled.div`
  margin: 5px 0;
`;

const QuantitySelector = styled.input`
  width: 50px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

interface ProductItemProps {
  product: any;
  onQuantityChange: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onQuantityChange, onRemove }) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseInt(event.target.value, 10);
    onQuantityChange(product.id, quantity);
  };

  return (
    <ProductContainer>
      <ProductInfo>
        <ProductName>{product.name}</ProductName>
        <ProductPrice>{product.price} тг.</ProductPrice>
        <QuantitySelector
          type="number"
          value={product.quantity}
          min="1"
          onChange={handleQuantityChange}
        />
      </ProductInfo>
      <RemoveButton onClick={() => onRemove(product.id)}>Удалить</RemoveButton>
    </ProductContainer>
  );
};

export default ProductItem;
