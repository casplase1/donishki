import React, { Component } from 'react';
import styled from 'styled-components';
import TextInput from '../generic/TextInput';
import PhoneInput from '../generic/PhoneInput';
import close from './close.svg';
import GhostButton from '../generic/GhostButton';
import validatePhone from '../functions/validatePhone';

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

const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 15px;
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 16px;
  margin: 10px 0;
`;

const ButtonWrapper = styled.div`
  padding: 10px 0 0 0;
  text-align: center;
`;

const FormWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
`;

const EmailNote = styled.span`
  display: block;
  padding-left: 10px;
  padding-top: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #aaa
`;

class PopUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    };
  }

  handleChangeForm = (e) => {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  render() {
    const { phone, email, name } = this.state;
    const { popForm, closePopForm, sendOrder } = this.props;
    return (
      <Wrapper display={popForm ? 'flex' : 'none'}>
        <FormWrapper>
          <Label>
            <TextInput placeholder="Ваше имя" name="name" onChange={this.handleChangeForm} />
          </Label>
          <Label>
            <PhoneInput
              mask="+7 (999) 999-99-99"
              placeholder="Ваш телефон"
              name="phone"
              onChange={this.handleChangeForm}
            />
          </Label>
          <Label>
            <TextInput placeholder="Ваш Email" name="email" onChange={this.handleChangeForm} />
            <EmailNote>* Вышлем на почту выбранные позиции</EmailNote>
          </Label>
          <ButtonWrapper>
            <GhostButton
              onClick={(e) => {
                e.preventDefault();
                if (phone && validatePhone(phone)) {
                  sendOrder(phone, name, email);
                  closePopForm();
                }
              }}
            >
              Отправить заказ
            </GhostButton>
          </ButtonWrapper>
          <CloseButton src={close} onClick={closePopForm} />
        </FormWrapper>
      </Wrapper>
    );
  }
}

export default PopUpForm;
