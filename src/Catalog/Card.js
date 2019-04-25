import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import TransparentButton from '../generic/TransparentButton';
import MaterialCheckbox from './MaterialCheckbox';
import materials from '../constant/materials';

const cookies = new Cookies();

const WrapperLink = styled.span`
  text-decoration: none;
  color: #4a4a4a;
`;

const CardWrapper = styled.div`
  background-color: #ffffff;
  box-shadow: 0 7px 15px 0 rgba(1, 1, 1, 0.1);
  margin-bottom: 30px;
  border-radius: 4px;
  cursor: pointer;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const Img = styled.img`
  width: 90%;
  display: block;
  margin: 0 auto;
`;

const Details = styled.div`
  padding: 0 5px;
  padding-top: 10px;

  @media (min-width: 768px) {
    padding: 0 10px;
    padding-top: 20px;
  }
`;

const Name = styled.div`
  padding-left: 5px;
  white-space: nowrap;
  font-family: 'Roboto', sans-serif;
  font-weight: bold;

  font-size: 12px;

  @media (min-width: 768px) {
    padding-left: 10px;
    font-size: 16px;
  }
`;

const Materials = styled.div`
  padding: 10px 0;
  font-size: 12px;

  @media (min-width: 768px) {
    font-size: 14px;
  }
`;

const ButtonWrapper = styled.div`
  text-align: center;
  padding-top: 5px;
  font-size: 12px;

  @media (min-width: 768px) {
    padding: 0 10px;
    font-size: 16px;
  }
`;

const ToBasketLink = styled(Link)`
  font-size: 14px;
  padding-top: 10px;
  display: block;
  color: #4a4a4a;
  font-family: 'Roboto-Light', sans-serif;
`;

const StyledTransparentButton = styled(TransparentButton)`
  width: 100%;
`;

const addItem = (items, newItem) => {
  // for the case if the basket already has such an item
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === newItem.id && items[i].material === newItem.material) {
      items[i].quantity += newItem.quantity;
      return items;
    }
  }
  // if not, push it
  items.push(newItem);
  return items;
};

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
      material: 'plywood',
      basketText: 'Добавить в корзину',
    };

    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
  }

  handleChange(e) {
    this.setState({
      material: e.target.value,
    });
  }

  onClick() {
    const cookieItems = cookies.get('items');
    let items = cookieItems || [];
    items = addItem(items, {
      quantity: this.state.quantity,
      material: this.state.material,
      id: this.props.id,
      name: this.props.name,
      size: this.props.size,
      image: this.props.image,
      price: this.props.prices[this.state.material],
    });
    cookies.set('items', items, { path: '/' });
    this.props.setItems(items);
    this.setState({ basketText: `Добавлено ${this.state.quantity} шт.!` });
    setTimeout(() => {
      this.setState({ basketText: 'Добавить в корзину' });
    }, 1500);
  }

  handleAddQuantity() {
    this.setState(prevState => ({ quantity: ++prevState.quantity }));
  }

  handleDecreaseQuantity() {
    this.setState(prevState => ({ quantity: --prevState.quantity || 1 }));
  }

  render() {
    return (
      <WrapperLink to={`/product/${this.props.url ? `${this.props.url}` : `${this.props.id}`}`}>
        <CardWrapper>
          <Img src={this.props.image} />
          <Details>
            <Name>
              {this.props.name}
              {' '}
              {this.props.size}
              {'см '}
            </Name>
            <Materials>
              <MaterialCheckbox
                quantity={this.state.quantity}
                handleAddQuantity={this.handleAddQuantity}
                handleDecreaseQuantity={this.handleDecreaseQuantity}
                id={this.props.id}
                onChange={this.handleChange}
                material={this.props.material}
                prices={this.props.prices}
              />
            </Materials>
            <ButtonWrapper>
              <StyledTransparentButton onClick={this.onClick}>
                {this.state.basketText}
              </StyledTransparentButton>
              <ToBasketLink to="/basket">Перейти в корзину</ToBasketLink>
            </ButtonWrapper>
          </Details>
        </CardWrapper>
      </WrapperLink>
    );
  }
}

export default withCookies(Card);
