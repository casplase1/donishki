import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import H2 from '../../generic/H2';
import Card from '../../Catalog/Card';
import GhostButton from '../../generic/GhostButton';
import products from './productsList';

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

export default ({ setItems }) => (
  <Wrapper>
    <H2>Каталог донышек (розница)</H2>
    <CatalogContent>
      <RowWrapper>
        <Row>
          {products
          && products.map(product => (
            <Col xs={6} sm={6} md={4} lg={3}>
              <Card
                name={product.name}
                size={product.size}
                price={product.price}
                material={product.material}
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
