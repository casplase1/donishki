import React, { Component } from 'react';
import styled from 'styled-components';
import materials from '../constant/materials';
import Quantity from '../generic/Quantity';
import basketIcon from '../Header/basket-icon.svg';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RadioCheckbox = styled.input`
  display: none;
  
  + span {
    margin-left: 6px;
	  vertical-align: middle;
    width: 15px;
    height: 15px;
    border: 1px solid #b0b0b0;
    position: relative;
    border-radius: 50%;
    font-size: 16px;
    display: none;
    
    @media (min-width: 320px) {
      display: none;
    }
  }
  
  &:checked + span:before {
    content: "";
    display: block;
    position: absolute;
    top: 1px;
    right: 1px;
    bottom: 1px;
    left: 1px;
    background: #413548;
    border-radius: 50%;
    cursor: pointer;
  }
`;

const MaterialPriceInBasketQuantityWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const InBasketIcon = styled.img`
  width: 10px;
`;

const InBasketQuantity = styled.span`
  font-family: 'Roboto-Bold', sans-serif;
  font-size: 12px;
`;

const InBasketQuantityWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MaterialLabel = styled.label`
  border-radius: 5px;
  background-color: ${({selected}) => (selected && '#eee')};
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

const getQuantity = (id, material) => {
  const cookieItems = cookies.get('items');
  let items = cookieItems || [];

  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id && items[i].material === material) {
      return items[i].quantity;
    }
  }

  return '';
};

export default (props) => (
  <MaterialLabel selected={props.selectedMaterial === props.material}>
    <div>
      <MaterialName>
        {materials[props.material]}
      </MaterialName>
      <MaterialPriceInBasketQuantityWrapper>
        <MaterialPrice>
          {props.prices && props.prices[props.material]} руб
        </MaterialPrice>
        {getQuantity(props.id, props.material) &&
        <InBasketQuantityWrapper>
          <InBasketIcon src={basketIcon} />
          <InBasketQuantity>&nbsp;- {getQuantity(props.id, props.material)} шт.</InBasketQuantity>
        </InBasketQuantityWrapper>
        }
      </MaterialPriceInBasketQuantityWrapper>
    </div>
    <CheckboxWrapper>
      <Quantity
        handleAddQuantity={props.handleAddQuantity}
        handleDecreaseQuantity={props.handleDecreaseQuantity}
        id={props.id}
        material={props.material}
        hidden={props.selectedMaterial !== props.material}
        quantity={props.quantity}
      />
      <RadioCheckbox
        onChange={props.onChange}
        type="radio"
        name={props.id}
        value={props.material}
        checked={props.selectedMaterial === props.material}
      />
      <span></span>
    </CheckboxWrapper>
  </MaterialLabel>
)