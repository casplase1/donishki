import React, { Component } from 'react';
import styled from 'styled-components';
import GroupTable from './GroupTable';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 967px;
  & table,
  th,
  td {
    border: 1px solid #aaa;
  }
`;

const Table = styled.table`
  table-layout: fixed;
  margin-top: 30px;
  width: 100%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;
  text-align: center;
  & td {
    min-width: 37px;
  }
`;

const TdSizes = styled.td`
  background: #ccc;
  font-size: 14px;
`;

const TdName = styled.td`
  width: 120px;
  background: #ccc;
  font-size: 14px;
`;

const TdArt = styled.td`
  width: 85px;
  background: #ccc;
  font-size: 14px;
`;

const TdSum = styled.td`
  width: 95px;
  font-size: 14px;
`;

const TdPhoto = styled.td`
  width: 70px;
  background: #ccc;
  font-size: 14px;
`;

const Td = styled.td`
  width: 100px;
  font-size: 12px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeCellId: null,
    };
  }

  setActiveCellId = (id) => {
    this.setState({
      activeCellId: id,
    });
  };

  getColumnCount = (data) => {
    const currentSize = data.map(group => group.sizes.length);
    return Math.max.apply(Math, currentSize);
  };

  render() {
    const {
      data, handleChangeItemsCount, setSummary, currentMaterial,
    } = this.props;
    const { activeCellId } = this.state;
    const columnCount = this.getColumnCount(data);
    const sizeCount = columnCount;
    return (
      <Wrapper>
        {data
          && data.map(group => (
            <Table>
              <tbody>
                <tr>
                  <TdName rowSpan="2">Наименование</TdName>
                  <TdArt rowSpan="2">Артикул</TdArt>
                  <TdPhoto rowSpan="2">Фото</TdPhoto>
                  <TdSizes colSpan={`${columnCount}`}>Размеры</TdSizes>
                  <TdSum rowSpan="2">Итоговая сумма</TdSum>
                </tr>

                <tr>
                  {group.sizes.map(size => (
                    <Td>{size}</Td>
                  ))}
                  {sizeCount && [...Array(sizeCount - group.sizes.length)].map(() => <Td>-</Td>)}
                </tr>

                <GroupTable
                  group={group}
                  handleChangeItemsCount={handleChangeItemsCount}
                  activeId={activeCellId}
                  setActiveCellId={this.setActiveCellId}
                  columnCount={columnCount}
                  setSummary={setSummary}
                  currentMaterial={currentMaterial}
                  tableHidden={this.tableHidden}
                />
              </tbody>
            </Table>
          ))}
      </Wrapper>
    );
  }
}
