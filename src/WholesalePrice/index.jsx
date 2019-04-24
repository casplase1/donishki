import React, { Component } from 'react';
import styled from 'styled-components';
import PriceList from './priceList';
import data from './price';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  margin: 0 auto;
  max-width: 967px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /* sortGroups = () => products.reduce((accumulator, product) => {
    const groupIndex = accumulator.findIndex(el => el.group === product.group);
    if (groupIndex < 0) {
      accumulator.push({
        group: product.group,
        sizes: [product.size],
        types: [product],
      });
    } else {
      const group = accumulator[groupIndex];
      group.types.push(product);
      if (group.sizes.indexOf(product.size) === -1) group.sizes.push(product.size);
    }
    return accumulator;
  }, []); */

  render() {
    return (
      <Wrapper>
        <PriceList data={data} />
      </Wrapper>
    );
  }
}
