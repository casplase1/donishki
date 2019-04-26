import React, { Component } from 'react';
import styled from 'styled-components';
import PriceList from './priceList';
import price from './data';
import SummaryTable from './summaryTable';

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
      datasummary: {},
      summary: 0,
    };
  }

  calcMaterialSummary = (material) => {
    let sum = 0;
    const { datasummary } = this.state;
    for (const id in datasummary[material]) {
      sum += datasummary[material][id];
    }
    return sum;
  };

  calcSummary = () => {
    const { datasummary } = this.state;
    const materials = Object.getOwnPropertyNames(datasummary);
    const sumArray = materials.map(material => this.calcMaterialSummary(material));
    if (sumArray.length > 0) {
      return sumArray.reduce((index, a) => index + a);
    }
    return 0;
  };

  setSummary = (material, id, sum) => {
    this.setState(prevState => ({
      datasummary: {
        ...prevState.datasummary,
        [material]: { ...prevState.datasummary[material], [id]: sum },
      },
    }));
  };

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
    const { data, datasummary } = this.state;
    return (
      <Wrapper>
        <PriceList
          data={data}
          handleChangeItemsCount={this.handleChangeItemsCount}
          setSummary={this.setSummary}
        />
        <SummaryTable
          calcMaterialSummary={this.calcMaterialSummary}
          datasummary={datasummary}
          calcSummary={this.calcSummary}
        />
      </Wrapper>
    );
  }
}
