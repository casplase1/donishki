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
    return (
      <Wrapper>
        {' '}
        <table>
          {this.props.data.map(item => (
            <tr>
              <td>{item.name}</td>
              <td>
                <tr>
                  {item.size.map(item => (
                    <th>{item}</th>
                  ))}
                  {item.prices.map(item => (
                    <td>{item.mdf}</td>
                  ))}
                </tr>
              </td>
              <td />
            </tr>
          ))}
        </table>
      </Wrapper>
    );
  }
}

export default PriceList;
