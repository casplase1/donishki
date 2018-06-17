import React, { Component } from 'react';
import styled from 'styled-components';
import Scroll from 'react-scroll';
import Waypoint from 'react-waypoint';
import Gallery from 'react-grid-gallery';
import donishkiLogo from './donishki-color-white-logo.svg';
import Footer from './Footer';

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

const H1 = styled.h1`
  font-size: 28px;
  font-family: 'Roboto-Light', sans-serif;
  
  @media (min-width: 768px) {
    font-size: 48px;
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

const H2 = styled.h2`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  text-align: left;
  padding-left: 20px;
  
  @media (min-width: 768px) {
    font-size: 24px;
    text-align: center;
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

const GalleryContent = Article.withComponent('div').extend`
  padding-top: 20px;
`;

const ClearBlock = styled.div`
  clear: both;
`;

const GalleryWrapper = styled.div`
  background-color: #f2f7f4;
  padding: 40px 0;
  margin-bottom: 60px;
`;

const images =
  [
    {
      src: '/gallery/1.jpg',
      thumbnail: '/gallery/1.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/2.jpg',
      thumbnail: '/gallery/2.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/3.jpg',
      thumbnail: '/gallery/3.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/4.jpg',
      thumbnail: '/gallery/4.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/5.jpg',
      thumbnail: '/gallery/5.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
    {
      src: '/gallery/6.jpg',
      thumbnail: '/gallery/6.jpg',
      thumbnailWidth: 333,
      thumbnailHeight: 250,
    },
  ];

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mapPreloader: true,
    };

    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
  }

  handleWaypointEnter() {
    this.setState({
      mapPreloader: false,
    });
  }

  render() {
    return <Wrapper>
      <Banner>
        <Pixel />
        <Mask />
        <a href="/">
          <DonishkiLogo src={donishkiLogo} alt="Донышки для вязания donishki.ru"/>
        </a>
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
        шлифованием для удаление следов резки, неровностей а также для придания
        эстетического вида.
        Помимо <b>деревянных донышек для плеиения корзинок</b> мы вырезаем донышки из акрила (оргстекла), ПЭТа, МДФ.
        В нашем прайсе можно найти донышки различных форм
        и размеров. Минимальный заказ - 1000 рублей.
      </Article>

      <Anchor name="BuyAnchor" />
      <H2>Как купить</H2>
      <Article>
        Напишите нам на почту, в любой мессенджер, или просто позвоните,
        если не хотите ждать. Мы с радостью ответим на все ваши вопросы и
        расскажем детали.
      </Article>

      <Anchor name="GalleryAnchor" />
      <GalleryWrapper>
        <Waypoint onEnter={this.handleWaypointEnter} />
        <H2>Примеры работ</H2>
        <GalleryContent>
          <Gallery images={images} enableImageSelection={false} rowHeight={250} />
          <ClearBlock />
        </GalleryContent>
      </GalleryWrapper>

      <H2>Дизайн донышек</H2>
      <Article>
        Если вы не нашили в прайсе нужных
        вам донышек, наш дизайнер подготовит
        вам макеты, учтывая все ваши требования
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
