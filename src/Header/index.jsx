import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import basketIcon from './basket-icon.svg';
import basketWhiteIcon from './basket-white-icon.svg';
import logo from '../icons/donishki-inline-color-logo.svg';
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
  display: flex;
  align-items: center;
`;

const Substrate = styled.div`
  height: ${({ isPriceMenuEnabled }) => (isPriceMenuEnabled ? 'auto' : '50px')};
  @media (min-width: 768px) {
    height: 50px;
  }
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

const CatalogLinksDesktopWrapper = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: flex;
    align-items: center;
  }
`;

const CatalogLinksMobileWrapper = styled.div`
  padding: 50px 40px 8px 20px;
  display: ${({ isPriceMenuEnabled }) => (isPriceMenuEnabled ? 'flex' : 'none')};
  align-items: center;
  justify-content: space-around;
  @media (min-width: 768px) {
    display: none;
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

const CatalogLinks = () => (
  <>
    <CatalogLink to="/catalog">Каталог (розница)</CatalogLink>
    <CatalogLink to="/opt">Оптовый прайс </CatalogLink>
  </>
);

export default ({ items, isPriceMenuEnabled }) => {
  const price = items && items.reduce(
    (accumulator, item) => accumulator + item.count * item.price, 0,
  );
  const count = items && items.reduce((accumulator, item) => accumulator + item.count, 0);

  return (
    <div>
      <Wrapper>
        <Menu>
          <WrapLogo>
            <Link to="/">
              <Logo src={logo} />
            </Link>
            <CatalogLinksDesktopWrapper>
              <CatalogLinks />
            </CatalogLinksDesktopWrapper>
          </WrapLogo>
          <PhoneBlock>
            <Phone href="tel:+79859730739">
              <PhoneIcon src={phoneIcon} />
            </Phone>
            <PhoneNumber href="tel:+79859730739">+7 (985) 973-07-39</PhoneNumber>
          </PhoneBlock>
          <BasketWrapper isEmptyBasket={!count} to="/basket">
            <BasketIcon src={count ? basketWhiteIcon : basketIcon} />
            <BasketText>{count ? `${count} шт - ${price} ₽` : 'Корзина пуста'}</BasketText>
          </BasketWrapper>
        </Menu>
      </Wrapper>
      <Substrate isPriceMenuEnabled={isPriceMenuEnabled}>
        <CatalogLinksMobileWrapper isPriceMenuEnabled={isPriceMenuEnabled}>
          <CatalogLinks />
        </CatalogLinksMobileWrapper>
      </Substrate>
    </div>
  );
};
