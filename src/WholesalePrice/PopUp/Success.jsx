import React from 'react';
import styled from 'styled-components';

const Message = styled.h3`
  color: #59cb78;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: normal;
  margin: 0 auto;
  width: 233px;
  height: 250px;
  text-align: center;
`;

export default () => (
  <div>
    <Message>
      Спасибо! Мы свяжемся
      <br />
      с вами как можно скорее.
    </Message>
  </div>
);
