import React, { Component } from 'react';
import styled from 'styled-components';
import materialRus from '../constant/materials';

const Table = styled.table`
  margin: 30px 0 180px 0;
  width: 50%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  & td {
    width: 100px;
    padding: 0 10px;
    font-size: 15px;
    border: 1px solid #aaa;
  }
`;

const Td = styled.td`
  background: #ccc;
`;

class SummaryTable extends Component {
  render() {
    const { dataSummary, calcMaterialSummary, calcSummary } = this.props;
    const materials = Object.getOwnPropertyNames(dataSummary);
    const summ = calcSummary();

    return (
      <>
        <Table>
          <tbody>
            {materials.map(material => (
              <tr>
                <Td>{materialRus[material]}</Td>
                <td>{calcMaterialSummary(material)}</td>
              </tr>
            ))}

            <tr>
              <Td><b>Итоговая сумма</b></Td>
              <td>{summ}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

export default SummaryTable;
