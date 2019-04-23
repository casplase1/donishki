import React, { Component } from 'react';
import styled from 'styled-components';
import PriceList from './priceList';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  margin: 0 auto;
  max-width: 967px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: [],
    };
    this.dataSort = this.dataSort.bind(this);
  }

  async componentDidMount() {
    await this.load();
    this.dataSort();
  }

  load = async () => fetch('/api/products')
    .then(response => response.json())
    .then((products) => {
      this.setState({ products });
    });

  dataSort() {
    const { products } = this.state;

    const price = [];
    products.map((item) => {
      if (price.find(el => el.name === item.name) === undefined) {
        price.push({ name: item.name, size: [item.size], prices: [item.prices] });
      } else {
        const index = price.findIndex(x => x.name === item.name);
        price[index].size.push(item.size);
        price[index].prices.push(item.prices);
      }
      this.setState({ price });
    });
  }

  render() {
    return (
      <Wrapper>
        <PriceList data={this.state.price} />
      </Wrapper>
    );
  }
}
