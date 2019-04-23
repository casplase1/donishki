import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import H2 from '../../generic/H2';
import Card from '../../Catalog/Card';
import GhostButton from '../../generic/GhostButton';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const CatalogContent = styled.div`
  margin: 0 auto;
  max-width: 967px;
`;

const RowWrapper = styled.div`
  margin: 15px;
  padding-top: 20px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  padding-top: 30px;
`;

const Button = GhostButton.withComponent(Link);

const StyledButton = styled(Button)`
  background-color: #eb7e87;
  border-radius: 50pt;
  padding: 15px 25px;
`;

const BlockHeader = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 967px;
`;

const SearchForm = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  max-width: 967px;
`;

const Input = styled.input`
  height: 5%;
  margin: 0 5px 0 5px;
  border: none;
`;

export default ({ setItems }) => (
  <Wrapper>
    <BlockHeader>
      <H2>Каталог</H2>
      <SearchForm>
        <Input placeholder="Фигура" />
        <Input placeholder="Размер" />
        <Input placeholder="С узором (или без)" />
        <button>найти</button>
      </SearchForm>
    </BlockHeader>

    <CatalogContent>
      <RowWrapper>
        <Row>
          {products
            && products.map(product => (
              <Col xs={6} sm={6} md={4} lg={3}>
                <Card
                  name={product.name}
                  size={product.size}
                  prices={product.prices}
                  id={product.id}
                  image={product.image}
                  url={product.url}
                  setItems={setItems}
                />
              </Col>
            ))}
        </Row>
        <ButtonWrapper>
          <StyledButton to="/catalog">Смотреть весь каталог</StyledButton>
        </ButtonWrapper>
      </RowWrapper>
    </CatalogContent>
  </Wrapper>
);

const products = [
  {
    id: '1',
    name: 'Круг',
    image: '/product/krug9.jpg',
    size: 9,
    prices: {
      mdf: 49,
      plywood: 46,
      plexiglas: 151,
    },
  },
  {
    id: '2',
    name: 'Квадрат',
    image: '/product/kvadrat9.jpg',
    size: 9,
    prices: {
      mdf: 53,
      plywood: 50,
      plexiglas: 165,
    },
  },
  {
    id: '3',
    name: 'Сердце',
    image: '/product/serdechko27x29.jpg',
    size: '29x27',
    prices: {
      mdf: 175,
      plywood: 170,
      plexiglas: 1042,
    },
  },
  {
    id: '4',
    name: 'Звезда',
    image: '/product/zvezda18.jpg',
    size: 18,
    prices: {
      mdf: 194,
      plywood: 185,
      plexiglas: 461,
    },
  },
];
