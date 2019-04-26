import React from 'react';
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

const TdStatus = styled.td`
  width: 250px;
  padding: 0 10px;
`;

const SquareWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const StatusSquare = styled.div`
  width: 25px;
  height: 18px;
  border: 1px solid black;
  margin: 1px;
`;

export default ({}) => (
  <Wrapper>
    <Header>Производственный лист</Header>
    <Table>
      <tr>
        <td>Наименование</td>
        <td>Артикул</td>
        <td>Материал</td>
        <td>Фото</td>
        <td>Размер, мм</td>
        <td>Количество</td>
        <td>Статус</td>
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

          <TdStatus>
            <SquareWrap>
              {[...Array(item.count)].map(() => (
                <StatusSquare />
              ))}
            </SquareWrap>
          </TdStatus>
        </tr>
      ))}
    </Table>
  </Wrapper>
);
