import React from 'react';
import styled from 'styled-components';
import TextInput from '../../generic/TextInput';
import PhoneInput from '../../generic/PhoneInput';
import GhostButton from '../../generic/GhostButton';

const Label = styled.label`
  font-size: 16px;
  margin: 10px 0;
`;

const ButtonWrapper = styled.div`
  padding: 10px 0 0 0;
  text-align: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmailNote = styled.span`
  display: block;
  padding-left: 10px;
  padding-top: 5px;
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  color: #aaa
`;

export default ({ handleChangeForm, handleClick }) => (
  <FormWrapper>
    <Label>
      <TextInput placeholder="Ваше имя" name="name" onChange={handleChangeForm} />
    </Label>
    <Label>
      <PhoneInput
        mask="+7 (999) 999-99-99"
        placeholder="Ваш телефон"
        name="phone"
        onChange={handleChangeForm}
      />
    </Label>
    <Label>
      <TextInput placeholder="Ваш Email" name="email" onChange={handleChangeForm} />
      <EmailNote>* Вышлем на почту выбранные позиции</EmailNote>
    </Label>
    <ButtonWrapper>
      <GhostButton onClick={handleClick}>Отправить заказ</GhostButton>
    </ButtonWrapper>
  </FormWrapper>
);
