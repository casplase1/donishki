import React from 'react';
import styled from 'styled-components';
import logo from './logoBase64';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 100px;
  display: block;
`;

export default () => (
  <Wrapper id="pageFooter">
    <div>www.donishki.ru</div>
    <Img src={logo} />
    <div>+7 (985) 973-07-39</div>
  </Wrapper>
);
