import React, { Component } from 'react';
import styled from 'styled-components';
import Success from './Success';
import Form from './Form';
import close from '../close.svg';
import validatePhone from '../../functions/validatePhone';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: ${({ display }) => display};
  justify-content: center;
  align-items: center;
  z-index: 100;
  overflow-y: scroll;
  background: rgba(0, 0, 0, 0.75);
`;

const ContentWrapper = styled.div`
  position: relative;
  padding: 50px;
  background: #fff;
  border-radius: 10px;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 15px;
  cursor: pointer;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      success: false,
    };
  }

  handleChangeForm = (e) => {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  handleClick = () => {
    const { phone, name, email } = this.state;
    const { sendOrder } = this.props;
    if (phone && validatePhone(phone)) {
      sendOrder(phone, name, email);
      this.setState({
        success: true,
      });
    }
  };

  render() {
    const { isPopUpOpen, closePopUp } = this.props;
    const { success } = this.state;
    return (
      <Wrapper display={isPopUpOpen ? 'flex' : 'none'}>
        <ContentWrapper>
          { success ? <Success />
            : <Form handleChangeForm={this.handleChangeForm} handleClick={this.handleClick} />}
          <CloseButton src={close} onClick={closePopUp} />
        </ContentWrapper>
      </Wrapper>
    );
  }
}
