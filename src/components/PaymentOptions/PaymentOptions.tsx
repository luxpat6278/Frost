import React from "react";
import styled from "styled-components";

const PaymentContainer = styled.div`
  margin-top: 20px;
`;

const PaymentTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

const PaymentOption = styled.div`
  margin-bottom: 10px;
`;

const PaymentOptions: React.FC = () => {
  return (
    <PaymentContainer>
      <PaymentTitle>Выберите способ оплаты</PaymentTitle>
      <PaymentOption>
        <input type="radio" id="creditCard" name="payment" value="creditCard" />
        <label htmlFor="creditCard">Кредитная карта</label>
      </PaymentOption>
      <PaymentOption>
        <input type="radio" id="paypal" name="payment" value="paypal" />
        <label htmlFor="paypal">PayPal</label>
      </PaymentOption>
      <PaymentOption>
        <input type="radio" id="bankTransfer" name="payment" value="bankTransfer" />
        <label htmlFor="bankTransfer">Банковский перевод</label>
      </PaymentOption>
    </PaymentContainer>
  );
};

export default PaymentOptions;
