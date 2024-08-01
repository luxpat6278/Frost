
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 300px;
`;

const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 10px;
`;

const Title = styled.h1`
    font-size: 1.5em;
    margin: 0.5em 0;
`;

const Price = styled.p`
    font-size: 1.2em;
    color: green;
`;

const Button = styled.button`
    background-color: blue;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

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