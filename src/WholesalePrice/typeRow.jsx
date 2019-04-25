import React, { Component } from 'react';
import Cell from './Cell';

class TypeRow extends Component {
  getRowSum = items => items.reduce(
    (accumulator, item) => (accumulator + item.price * item.count), 0,
  );

  render() {
    const {
      groupName,
      sizes,
      items,
      typeCode,
      activeId,
      setActiveCellId,
      handleChangeItemsCount,
    } = this.props;
    const rowSum = this.getRowSum(items);
    return (
      <>
        {sizes.map((sizeInColumn) => {
          const item = items.find(item => item.size === sizeInColumn);
          if (item !== undefined) {
            return (
              <Cell
                item={item}
                groupName={groupName}
                typeCode={typeCode}
                activeId={activeId}
                setActiveCellId={setActiveCellId}
                handleChangeItemsCount={handleChangeItemsCount}
              />
            );
          }

          return <td>-</td>;
        })}
        <td>{rowSum}</td>
      </>
    );
  }
}

export default TypeRow;
