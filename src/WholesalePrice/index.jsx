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
      products: [],
      price: [],
    };
  }

  componentDidMount() {
    this.load();
  }

  load = async () => {
    await fetch('/api/products')
      .then(response => response.json())
      .then((products) => {
        this.setState({ products });
      });
    this.sortPrice();
  };

  sortPrice = () => {
    const { products } = this.state;
    const price = [];
    products.map((item) => {
      if (price.find(el => el.group === item.group) === undefined) {
        price.push({ group: item.group, size: [item.size], price: [item.price] });
      } else {
        const index = price.findIndex(x => x.group === item.group);
        price[index].size.push(item.size);
        price[index].price.push(item.price);
      }
      this.setState({ price });
    });
  };

  render() {
    const { price } = this.state;
    return (
      <Wrapper>
        <PriceList price={price} />
      </Wrapper>
    );
  }
}
