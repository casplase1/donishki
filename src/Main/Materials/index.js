import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import OfferCard from './MaterialCard';
import mdf from './mdf.jpg';
import plywood from './plywood.jpg';
import plexiglass from './plexiglass.jpg';
import H2 from '../../generic/H2';

const Wrapper = styled.div`
  padding-bottom: 60px;
  background-color: #fff;
`;

const handleClick = () => {
  scroller.scrollTo('FileFormAnchor', {
    duration: 800,
    delay: 100,
    smooth: true,
  });
};

const RowWrapper = styled.div`
  max-width: 967px;
  margin: 0 15px;
  
  @media (min-width: 768px) {
    margin: 0 auto;
  }
`;

export default () => (
  <Wrapper>
    <H2>Материалы</H2>
    <RowWrapper>
      <Row>
        <Col xs={12} sm={4} md={4} lg={4}>
          <OfferCard
            name={<span>МДФ</span>}
            description="Гладкие края, приятен на ощупь, доступная цена"
            image={mdf}
            onClick={handleClick}
          />
        </Col>
        <Col xs={12} sm={4} md={4} lg={4}>
          <OfferCard
            name={<span>Фанера</span>}
            description="Природный материал, натуральная фактура дерева"
            image={plywood}
            onClick={handleClick}
          />
        </Col>
        <Col xs={12} sm={4} md={4} lg={4}>
          <OfferCard
            name={<span>Оргстекло</span>}
            description="Высокая прочность, водостойкость"
            image={plexiglass}
            onClick={handleClick}
          />
        </Col>
      </Row>
    </RowWrapper>
  </Wrapper>
);
