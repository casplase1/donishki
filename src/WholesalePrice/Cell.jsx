import React, { Component } from 'react';
import styled from 'styled-components';

const InputBlock = styled.div`
  display: flex;
  & input {
    width: 80%;
    font-size: 16px;
    border: none;
    margin: 0 auto;
    text-align: center;
    cursor: pointer;
  }
`;

const Td = styled.td`
  cursor: pointer;
  font-size: 14px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      value: '',
    };
  }

  handleInputChange = (e) => {
    const {
      handleChangeItemsCount, typeCode, groupName, setSummary, material,
    } = this.props;
    const { value, id, name } = e.target;
    if (!isNaN(value)) {
      this.setState({
        value,
      }, () => {
        handleChangeItemsCount(groupName, typeCode, Number(id), Number(value), material);
        setSummary(material, id, name * value);
      });
    }
  };

  handleAddQuantity = () => {
    this.setState(prevState => ({
      value: prevState.value + 1,
    }));
  };

  handleDecreaseQuantity = () => {
    this.setState(prevState => ({
      value: prevState.value - 1,
    }));
  };

  showQuantity = (id) => {
    const { setActiveCellId } = this.props;
    setActiveCellId(id);
  };

  handleClickFocus = () => {
    this.inputRef.current.focus();
  };

  render() {
    const { item } = this.props;
    const { value } = this.state;
    return (
      <Td onClick={this.handleClickFocus}>
        <InputBlock>
          <input
            ref={this.inputRef}
            value={item.count > 0 ? item.count : ''}
            name={item.price}
            id={item.id}
            onChange={this.handleInputChange}
          />
        </InputBlock>
        {item.price}
        {' ₽'}
      </Td>
    );
  }
}
