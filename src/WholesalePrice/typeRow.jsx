import React, { Component } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import Quantity from '../generic/Quantity';

const InputBlock = styled.div`
  display: flex;
`;

const Input = styled(InputMask)`
  width: 30%;
`;

class TypeRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: {},
      quantityHidden: {},
      rowPrice: {},
    };
  }

  inputChange = (e) => {
    const { value, id, name } = e.target;
    this.setState(prevState => ({
      inputValue: {
        ...prevState.inputValue,
        [id]: Number(value),
      },
    }));
    this.setRowPrice(name, value);
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

  showQuantity = (e) => {
    const { id } = e.target;
    this.setState(prevState => ({
      quantityHidden: {
        ...prevState.quantityHidden,
        [id]: true,
      },
    }));
  };

  setRowPrice = (name, value, id) => {
    this.setState(prevState => ({
      rowPrice: {
        ...prevState.rowPrice,
        [id]: prevState.rowPrice + name * value,
      },
    }));
  };

  render() {
    const { group, type } = this.props;
    const { quantityHidden, inputValue } = this.state;
    return (
      <>
        {group.sizes.map((sizeInColumn) => {
          const item = type.items.find(item => item.size === sizeInColumn);

          if (item !== undefined) {
            return (
              <td>
                {item.price}
                <InputBlock>
                  <Input
                    mask="9999"
                    maskChar=""
                    name={item.price}
                    value={inputValue[item.id]}
                    id={item.id}
                    onChange={this.inputChange}
                    onFocus={this.showQuantity}
                  />
                  <Quantity
                    quantity={inputValue[item.id]}
                    id={item.id}
                    hidden={!quantityHidden[item.id]}
                    handleDecreaseQuantity={this.handleDecreaseQuantity}
                    handleAddQuantity={this.handleAddQuantity}
                  />
                </InputBlock>
              </td>
            );
          }

          return <td>-</td>;
        })}
      </>
    );
  }
}

export default TypeRow;
