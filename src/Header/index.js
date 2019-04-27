import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import basketIcon from './basket-icon.svg';
import basketWhiteIcon from './basket-white-icon.svg';
import logo from './donishki-inline-color-logo.svg';
import phoneIcon from './phoneIcon.svg';

const Wrapper = styled.div`
  background: rgba(256, 256, 256, 0.9);
  width: 100%;
  position: fixed;
  z-index: 2;
`;

const Menu = styled.div`
  padding: 10px;
  max-width: 967px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WrapLogo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  height: 20px;
  @media (min-width: 768px) {
    height: 25px;
  }
`;

const BasketIcon = styled.img`
  height: 20px;
  padding-left: 10px;
`;

const BasketWrapper = styled(Link)`
  text-decoration: none;
  color: ${({ isEmptyBasket }) => (isEmptyBasket ? '#4a4a4a' : '#fff')};
  font-family: 'Roboto-Light', sans-serif;
  font-size: 12px;
  background-color: ${({ isEmptyBasket }) => (isEmptyBasket ? '#eee' : '#59cb78')};
  padding: 5px;
  border-radius: 15px;
  display: ${({ hide }) => (hide ? 'none' : 'flex')};
  align-items: center;
`;

const Substrate = styled.div`
  height: 50px;
`;

const BasketText = styled.span`
  display: inline-block;
  padding: 0px 5px 0px 5px;
  white-space: nowrap;
  @media (min-width: 768px) {
    padding: 0px 10px 0px 10px;
  }
`;

const PhoneBlock = styled.div`
  margin: 0;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Phone = styled.a`
  text-decoration: none;
  color: #4a4a4a;
  font-family: 'Roboto-Light', sans-serif;
  line-height: 10px;
`;

const PhoneNumber = styled.a`
  display: none;
  @media (min-width: 768px) {
    display: block;
    text-decoration: none;
    color: #4a4a4a;
    font-family: 'Roboto-Light', sans-serif;
    line-height: 10px;
  }
`;

const PhoneIcon = styled.img`
  width: 22px;
  margin-right: 20px;
  @media (min-width: 768px) {
    width: 16px;
    margin-right: 5px;
  }
`;

const CatalogLinksBlock = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const CatalogLink = styled(Link)`
  margin-left: 20px;
  color: #4a4a4a;
  text-decoration: none;
  font-family: 'Roboto-Light', sans-serif;
  font-size: 14px;
  border-bottom: 1px solid #4a4a4a;
`;

export default class extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const price = this.props.items
      && this.props.items.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0);

    const quantity = this.props.items
      && this.props.items.reduce((accumulator, item) => accumulator + item.quantity, 0);

    return (
      <div>
        <Wrapper>
          <Menu>
            <WrapLogo>
              <Link to="/">
                <Logo src={logo} />
              </Link>
              <CatalogLinksBlock>
                <CatalogLink to="/catalog">Каталог (розница)</CatalogLink>
                <CatalogLink to="/wholesaleprice">Оптовый прайс </CatalogLink>
              </CatalogLinksBlock>
            </WrapLogo>
            <PhoneBlock>
              <Phone href="tel:+79030069990">
                <PhoneIcon src={phoneIcon} />
              </Phone>
              <PhoneNumber href="tel:+79030069990">+7 (903) 006-99-90</PhoneNumber>
            </PhoneBlock>

            <BasketWrapper hide={this.props.hide} isEmptyBasket={!quantity} to="/basket">
              <BasketIcon src={quantity ? basketWhiteIcon : basketIcon} />
              <BasketText>{quantity ? `${quantity} шт - ${price} ₽` : 'Корзина пуста'}</BasketText>
            </BasketWrapper>
          </Menu>
        </Wrapper>
        <Substrate />
      </div>
    );
  }
}
