import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import Counter from '../generic/Counter';
import closeIcon from './close-icon.svg';
import noPhotoIcon from '../icons/no-photo.svg';
import materials from '../constant/materials';

const Wrapper = styled.div`
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
  box-shadow: 0 2px 8px 0 rgba(1,1,1,0.1);
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
  count,
  handleRemoveItem,
  handleAddCount,
  handleDecreaseCount,
}) => (
  <Wrapper>
    <Row middle="xs">
      <Col xs={1} sm={1} md={1} lg={1}>
        <CloseIcon onClick={() => (handleRemoveItem(id, material))} src={closeIcon} />
      </Col>

      <Col xs={2} sm={2} md={1} lg={1}>
        <ItemImg src={image || noPhotoIcon} />
      </Col>

      <Col xs={6} sm={6} md={4} lg={4}>
        <Description>
          <Name>{name}</Name>
          <div>
            <Properties>
              {`${materials[material]}, ${size}мм`}
            </Properties>
          </div>
          <div>
            <b>{price}</b>
            {' ₽'}
          </div>
        </Description>
      </Col>

      <Col className="hidden-xs hidden-sm" start="xs" md={3} lg={3}>
        <Counter
          handleAddCount={handleAddCount}
          handleDecreaseCount={handleDecreaseCount}
          id={id}
          material={material}
          count={count}
        />
      </Col>

      <Col className="hidden-xs hidden-sm" md={3} lg={3}>
        <Amount>
          {`${count * price} ₽`}
        </Amount>
      </Col>

      <Col className="hidden-md hidden-lg hidden-xl" xs={3} sm={3}>
        <Counter
          handleAddCount={handleAddCount}
          handleDecreaseCount={handleDecreaseCount}
          id={id}
          material={material}
          count={count}
        />
        <Amount>
          {`${count * price} ₽`}
        </Amount>
      </Col>
    </Row>
  </Wrapper>
);
