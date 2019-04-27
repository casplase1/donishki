import React, { Component } from 'react';
import styled from 'styled-components';
import TypeRow from './typeRow';

const Image = styled.img`
  width: 50px;
`;

const Tr = styled.tr`
  &: hover {
    background-color: #dbdbdd;
  }
`;

export default class extends Component {
  render() {
    const {
      group,
      handleChangeItemsCount,
      activeId,
      setActiveCellId,
      columnCount,
      setSummary,
      currentmaterial,
    } = this.props;
    return group.types.map(type => (type.material === currentmaterial ? (
      <Tr>
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
          columnCount={columnCount}
          setSummary={setSummary}
          material={type.material}
        />
      </Tr>
    ) : null));
  }
}
