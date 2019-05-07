import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border-radius: 15px;
  border: 1px solid #4a4a4a;
  margin: 0 auto;
  padding: 5px 3px;
  width: 50px;
  
  display: ${({ isHidden }) => (isHidden ? 'none' : 'flex')};
  justify-content: space-around;
  align-items: center;
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

export default ({
  handleAddCount,
  handleDecreaseCount,
  id,
  material,
  count,
  hidden,
}) => (
  <Wrapper isHidden={hidden}>
    <Minus onClick={() => { handleDecreaseCount(id, material); }}>-</Minus>
    <Value>{ count }</Value>
    <Plus onClick={() => { handleAddCount(id, material); }}>+</Plus>
  </Wrapper>
);
