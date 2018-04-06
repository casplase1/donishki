import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  
`;

const Banner = styled.div`
  background-size: cover;
  height: 370px;
  color: white;
  background-image: url('./banner.jpg');
  margin-bottom: 50px;
  
  @media (min-width: 768px) {
    height: 450px;
  }
`;

const Pixel = styled.div`
  width: 100%;
  height: inherit;
  position: absolute;
  background-image: url('./pixel.png');
`;

const BannerText = styled.div`
  text-align: center;
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  width: 100%;
  padding-top: 100px;
`;

const H1 = styled.h1`
  font-size: 32px;
  
  @media (min-width: 768px) {
    font-size: 56px;
  }
`;

const H2 = styled.h2`
  font-size: 18px;
  text-align: left;
  padding-left: 20px;
  
  @media (min-width: 768px) {
    font-size: 24px;
    text-align: center;
  }
`;

const Article = styled.article`
  
  margin: 0 auto;
  margin-bottom: 35px;
  padding 0 20px;
  
  @media (min-width: 768px) {
    width: 970px;
  }
`;

const Contacts = Article.withComponent('div');

export default () => (
  <Wrapper>
    <Banner>
      <Pixel />
      <BannerText>
        <H1>Донышки для вязания<br /> Дерево, оргстекло<br /> Опт и розница</H1>
      </BannerText>
    </Banner>
    <Article>
      Мы занимаемся производством донышек для вязания из высококачественной
      фанеры сорта 2/2 толщины 3мм, 4мм, 6мм на точном лазерном
      оборудовании. Каждое изделие после вырезки проходит обработку
      шлифованием для удаление следов резки, неровностей а также для придания
      эстетического вида. В нашем прайсе можно найти донышки различных форм
      и размеров. Минимальный заказ - 1000руб.
    </Article>

    <H2>Как заказать</H2>
    <Article>
      Напишите нам на почту, в любой мессенджер, или просто позвоните,
      если не хотите ждать. Мы с радостью ответим на все ваши вопросы и
      расскажем детали.
    </Article>

    <H2>Дизайн донышек</H2>
    <Article>
      Если вы не нашили в прайсе нужных
      вам донышек, наш дизайнер подготовит
      вам макеты, учтывая все ваши требования
      и пожелаия. Сроки подготовки макетов -
      не более одних суток.
    </Article>

    <H2>Доставка и оплата</H2>
    <Article>
      Возможна работа через расчетный счет, оплата на карту сбербанка,
      наличный расчет. Готовые изделия вы можете забрать самовывозом.
      Мы находимся в пешей доступности от ст. метро “Владыкино” или
      МЦК “Окружная”. Также возможна отправка к вам курьера.
    </Article>

    <H2>Контакты</H2>
    <Article>
      Мы находимся в Москве, в пешей доступности от станции м. Владыкино
      или от станции МЦК “Окружная”. Алтуфьевское шоссе д5.
    </Article>

    <Contacts>
      <ul>
        <li>Телефон: +7 (985) 734-63-31</li>
        <li>WhatsApp, Viber,
          Telegram: +7 (985) 734-63-31
        </li>
        <li>Email: info@casplase.ru</li>
      </ul>
    </Contacts>
  </Wrapper>
);