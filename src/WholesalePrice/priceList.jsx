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
                <th>&nbsp;</th>
                {group.sizes.map(size => (
                  <th>{size}</th>
                ))}
              </tr>

              {group.types.map(type => (
                <tr>
                  <th>{type.name}</th>
                  {type.items.map(item => (
                    <th>{item.price}</th>
                  ))}
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
