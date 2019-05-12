import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { withCookies, Cookies } from 'react-cookie';
import TransparentButton from '../generic/TransparentButton';
import MaterialCheckbox from './MaterialCheckbox';
import noPhotoIcon from '../icons/no-photo.svg';

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
  padding-top: 30px;
  padding-bottom: 30px;
`;

const ImgWrapper = styled.div`
  display: flex;
  height: 200px;
  max-width: 90%;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f3f4f4;
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 200px;
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
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].id === newItem.id && items[i].material === newItem.material) {
      items[i].count += newItem.count;
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
      count: 1,
      basketText: 'Добавить в корзину',
    };

    this.onClick = this.onClick.bind(this);
    this.handleAddCount = this.handleAddCount.bind(this);
    this.handleDecreaseCount = this.handleDecreaseCount.bind(this);
  }

  onClick() {
    const { count } = this.state;
    const {
      setItems,
      id,
      material,
      name,
      size,
      image,
      typeCode,
      price,
    } = this.props;
    const cookieItems = cookies.get('items');
    let items = cookieItems || [];
    items = addItem(items, {
      count,
      material,
      id,
      name,
      size,
      typeCode,
      image,
      price,
    });
    cookies.set('items', items, { path: '/' });
    setItems(items);
    ym(48164057, 'reachGoal', 'basket');
    this.setState({ basketText: `Добавлено ${count} шт.!` });
    setTimeout(() => {
      this.setState({ basketText: 'Добавить в корзину' });
    }, 1500);
  }

  handleAddCount() {
    this.setState(prevState => ({ count: prevState.count + 1 }));
  }

  handleDecreaseCount() {
    this.setState(prevState => ({ count: prevState.count - 1 || 1 }));
  }

  render() {
    const { count, basketText } = this.state;
    const {
      id,
      name,
      size,
      material,
      image,
      url,
      price,
    } = this.props;
    return (
      <WrapperLink to={`/product/${url || id}`}>
        <CardWrapper>
          <ImgWrapper>
            <Img src={image || noPhotoIcon} />
          </ImgWrapper>
          <Details>
            <Name>
              {`${name} ${size} мм`}
            </Name>
            <Materials>
              <MaterialCheckbox
                count={count}
                handleAddCount={this.handleAddCount}
                handleDecreaseCount={this.handleDecreaseCount}
                id={id}
                material={material}
                price={price}
              />
            </Materials>
            <ButtonWrapper>
              <StyledTransparentButton onClick={this.onClick}>
                {basketText}
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
