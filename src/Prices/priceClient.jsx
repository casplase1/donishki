import React, { Component } from 'react';
import styled from 'styled-components';
import data from './data';
import materialRus from '../constant/materials';

const Wrapper = styled.div`
  @media (min-width: 768px) {
    margin: 0 auto;
    max-width: 967px;
  }
`;

const Image = styled.img`
  width: 50px;
`;

const Header = styled.h2`
  margin-top: 50px;
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

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {},
    };
  }

  setSummary = () => {
    const summary = {};
    data.map(item => (summary[item.material] != undefined
      ? (summary[item.material] += item.count * item.price)
      : (summary[item.material] = item.count * item.price)));
    return summary;
  };

  sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

  render() {
    const summary = this.setSummary();
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
          {data.map(item => (
            <tr>
              <td>{item.name}</td>
              <td>{item.typeCode}</td>
              <td>{materialRus[item.material]}</td>
              <td>
                <Image src={item.image} />
              </td>
              <td>{item.size}</td>
              <td>{item.count}</td>
              <td>{item.count * item.price}</td>
            </tr>
          ))}
        </Table>

        <SummaryTable>
          {materials.map(material => (
            <tr>
              <td>{`Итоговая сумма (${materialRus[material]})`}</td>
              <td>{summary[material]}</td>
            </tr>
          ))}

          <tr>
            <td>Итоговая сумма</td>
            <td>{sumAll}</td>
          </tr>
        </SummaryTable>
      </Wrapper>
    );
  }
}
