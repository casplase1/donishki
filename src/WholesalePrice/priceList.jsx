import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  margin: 0 auto;
  max-width: 967px;
`;

class PriceList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { data } = this.props;
    return (
      <Wrapper>
        {data
          && data.map(group => (
            <table width="80%">
              <tr>
                <td>&nbsp;</td>
                {group.sizes.map(size => (
                  <td>{size}</td>
                ))}
              </tr>

              {group.types.map(type => (
                <tr>
                  <td>{type.name}</td>
                  {group.sizes.map((columnSize) => {
                    const item = type.items.find((item) => {
                      return item.size === columnSize
                    });

                    if (item !== undefined) {
                      return <td>{item.price}</td>;
                    }

                    return <td>-</td>;
                  })
                  }
                </tr>
              ))}
              <tr />
              <tr />
            </table>
          ))}
      </Wrapper>
    );
  }
}

export default PriceList;
