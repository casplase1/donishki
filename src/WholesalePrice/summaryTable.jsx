import React, { Component } from 'react';
import styled from 'styled-components';
import materialRus from '../constant/materials';

const Table = styled.table`
  margin-top: 30px;
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
    const { datasummary, calcMaterialSummary, calcSummary } = this.props;
    const materials = Object.getOwnPropertyNames(datasummary);
    const summ = calcSummary();

    return (
      <>
        <Table>
          <tbody>
            {materials.map(material => (
              <tr>
                <td>{`Итоговая сумма (${materialRus[material]})`}</td>
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
