import React, { Component } from 'react';
import styled from 'styled-components';
import H2 from '../../generic/H2';
import Article from '../../generic/Article';
import Button from '../../generic/TransparentButton';
import PhoneInput from '../../generic/PhoneInput';
import validatePhone from '../../functions/validatePhone';

const Wrapper = styled.div`
  padding: 40px 0;

  @media (min-width: 768px) {
    width: 970px;
    margin: 0 auto;
  }
`;

const Text = styled(Article)`
  margin-bottom: 35px;
`;

const CallWrapper = styled.div`
  text-align: center;
`;

const CallText = styled.span`
  font-family: 'Roboto-Light', sans-serif;
`;

const Number = styled.a`
  font-family: 'Roboto-Light', sans-serif;
  display: block;
  color: #4a4a4a;
  font-size: 32px;
  padding: 20px 0;
`;

const LeaveNumberText = styled.span`
  font-family: 'Roboto-Light', sans-serif;
`;

const LeaveNumberWrapper = styled.div`
  text-align: center;
`;

const LeaveNumberInput = styled(PhoneInput)`
  font-family: 'Roboto', sans-serif;
  width: 200px;
  font-size: 16px;
  margin: 20px 0;
`;

const ButtonWrapper = styled.div``;

const LeaveNumberForm = styled.form`
 
`;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleChangeForm = this.handleChangeForm.bind(this);
  }

  handleChangeForm(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  render() {
    const { handleSendContacts } = this.props;
    const { phone } = this.state;
    return (
      <Wrapper>
        <H2>Не нашли, что искали?</H2>
        <Text>
          {'Если вы не нашли в прайсе или каталоге нужных вам товаров, наш дизайнер может подготовит эскизы, учитывая все ваши требованияи пожелания. Вы всегда всегда идем на встречу клиентам и поможем подобрать что нужно именно вам.'}
        </Text>

        <CallWrapper>
          <CallText>Позвоните нам</CallText>
          <Number href="tel:+79859730739">+7 (985) 973-07-39</Number>
        </CallWrapper>

        <LeaveNumberWrapper>
          <LeaveNumberText>
            Или оставьте свой номер
          </LeaveNumberText>
          <LeaveNumberForm>
            <LeaveNumberInput
              mask="+7 (999) 999-99-99"
              placeholder="+7"
              name="phone"
              onChange={this.handleChangeForm}
            />
            <ButtonWrapper>
              <Button onClick={(e) => {
                e.preventDefault();
                if (phone && validatePhone(phone)) {
                  handleSendContacts(phone);
                }
              }}
              >
                Отправить
              </Button>
            </ButtonWrapper>
          </LeaveNumberForm>
        </LeaveNumberWrapper>
      </Wrapper>
    );
  }
}
