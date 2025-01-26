import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styled from "styled-components";
import ProductItem from "../components/ProductItem/ProductItem";
import PaymentOptions from "../components/PaymentOptions/PaymentOptions";

const Container = styled.div`
  padding: 20px;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const CheckoutSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Step = styled.div<{ active: boolean }>`
  padding: 10px;
  background-color: ${({ active }) => (active ? "#ddd" : "#f4f4f4")};
  border-radius: 5px;
  flex: 1;
  text-align: center;
`;

const TotalPrice = styled.div`
  font-size: 18px;
  margin-top: 20px;
`;

const CartPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    fetch("https://frost.runtime.kz/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    const newTotal = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    setTotal(newTotal);
  }, [products]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, quantity } : product
    ));
  };

  const handleRemove = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <>
      <Header />
      <Container>
        <Title>Оформление заказа</Title>
        <CheckoutSteps>
          <Step active>Корзина</Step>
          <Step>Контактные данные</Step>
          <Step>Доставка</Step>
          <Step>Завершение</Step>
        </CheckoutSteps>
        <Section>
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
            />
          ))}
        </Section>
        <PaymentOptions />
        <TotalPrice>Итоговая сумма: {total} руб.</TotalPrice>
      </Container>
      <Footer />
    </>
  );
};

export default CartPage;
