import React, { Component } from 'react';
import styled from 'styled-components';
import TypeRow from './typeRow';

const Image = styled.img`
  width: 50px;
`;

export default class extends Component {
  render() {
    const {
      group,
      handleChangeItemsCount,
      activeId,
      setActiveCellId,
    } = this.props;
    return group.types.map(type => (
      <tr>
        <td>{type.name}</td>
        <td>{`Арт ${type.typeCode}`}</td>
        <td>
          <Image src={type.image} />
        </td>
        <TypeRow
          groupName={group.groupName}
          sizes={group.sizes}
          items={type.items}
          typeCode={type.typeCode}
          handleChangeItemsCount={handleChangeItemsCount}
          activeId={activeId}
          setActiveCellId={setActiveCellId}
        />
      </tr>
    ));
  }
}
