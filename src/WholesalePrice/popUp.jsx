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
  display: ${({ display }) => (display ? 'flex' : 'none')};
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

const InputName = styled.div`
  font-size: 14px;
  color: #4a4a4a;
  text-align: left;
  padding: 10px 20px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  padding: 20px 0;
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

  sendOrder = (items, phone, name, email) => {
    fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        items,
        name,
        phone,
        email,
      }),
    })
      .then(async (data) => {
        const response = await data.json();
        this.props.closePopForm();
      })
      .catch((/* error */) => {});
  };

  render() {
    const {
      phone, email, name, items,
    } = this.state;
    const { popForm, closePopForm } = this.props;
    return (
      <Wrapper display={popForm}>
        <FormWrapper>
          <Label>
            <InputName>Ваше имя</InputName>
            <TextInput placeholder="Ваше имя" name="name" onChange={this.handleChangeForm} />
          </Label>
          <Label>
            <InputName>Ваш телефон</InputName>
            <PhoneInput
              mask="+7 (999) 999-99-99"
              placeholder="+7"
              name="phone"
              onChange={this.handleChangeForm}
            />
          </Label>
          <Label>
            <InputName>Ваш Email</InputName>
            <TextInput placeholder="Ваш Email" name="email" onChange={this.handleChangeForm} />
          </Label>
          <ButtonWrapper>
            <GhostButton
              onClick={(e) => {
                e.preventDefault();
                if (phone && validatePhone(phone)) {
                  this.sendOrder(items, phone, name, email);
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
