import React, { Component } from 'react';
import styled from 'styled-components';
import GroupTable from './groupTable';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 967px;

  & table,
  th,
  td {
    border: 1px solid black;
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

const TdName = styled.td`
  width: 120px;
`;

const TdArt = styled.td`
  width: 85px;
`;

const TdSum = styled.td`
  width: 95px;
`;

const TdPhoto = styled.td`
width: 70px;
`;

const Td = styled.td`
  width: 100px;
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
      data, handleChangeItemsCount, setSummary, currentmaterial,
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
                  <td colSpan={`${columnCount}`}>Размеры</td>
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
                  currentmaterial={currentmaterial}
                  tableHidden={this.tableHidden}
                />
              </tbody>
            </Table>
          ))}
      </Wrapper>
    );
  }
}
