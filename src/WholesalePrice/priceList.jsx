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
    const { price } = this.props;

    return (
      <Wrapper>
        {price.map((item, i) => (
          <table key={i} border="1" cellPadding="4" cellSpacing="0">
            <thead>
              <tr>
                <th colSpan="5">Размер</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan="2">{item.group}</td>
                {item.size.map((size, n) => (
                  <th key={n}>{size}</th>
                ))}
              </tr>
              <tr>
                {item.price.map((pr, index) => (
                  <th key={index}>{pr}</th>
                ))}
              </tr>
            </tbody>
          </table>
        ))}
      </Wrapper>
    );
  }
}

export default PriceList;
