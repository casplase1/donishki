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

export default ({}) => (
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
        </tr>
      ))}
    </Table>
  </Wrapper>
);
