import React, { Component } from 'react';
import styled from 'styled-components';
import TypeRow from './typeRow';

const Image = styled.img`
  width: 50px;
`;

class GroupTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rowPrice: {},
    };
  }

  render() {
    const { group } = this.props;
    const { rowPrice } = this.state;
    return (
      <>
        {group.types.map(type => (
          <tr>
            <td>{type.name}</td>
            <td>{`Арт ${type.typeCode}`}</td>
            <td>
              <Image src={type.image} />
            </td>
            <TypeRow group={group} type={type} />
            <td>{rowPrice}</td>
          </tr>
        ))}
      </>
    );
  }
}

export default GroupTable;
