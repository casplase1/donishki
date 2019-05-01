import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../icons/donishki-color-black-logo.svg';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  font-family: 'Roboto', sans-serif;
`;

const Image = styled.img`
  width: 200px;
`;

const Text = styled.span`
  margin: 0;
  display: block;
`;

const Span = styled.span`
  
`;

const Redspan = styled.span`
  color: red;
  font-weight: bolder;
`;

const Requisites = styled.div`
  width: 30%;
  padding: 10px;
  border-left: 2px solid #000;
`;

const RequisitesHeader = styled.div`
  margin: 0;
`;

const RequisitesText = styled.span`
  font-size: 12px;
  padding: 5px;
  margin: 0;
`;

const SecondColumn = styled.div`
  width: 45%;
`;

const HeaderTextWrapper = styled.div`
  font-size: 12px;
  padding-left: 20px;
  padding-right: 70px;
  padding-top: 10px;
  & ol {
    margin: 0;
    padding: 0 0 0 10px;
  }
  & li {
    margin: 0;
    padding: 0;
  }
`;

export default () => (
  <Wrapper>
    <Link to="/">
      <Image src={Logo} />
    </Link>
    <SecondColumn>
      <HeaderTextWrapper>
        <Text>Телефон: +7 (985) 973-07-39</Text>
        <Text>Почта: info@casplase.ru</Text>
        <Text>Сайт: https://nagravirovku.ru</Text>
        <Span>
          {'Возможно изготовление донышек '}
          <Redspan>любых форм и размеров </Redspan>
          {' на заказ '}
        </Span>
        <ol>
          <li>
            {'Стоимость указана '}
            <Redspan>при общей закупке товара на сумму от 6300 рублей</Redspan>
          </li>
          <li>
            {'При заказе на сумму более '}
            <Redspan>12000</Redspan>
            {' рублей доставка транспортной компанией до терминала в вашем городе или курьером по городу Москва '}
            <Redspan>Бесплатно.</Redspan>
          </li>
          <li>Все заказы из фанеры проходят процесс шлифовки.</li>
        </ol>
      </HeaderTextWrapper>
    </SecondColumn>
    <Requisites>
      <RequisitesHeader>Реквизиты для заказа:</RequisitesHeader>
      <RequisitesText>
        ИП Панченко Андрей Дмитриевич
        {' '}
        <br />
        {'ОГРНИИП 318774600098068 '}
        <br />
        {'ИНН 771386120991 '}
        <br />
        {'Банк МОСКОВСКИЙ ФИЛИАЛ '}
        <br />
        {'АО КБ "МОДУЛЬБАНК"'}
        <br />
        БИК 044525092
        <br />
        К/с 30101810645250000092
        <br />
        {'Счет 40802810870010072151 '}
      </RequisitesText>
    </Requisites>
  </Wrapper>
);
