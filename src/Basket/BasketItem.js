import React from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-flexbox-grid';
import Quantity from '../generic/Quantity';
import closeIcon from './close-icon.svg';
import materials from '../constant/materials';

const ItemWrapper = styled.div`
  padding: 15px 0;
  text-align: left;
`;

const CloseIcon = styled.img`
  width: 12px;
  padding: 10px;
  cursor: pointer;
`;

const ItemImg = styled.img`
  width: 50px;
`;

const Description = styled.div`
  padding: 0 20px;
  font-family: 'Roboto-Light', sans-serif;
  font-size: 14px;
`;

const Name = styled.div`
  font-family: 'Roboto-Bold', sans-serif;
`;

const Properties = styled.span`
  color: #4a4a4a;;
`;

const Amount = styled.div`
  text-align: center;
  font-size: 12px;
  font-family: 'Roboto-Light', sans-serif;
  padding-top: 5px;
  
  @media (min-width: 768px) {
    padding-top: 0;
    font-size: 16px;
    text-align: auto;
  }
`;

export default ({
                  id,
                  image,
                  name,
                  material,
                  size,
                  price,
                  quantity,
                  handleRemoveItem,
                  handleAddQuantity,
                  handleDecreaseQuantity
                }) => (
  <ItemWrapper>
    <Row middle="xs">
      <Col xs={1} sm={1} md={1} lg={1}>
        <CloseIcon onClick={() => (handleRemoveItem(id, material))} src={closeIcon}/>
      </Col>

      <Col xs={2} sm={2} md={1} lg={1}>
        <ItemImg src={image}/>
      </Col>

      <Col xs={6} sm={6} md={4} lg={4}>
        <Description>
          <Name>{name}</Name>
          <div>
            <Properties>{materials[material]}, {size}см</Properties>
          </div>
          <div>
            <b>{price}</b> руб
          </div>
        </Description>
      </Col>

      <Col className="hidden-xs hidden-sm" start="xs" md={3} lg={3}>
        <Quantity
          handleAddQuantity={handleAddQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          id={id}
          material={material}
          quantity={quantity}
        />
      </Col>

      <Col className="hidden-xs hidden-sm" md={3} lg={3}>
        <Amount>
          {quantity * price} руб
        </Amount>
      </Col>

      <Col className="hidden-md hidden-lg hidden-xl" xs={3} sm={3}>
        <Quantity
          handleAddQuantity={handleAddQuantity}
          handleDecreaseQuantity={handleDecreaseQuantity}
          id={id}
          material={material}
          quantity={quantity}
        />
        <Amount>
          {quantity * price} руб
        </Amount>
      </Col>
    </Row>
  </ItemWrapper>
);