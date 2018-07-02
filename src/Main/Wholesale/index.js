import React from 'react';
import styled from 'styled-components';
import H2 from '../../generic/H2';
import GhostButton from '../../generic/GhostButton';
import background from './background.jpg';

const Wrapper = styled.div`
  background-size: cover;
  background-image: url(${background});
  text-align: center;
  position: relative;
  height: 480px;
`;

const Shadow = styled.div`
  background: linear-gradient(to bottom, transparent, black) no-repeat bottom;
  background-size: 100% 130%;
  width: 100%;
  height: 100%;
  position: absolute;
`;

const ContentWrapper = styled.div`
  position: absolute;
  top: 5%;
  width: 100%;
  
  @media (min-width: 768px) {
    top: 10%;
  }
`;

const StyledH2 = styled(H2)`
  font-size: 32px;
  margin: 0;
  padding: 20px;
  color: #fff;
  
  @media (min-width: 768px) {
    padding: 35px 0;
    font-size: 48px;
  }
`;

const Article = styled.article`
  margin: 0 auto;
  margin-bottom: 30px;
  padding 0 20px;
  font-family: 'Roboto-Light', sans-serif;
  line-height: 1.6em;
  text-align: left;
  color: #fff;
  
  @media (min-width: 768px) {
    margin-bottom: 50px;
    width: 970px;
  }
`;

const GetPriceButton = styled(GhostButton)`
  background-color: #59cb78;
  border-radius: 25px;
  padding: 16px 25px;
  border: none;
`;

export default ()=>(
  <Wrapper>
    <Shadow />
    <ContentWrapper>
      <StyledH2>Заказать оптом</StyledH2>
      <Article>
        Помимо розницы, у нас возможно сделать оптовый заказ.
        Принимаем оплату через расчетный счет, на карту сбербанка, а так же возможен наличный расчет.
        Готовые изделия вы можете забрать самовывозом,
        либо отправим посылку почтой России или курьерскими компаниями (СДЕК, Деловые линии итд).
        Минимальный оптовый заказ - 6900 рублей.
      </Article>
      <GetPriceButton>
        Скачать оптовый прайс
      </GetPriceButton>
    </ContentWrapper>
  </Wrapper>
);