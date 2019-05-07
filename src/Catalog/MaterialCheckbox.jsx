import React from 'react';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import materials from '../constant/materials';
import Counter from '../generic/Counter';
import basketIcon from '../Header/basket-icon.svg';

const cookies = new Cookies();

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MaterialPriceInBasketCounterWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const InBasketIcon = styled.img`
  width: 10px;
`;

const InBasketCount = styled.span`
  font-family: 'Roboto-Bold', sans-serif;
  font-size: 12px;
`;

const InBasketCountWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MaterialLabel = styled.label`
  border-radius: 5px;
  background-color: ${({ selected }) => selected && '#eee'};
  padding: 5px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: space-between;

  @media (min-width: 768px) {
    padding: 5px 10px;
  }
`;

const MaterialName = styled.div`
  color: #000;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const MaterialPrice = styled.div`
  font-size: 12px;
  padding-right: 5px;
  font-family: 'Roboto-Bold', sans-serif;
`;

const getCount = (id, material) => {
  const cookieItems = cookies.get('items');
  const items = cookieItems || [];

  for (let i = 0; i < items.length; i += 1) {
    if (items[i].id === id && items[i].material === material) {
      return items[i].count;
    }
  }

  return '';
};

export default ({
  id,
  material,
  price,
  selectedMaterial,
  handleAddCount,
  handleDecreaseCount,
  count,
}) => (
  <MaterialLabel selected={selectedMaterial === material}>
    <div>
      <MaterialName>{materials[material]}</MaterialName>
      <MaterialPriceInBasketCounterWrapper>
        <MaterialPrice>
          {`${price} ₽`}
        </MaterialPrice>
        {getCount(id, material) && (
          <InBasketCountWrapper>
            <InBasketIcon src={basketIcon} />
            <InBasketCount>
              {`- ${getCount(id, material)} шт.`}
            </InBasketCount>
          </InBasketCountWrapper>
        )}
      </MaterialPriceInBasketCounterWrapper>
    </div>
    <CheckboxWrapper>
      <Counter
        handleAddCount={handleAddCount}
        handleDecreaseCount={handleDecreaseCount}
        id={id}
        material={material}
        hidden={false}
        count={count}
      />
      <span />
    </CheckboxWrapper>
  </MaterialLabel>
);
