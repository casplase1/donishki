import React, { Component } from 'react';
import styled from 'styled-components';
import TypeLine from './typeLine';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  margin: 0 auto;
  max-width: 967px;

  & table,
  th,
  td {
    border: 1px solid black;
  }
`;

const Table = styled.table`
  margin-top: 30px;
  width: 100%;
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;
  text-align: center;
`;

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {},
    };
  }

  inputChange = (e) => {
    const { value, id } = e.target;
    this.setState(prevState => ({
      inputValue: {
        ...prevState.inputValue,
        [id]: Number(value),
      },
    }));
  };

  handleAddQuantity = (id) => {
    this.setState(prevState => ({
      inputValue: {
        ...prevState.inputValue,
        [id]: prevState.inputValue[id] + 1,
      },
    }));
  };

  handleDecreaseQuantity = (id) => {
    this.setState(prevState => ({
      inputValue: {
        ...prevState.inputValue,
        [id]: prevState.inputValue[id] - 1,
      },
    }));
  };

  render() {
    const { inputValue } = this.state;
    const { data } = this.props;
    return (
      <Wrapper>
        {data
          && data.map(group => (
            <Table>
              <tbody>
                <tr>
                  <td rowSpan="2">Наименование</td>
                  <td rowSpan="2">Артикул</td>
                  <td rowSpan="2">Фото</td>
                  <td colSpan={`${group.sizes.length}`}>Размеры</td>
                  <td rowSpan="2">Итоговая сумма</td>
                </tr>

                <tr>
                  {group.sizes.map(size => (
                    <td>{size}</td>
                  ))}
                </tr>
                <TypeLine
                  group={group}
                  inputValue={inputValue}
                  inputChange={this.inputChange}
                  handleAddQuantity={this.handleAddQuantity}
                  handleDecreaseQuantity={this.handleDecreaseQuantity}
                />
              </tbody>
            </Table>
          ))}
      </Wrapper>
    );
  }
}

export default PriceList;
