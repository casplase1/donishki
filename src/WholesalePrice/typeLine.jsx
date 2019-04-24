import React from 'react';
import styled from 'styled-components';
import Quantity from '../generic/Quantity';

const Image = styled.img`
  width: 50px;
`;

export default ({ group }) => group.types.map(type => (
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
            <Quantity quantity={0} id={item.id} />
          </td>
        );
      }

      return <td>-</td>;
    })}
    <td>0</td>
  </tr>
));
