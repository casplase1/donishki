import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input`
  border: 1px solid #cccccc;
  border-radius: 20px;
  padding: 8px 15px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Lato-Regular';
  color: #4a4a4a;
`;

export default ({ handleChangeForm, placeholder, name }) => (
  <TextInput
    placeholder={placeholder}
    type="text"
    name={name}
    onChange={handleChangeForm}
  />
);
