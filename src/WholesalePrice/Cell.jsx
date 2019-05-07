import React, { Component } from 'react';
import styled from 'styled-components';

// const InputBlock = styled.div`
//   display: flex;
// `;

const Input = styled.input`
  width: 80%;
  margin-bottom: 7px;
  font-size: 22px;
  border: none;
  margin: 0 auto;
  text-align: center;
  cursor: pointer;
`;

const Td = styled.td`
  cursor: pointer;
  font-size: 14px;
`;

const Price = styled.span`
  display: inline-block;
  margin-top: 7px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  handleInputChange = (e) => {
    const {
      handleChangeItemsCount, typeCode, groupName, setSummary, material,
    } = this.props;
    const { value, id, name } = e.target;
    if (value) {
      handleChangeItemsCount(groupName, typeCode, Number(id), Number(value), material);
      setSummary(material, id, name * value);
    }
  };

  handleClickFocus = () => {
    this.inputRef.current.focus();
  };

  render() {
    const { item } = this.props;
    return (
      <Td onClick={this.handleClickFocus}>
        <Input
          ref={this.inputRef}
          value={item.count > 0 ? item.count : ''}
          name={item.price}
          id={item.id}
          onChange={this.handleInputChange}
        />
        <Price>
          {`${item.price} ₽`}
        </Price>
      </Td>
    );
  }
}
