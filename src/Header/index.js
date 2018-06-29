import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {withCookies, Cookies} from 'react-cookie';
import basketIcon from './basket-icon.svg';
import basketWhiteIcon from './basket-white-icon.svg';
import logo from './donishki-inline-color-logo.svg';

const cookies = new Cookies();

const Wrapper = styled.div`
  background: rgba(256,256,256,0.9);
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
`;

const Logo = styled.img`
  height: 25px;
`;

const BasketIcon = styled.img`
  height: 20px;
  padding-left: 10px;
`;

const BasketWrapper = styled(Link)`
  text-decoration: none;
  color: ${({isEmptyBasket})=>(isEmptyBasket ? '#4a4a4a' : '#fff')};
  font-family: 'Roboto-Light', sans-serif;
  font-size: 12px;
  background-color: ${({isEmptyBasket})=>(isEmptyBasket ? '#eee' : '#59cb78')};
  padding: 5px;
  border-radius: 15px;
  display: ${({hide})=>(hide ? 'none' : 'flex')};
  align-items: center;
`;

const Substrate = styled.div`
  height: 50px;
`;

const BasketText = styled.span`
  display: inline-block;
  padding: 0px 10px 0px 10px;
`;

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const price = this.props.items && this.props.items.reduce(
      (accumulator, item) => accumulator + item.quantity * item.price, 0
    );

    const quantity = this.props.items && this.props.items.reduce(
        (accumulator, item) => accumulator + item.quantity, 0
      );

    return (
      <div>
        <Wrapper>
          <Menu>
            <Link to="/">
              <Logo src={logo} />
            </Link>

            <BasketWrapper hide={this.props.hide} isEmptyBasket={!quantity} to="/basket">
              <BasketIcon src={quantity ? basketWhiteIcon : basketIcon} />
              <BasketText>
                {quantity ? `${quantity} шт - ${price} руб` : 'Корзина пуста'}
              </BasketText>
            </BasketWrapper>
          </Menu>
        </Wrapper>
        <Substrate />
      </div>
    )
  }
}

export default withCookies(Header);