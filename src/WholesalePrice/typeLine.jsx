import React, { Component } from 'react';
import styled from 'styled-components';
import InputMask from 'react-input-mask';
import Quantity from '../generic/Quantity';

const Image = styled.img`
  width: 50px;
`;

const InputBlock = styled.div`
  display: flex;
`;

const Input = styled(InputMask)`
  width: 30%;
`;

class TypeLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantityHidden: {},
    };
  }

  showQuantity = (e) => {
    const { id } = e.target;
    this.setState(prevState => ({
      quantityHidden: {
        ...prevState.quantityHidden,
        [id]: true,
      },
    }));
  };

  render() {
    const {
      group,
      inputValue,
      inputChange,
      handleDecreaseQuantity,
      handleAddQuantity,
    } = this.props;
    const { quantityHidden } = this.state;
    return (
      <>
        {group.types.map(type => (
          <tr>
            <td>{type.name}</td>
            <td>{`Арт ${type.typeCode}`}</td>
            <td>
              <Image src={type.image} />
            </td>
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
                        onChange={inputChange}
                        onFocus={this.showQuantity}
                      />
                      <Quantity
                        quantity={inputValue[item.id]}
                        id={item.id}
                        hidden={!quantityHidden[item.id]}
                        handleDecreaseQuantity={handleDecreaseQuantity}
                        handleAddQuantity={handleAddQuantity}
                      />
                    </InputBlock>
                  </td>
                );
              }

              return <td>-</td>;
            })}
            <td>0</td>
          </tr>
        ))}
      </>
    );
  }
}

export default TypeLine;
