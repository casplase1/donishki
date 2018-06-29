import React, { Component } from 'react';
import styled from 'styled-components';
import { withCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Scroll from 'react-scroll';
import donishkiLogo from './donishki-color-white-logo.svg';
import Footer from './../Footer';
import Header from './../Header';
import H2 from './../generic/H2';
import H1 from './../generic/H1';
import Catalog from './../Main/Catalog';
import Gallery from './../Main/Gallery';

const cookies = new Cookies();

const Anchor = Scroll.Element;

const Wrapper = styled.div`
  
`;

const DonishkiLogo = styled.img`
  left:0;
  right:0;
  margin-left:auto;
  margin-right:auto;
  padding-top: 10px;
  position: absolute;
  width: 150px;
  z-index: 1;
  
  @media (min-width: 768px) {
    width: 200px;
  }
`;

const Banner = styled.div`
  background-size: cover;
  height: 380px;
  color: white;
  background-image: url('./banner.jpg');
  margin-bottom: 50px;
  text-align: center;
  
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

const Mask = styled.div`
  width: 100%;
  height: inherit;
  position: absolute;
  background: #000;
  opacity: 0.3;
`;

const BannerText = styled.div`
  text-align: center;
  position: absolute;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  width: 100%;
  padding-top: 125px;
  
  @media (min-width: 768px) {
    padding-top: 150px;
  }
`;

const BR = styled.br`
  @media (min-width: 768px) {
    display: none;
  }
`;

const Subheader = styled.span`
  font-family: 'Roboto', sans-serif;
  font-size: 28px;
  
  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const Article = styled.article`
  margin: 0 auto;
  margin-bottom: 55px;
  padding 0 20px;
  font-family: 'Roboto-Light', sans-serif;
  line-height: 1.6em;
  
  @media (min-width: 768px) {
    width: 970px;
  }
`;

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapPreloader: true,
      items: cookies.get('items'),
    };

    this.setItems = this.setItems.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
  }

  setItems(items) {
    this.setState({items});
  }

  handleWaypointEnter() {
    this.setState({
      mapPreloader: false,
    });
  }

  render() {
    return <Wrapper>
      <Header items={this.state.items} />
      <Banner>
        <Pixel />
        <Mask />
        <Link to="/">
          <DonishkiLogo src={donishkiLogo} alt="Донышки для вязания donishki.ru"/>
        </Link>
        <BannerText>
          <H1>Донышки<BR /> для вязания корзин<br /> Фанера, дерево, оргстекло</H1>
          <Subheader>Опт и розница</Subheader>
        </BannerText>
      </Banner>

      <H2>Донышки для вязания корзин</H2>
      <Article>
        Мы занимаемся производством <b>донышек для вязания (плетения) корзин из трикотажной пряжи</b>.
        Донышки изготавливаются из из высококачественной фанеры сорта 2/2 толщины 3мм, 4мм, 6мм на точном лазерном
        оборудовании. Каждое изделие после вырезки проходит обработку
        шлифованием для удаления следов резки, неровностей а также для придания
        эстетического вида.
        Помимо <b>деревянных донышек для плетения корзинок</b> мы вырезаем донышки из акрила (оргстекла), ПЭТа, МДФ.
        В нашем прайсе можно найти донышки различных форм
        и размеров. Минимальный заказ - 1000 рублей.
      </Article>

      <Gallery handleWaypointEnter={this.handleWaypointEnter} />

      <Catalog setItems={this.setItems} />

      <H2>Дизайн донышек</H2>
      <Article>
        Если вы не нашли в прайсе нужных
        вам донышек, наш дизайнер подготовит
        вам макеты, учитывая все ваши требования
        и пожелаия. Сроки подготовки макетов -
        не более одних суток.
      </Article>

      <Anchor name="DeliveryAnchor" />
      <H2>Доставка и оплата</H2>
      <Article>
        Возможна работа через расчетный счет, оплата на карту сбербанка,
        наличный расчет. Готовые изделия вы можете забрать самовывозом.
        Мы находимся в пешей доступности от ст. метро “Владыкино” или
        МЦК “Окружная”. Также возможна отправка к вам курьера.
      </Article>

      <Footer mapPreloader={this.state.mapPreloader} />
    </Wrapper>
  }
}

export default withCookies(Main);