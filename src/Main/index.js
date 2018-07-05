import React, { Component } from 'react';
import styled from 'styled-components';
import { withCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Footer from '../Footer';
import Header from '../Header';
import Catalog from './Catalog';
import Gallery from './Gallery';
import Materials from './Materials';
import Wholesale from './Wholesale';
import Delivery from './Delivery';
import WorkExamples from './WorkExamples';
import CustomOrder from './CustomOrder';
import Popup from './Popup';
import Article from '../generic/Article';
import H2 from '../generic/H2';
import H1 from '../generic/H1';
import banner from './banner.jpg';
import donishkiLogo from './donishki-color-white-logo.svg';

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
  height: 380px;
  color: white;
  background-size: cover;
  background-image: url(${banner});
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

const Text = styled(Article)`
  padding-bottom: 40px;
`;

class Main extends Component {
  constructor(props) {
    super(props);

    this.cookies = this.props.cookies || new Cookies();

    this.state = {
      isPopupOpened: false,
      mapPreloader: true,
      items: this.cookies.get('items'),
    };

    this.setItems = this.setItems.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleSendContacts = this.handleSendContacts.bind(this);
  }

  setItems(items) {
    this.setState({items});
  }

  handleWaypointEnter() {
    this.setState({
      mapPreloader: false,
    });
  }

  handleSendContacts(phone) {
    fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({phone}),
    }).then(async (data) => {
      const response = await data.json();
      if (response.status) {
        this.setState({
          isPopupOpened: true
        });
      }
    }).catch((/* error */) => {
      this.setState({
        isPopupOpened: true
      });
    });
  }

  handleClosePopup() {
    this.setState({
      isPopupOpened: false
    });
  }

  render() {
    return <Wrapper>
      <Popup isOpened={this.state.isPopupOpened} handleClose={this.handleClosePopup} />
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
      <Text>
        Мы занимаемся производством <b>донышек для вязания (плетения) корзин из трикотажной пряжи</b>.
        Донышки изготавливаются из высококачественной фанеры сорта 2/2 на точном лазерном
        оборудовании.
        Помимо <b>деревянных донышек для плетения корзинок</b> мы вырезаем донышки из акрила (оргстекла), МДФ.
        В нашем прайсе можно найти донышки различных форм
        и размеров. Минимальный заказ - 490 рублей.
      </Text>

      <Materials />
      <Catalog setItems={this.setItems} />
      <Gallery handleWaypointEnter={this.handleWaypointEnter} />
      <Wholesale />
      <Delivery />
      <WorkExamples />
      <CustomOrder handleSendContacts={this.handleSendContacts} />

      <Footer mapPreloader={this.state.mapPreloader} />
    </Wrapper>
  }
}

export default withCookies(Main);