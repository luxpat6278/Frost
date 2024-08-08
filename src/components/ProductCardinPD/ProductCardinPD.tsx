import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 300px;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Thumbnail = styled.img<{ $isSelected: boolean }>`
  width: 65px;
  height: 65px;
  cursor: pointer;
  opacity: ${props => (props.$isSelected ? 1 : 0.6)};
  border: ${props => (props.$isSelected ? '2px solid #000' : 'none')};
`;

const Title = styled.h1`
    font-size: 1.5em;
    margin: 0.5em 0;
`;

const Price = styled.p`
  font-size: 30px; 
  padding-top: 30px;
  margin: 0;
`;

const Availability = styled.div<{ available: boolean }>`
  color: ${props => (props.available ? 'green' : 'red')};
  margin-top: 10px;
`;

const Cities = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  color: #7A7A7A;
`;

const BuyButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #2156bd;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 235px; 

    &:hover {
        background-color: darkblue;
    }
`;

const ProductCardinPD = ({ product }: { product: any }) => {
    return (
        <Card>
            <Image src={product.image} alt={product.title} />
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <Price>{product.price} ₸</Price>
            <Button>Купить</Button>
        </Card>
    );
};

export default ProductCardinPD;