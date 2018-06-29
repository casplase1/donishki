import React from 'react';
import styled from 'styled-components';

const Quantity = styled.div`
  border-radius: 15px;
  border: 1px solid #4a4a4a;
  margin: 0 auto;
  padding: 5px 3px;
  width: 50px;
  
  display: ${({hidden}) => (hidden ? 'none' : 'flex')};
  justify-content: space-around;
  align-items: center;
  
  @media (min-width: 768px) {
    // margin: 0 20px;
  }
`;

const Plus = styled.div`
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  padding: 0 5px;
`;

const Minus = styled.div`
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  padding: 0 5px;
`;

const Value = styled.span`
  font-size: 12px;
  font-family: 'Roboto', sans-serif;
`;

export default ({handleAddQuantity, handleDecreaseQuantity, id, material, quantity, hidden}) => (
  <Quantity hidden={hidden}>
    <Minus onClick={()=>{handleDecreaseQuantity(id, material)}}>-</Minus>
    <Value>{ quantity }</Value>
    <Plus onClick={() => {handleAddQuantity(id, material)}}>+</Plus>
  </Quantity>
);