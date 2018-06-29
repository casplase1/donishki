import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {Row, Col} from 'react-flexbox-grid';
import H2 from './../../generic/H2';
import Card from '../../Catalog/Card';
import GhostButton from '../../generic/GhostButton';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const CatalogContent = styled.div`
  margin: 0 auto;
  max-width: 967px;
`;

const RowWrapper = styled.div`
  margin: 15px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  padding: 10px;
`;

const Button = GhostButton.withComponent(Link);

export default ({setItems}) => (
  <Wrapper>
    <H2>Каталог</H2>
    <CatalogContent>
      <RowWrapper>
        <Row>
          {products && products.map(product =>
            (<Col xs={6} sm={6} md={4} lg={3}>
              <Card
                name={product.name}
                size={product.size}
                prices={product.prices}
                id={product.id}
                image={product.image}
                url={product.url}
                setItems={setItems}
              />
            </Col>))}
        </Row>
        <ButtonWrapper>
          <Button to="/catalog">Смотреть весь каталог</Button>
        </ButtonWrapper>
      </RowWrapper>
    </CatalogContent>
  </Wrapper>
);

const products = [{
  "id": "1",
  "name": "Круглое донышко",
  "image": "https://donishki.ru/gallery/1.jpg",
  "size": 20,
  "prices": {
    "mdf": 70,
    "plywood": 80,
    "plexiglas": 90,
  },
}, {
  "id": "2",
  "name": "Круглое донышко",
  "image": "https://donishki.ru/gallery/1.jpg",
  "size": 20,
  "prices": {
    "mdf": 70,
    "plywood": 80,
    "plexiglas": 90,
  },
},{
  "id": "3",
  "name": "Круглое донышко",
  "image": "https://donishki.ru/gallery/1.jpg",
  "size": 20,
  "prices": {
    "mdf": 70,
    "plywood": 80,
    "plexiglas": 90,
  },
},{
  "id": "4",
  "name": "Круглое донышко",
  "image": "https://donishki.ru/gallery/1.jpg",
  "size": 20,
  "prices": {
    "mdf": 70,
    "plywood": 80,
    "plexiglas": 90,
  }
}];

