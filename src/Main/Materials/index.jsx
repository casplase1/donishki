import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components';
import OfferCard from './MaterialCard';
import mdf from './mdf.jpg';
import plywood from './plywood.jpg';
import plexiglas from './plexiglas.jpg';
import acrylic from './acrylic.jpg';
import H2 from '../../generic/H2';

const Wrapper = styled.div`
  padding-bottom: 60px;
  background-color: #fff;
`;

const RowWrapper = styled.div`
  max-width: 967px;
  margin: 0 15px;

  @media (min-width: 768px) {
    margin: 0 auto;
  }
`;

export default class extends Component {
  handleClick = material => () => {
    const { history } = this.props;
    history.push({
      pathname: '/catalog',
      state: { filters: { material } },
    });
  };

  render() {
    return (
      <Wrapper>
        <H2>Материалы</H2>
        <RowWrapper>
          <Row>
            <Col xs={12} sm={3} md={3} lg={3}>
              <OfferCard
                name={<span>МДФ</span>}
                description="Гладкие края, приятен на ощупь"
                image={mdf}
                onClick={this.handleClick('mdf')}
              />
            </Col>
            <Col xs={12} sm={3} md={3} lg={3}>
              <OfferCard
                name={<span>Фанера</span>}
                description="Природный материал, натуральная фактура дерева"
                image={plywood}
                onClick={this.handleClick('plywood')}
              />
            </Col>
            <Col xs={12} sm={3} md={3} lg={3}>
              <OfferCard
                name={<span>Оргстекло</span>}
                description="Высокая прочность, водостойкость"
                image={plexiglas}
                onClick={this.handleClick('plexiglas')}
              />
            </Col>
            <Col xs={12} sm={3} md={3} lg={3}>
              <OfferCard
                name={<span>Акрил</span>}
                description="Высокая прочность, водостойкость, разнобразие цветов"
                image={acrylic}
                onClick={this.handleClick('colored')}
              />
            </Col>
          </Row>
        </RowWrapper>
      </Wrapper>
    );
  }
}
