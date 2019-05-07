import React, { Component } from 'react';
import styled from 'styled-components';
import materialRus from '../../src/constant/materials';
import logo from './logoBase64';

const Wrapper = styled.div`
  @media (min-width: 768px) {
    margin: 0 auto;
    max-width: 967px;
  }
`;

const Image = styled.img`
  width: 40px;
  margin: 5px;
`;

const Header = styled.h2`
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

const Table = styled.table`
  margin-top: 30px;
  width: 100%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  & th,
  td {
    border: 1px solid black;
  }
`;

const SummaryTable = styled(Table)`
  width: 50%;
`;

const HiddenImg = styled.img`
  display: none;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {},
    };
  }

  setSummary = (products, isWholesale) => {
    const summary = {};
    products.map(product => (summary[product.material] !== undefined
      ? (summary[product.material] += product.count * (isWholesale ? product.wholesalePrice : product.price))
      : (summary[product.material] = product.count * (isWholesale ? product.wholesalePrice : product.price))));
    return summary;
  };

  sumValues = obj => Object.values(obj).reduce(
    (prevMaterialSum, nextMaterialSum) => prevMaterialSum + nextMaterialSum,
  );

  render() {
    const { items, isWholesale, host } = this.props;
    const summary = this.setSummary(items, isWholesale);
    const materials = Object.getOwnPropertyNames(summary);
    const sumAll = this.sumValues(summary);
    return (
      <Wrapper>
        <Header>Накладная</Header>
        <Table>
          <tr>
            <td>Наименование</td>
            <td>Артикул</td>
            <td>Материал</td>
            <td>Фото</td>
            <td>Размер, мм</td>
            <td>Количество</td>
            <td>Стоимость</td>
          </tr>
          {items.map(product => (
            <tr>
              <td>{product.name}</td>
              <td>{product.typeCode}</td>
              <td>{materialRus[product.material]}</td>
              <td>
                <Image src={`http://${host}${product.icon}`} />
              </td>
              <td>{product.size}</td>
              <td>{product.count}</td>
              <td>{product.count * (isWholesale ? product.wholesalePrice : product.price)}</td>
            </tr>
          ))}
        </Table>

        <SummaryTable>
          {materials.map(material => (
            <tr>
              <td>{`Cумма (${materialRus[material]})`}</td>
              <td>{summary[material]}</td>
            </tr>
          ))}

          <tr>
            <td>Итоговая сумма</td>
            <td>{sumAll}</td>
          </tr>
        </SummaryTable>
        <HiddenImg src={logo} />
      </Wrapper>
    );
  }
}
