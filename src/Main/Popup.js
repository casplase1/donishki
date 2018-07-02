import React from 'react';
import styled from 'styled-components';
import modalClose from './modal-close.svg';

const Wrapper = styled.div`
  display: ${props => (props.isOpened ? 'flex' : 'none')};
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  top: 0;
  z-index: 2;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  overflow: scroll;
`;

const Popup = styled.div`
  padding: 30px;
  margin: 20px;
  margin-top: 70px;
  font-family: 'Roboto', sans-serif;
  box-shadow: 0 7px 15px 0 rgba(1, 1, 1, 0.1);
  background-color: #ffffff;
  border-radius: 5px;
  width: 350px;
  box-shadow: 0 7px 15px 0 rgba(1, 1, 1, 0.1);
`;

const Message = styled.h3`
  color: #59cb78;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-weight: normal;
  padding: 80px 40px 120px 40px;
`;

const CloseWrapper = styled.div`
  text-align: right;
`;

const CloseIcon = styled.img`
  width: 13px;
  height: 13px;
  padding-top: 5px;
  cursor: pointer;
`;

export default props => (
  <Wrapper isOpened={props.isOpened}>
    <Popup>
      <CloseWrapper>
        <CloseIcon onClick={props.handleClose} src={modalClose}/>
      </CloseWrapper>
      <Message>
        Спасибо! Мы свяжемся с вами как можно скорее.
      </Message>
    </Popup>
  </Wrapper>
);
