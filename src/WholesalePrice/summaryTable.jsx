import React, { Component } from 'react';
import styled from 'styled-components';
import materialRus from '../constant/materials';

const Table = styled.table`
  margin: 30px 0 180px 0;
  width: 50%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  & th,
  td {
    border: 1px solid black;
  }

  & td {
    width: 100px;
    padding: 0 10px;
  }
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
                <td>{`Cумма (${materialRus[material]})`}</td>
                <td>{calcMaterialSummary(material)}</td>
              </tr>
            ))}

            <tr>
              <td>Итоговая сумма </td>
              <td>{summ}</td>
            </tr>
          </tbody>
        </Table>
      </>
    );
  }
}

export default SummaryTable;
