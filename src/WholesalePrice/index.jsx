import React, { Component } from 'react';
import styled from 'styled-components';
import PriceList from './priceList';
import price from './data';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  margin: 0 auto;
  max-width: 967px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: price,
    };
  }

  componentDidMount() {
    this.load();
  }

  load = async () => {
    await fetch('/api/products')
      .then(response => response.json())
      .then((products) => {
        console.log(products);
        // this.setState({ products });
      });
    // this.sortPrice();
  };

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

  handleChangeItemsCount = (groupName, typeCode, id, value) => {
    const { data } = this.state;
    const groupIndex = data.findIndex(obj => obj.groupName === groupName);
    const typeIndex = data[groupIndex].types.findIndex(obj => obj.typeCode === typeCode);
    const itemIndex = data[groupIndex].types[typeIndex].items.findIndex(obj => obj.id === id);
    data[groupIndex].types[typeIndex].items[itemIndex].count = value;

    this.setState({
      data,
    });
  };

  render() {
    const { data } = this.state;
    return (
      <Wrapper>
        <PriceList data={data} handleChangeItemsCount={this.handleChangeItemsCount} />
      </Wrapper>
    );
  }
}
