import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { withCookies, Cookies } from 'react-cookie';
import BasketItem from './BasketItem';
import TextInput from '../generic/TextInput';
import GhostButton from '../generic/GhostButton';
import PhoneInput from '../generic/PhoneInput';
import Header from '../Header';
import Footer from '../Footer';
import Popup from '../Main/Popup';
import validatePhone from '../functions/validatePhone';

const Wrapper = styled.div`
  background-color: #f5f5f6;
`;

const BasketContent = styled.div`
  padding-bottom: 50px;

  @media (min-width: 768px) {
    padding-bottom: 150px;
    margin: 0 auto;
    max-width: 967px;
  }
`;

const BasketWrapper = styled.div``;

const Items = styled.div`
  padding-top: 15px;
`;

const Total = styled.div``;

const TableHeader = styled.div`
  text-align: center;
  border-radius: 5px;
  font-family: 'Roboto-Bold', sans-serif;
  background-color: #ebebeb;
  padding: 10px;
  padding: 10px;
  font-size: 16px;
`;

const BasketRowWrapper = styled.div`
  margin: 0 15px;
`;

const ColValue = styled.div`
  // padding-left: 20px;
`;

const H1 = styled.h1`
  font-family: 'Roboto-Light', sans-serif;
  text-align: left;
  font-size: 24px;
  padding: 0 15px;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const Form = styled.form`
  background-color: #fff;
  padding: 20px 30px;
`;

const TotalValue = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputName = styled.div`
  font-size: 14px;
  color: #4a4a4a;
  text-align: left;
  padding: 10px 20px;
`;

const Label = styled.label`
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const Description = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  margin-bottom: 0;
`;

const removeItem = (items, id, material) => {
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].id === id && items[i].material === material) {
      items.splice(i, 1);
    }
  }
  return items;
};

class Basket extends Component {
  constructor(props) {
    super(props);

    const { cookies: propsCookies } = this.props;

    this.cookies = propsCookies || new Cookies();

    this.state = {
      items: this.cookies.get('items'),
      isPopupOpened: false,
    };

    this.sendOrder = this.sendOrder.bind(this);
    this.handleClosePopup = this.handleClosePopup.bind(this);
    this.handleChangeForm = this.handleChangeForm.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddCount = this.handleAddCount.bind(this);
    this.handleDecreaseCount = this.handleDecreaseCount.bind(this);
  }

  handleRemoveItem(id, material) {
    const cookieItems = this.cookies.get('items');
    let items = cookieItems || [];
    items = removeItem(items, id, material);
    this.cookies.set('items', items, { path: '/' });
    this.setState({ items });
  }

  handleAddCount(id, material) {
    const cookieItems = this.cookies.get('items');
    const items = cookieItems || [];
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].id === id && items[i].material === material) {
        items[i].count++;
      }
    }
    this.cookies.set('items', items, { path: '/' });
    this.setState({ items });
  }

  handleDecreaseCount(id, material) {
    const cookieItems = this.cookies.get('items');
    const items = cookieItems || [];
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].id === id && items[i].material === material) {
        items[i].count !== 1 && items[i].count--;
      }
    }
    this.cookies.set('items', items, { path: '/' });
    this.setState({ items });
  }

  handleChangeForm(e) {
    const state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  handleClosePopup() {
    this.setState({
      isPopupOpened: false,
    });
  }

  sendOrder(items, phone, name) {
    ym(48164057, 'reachGoal', 'order');
    fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ items, name, phone }),
    })
      .then(async (data) => {
        const response = await data.json();
        if (response.status) {
          this.setState({
            isPopupOpened: true,
          });
        }
      })
      .catch((/* error */) => {
        this.setState({
          isPopupOpened: true,
        });
      });
  }

  render() {
    const {
      isPopupOpened,
      items,
      phone,
      name,
    } = this.state;
    return (
      <Wrapper>
        <Popup isOpened={isPopupOpened} handleClose={this.handleClosePopup} />
        <Header items={items} />
        <BasketContent>
          <H1>Корзина</H1>

          <BasketRowWrapper>
            <Row>
              <Col xs={12} sm={12} md={8} lg={8}>
                <BasketWrapper>
                  <TableHeader>
                    <Row>
                      <Col xs={8} sm={8} md={6} lg={6}>
                        <ColValue>Товар</ColValue>
                      </Col>
                      <Col className="hidden-xs hidden-sm" xs={3} sm={3} md={3} lg={3}>
                        <ColValue>Кол-во</ColValue>
                      </Col>
                      <Col xs={4} sm={4} md={3} lg={3}>
                        <ColValue>Сумма</ColValue>
                      </Col>
                    </Row>
                  </TableHeader>
                  <Items>
                    {items && items.map(item => (
                      <BasketItem
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        material={item.material}
                        size={item.size}
                        price={item.price}
                        count={item.count}
                        handleRemoveItem={this.handleRemoveItem}
                        handleAddCount={this.handleAddCount}
                        handleDecreaseCount={this.handleDecreaseCount}
                      />
                    ))}
                  </Items>
                </BasketWrapper>
              </Col>
              <Col xs={12} sm={12} md={4} lg={4}>
                <Total>
                  <TableHeader>
                    <ColValue>Итого</ColValue>
                  </TableHeader>
                </Total>
                <Form>
                  <TotalValue>
                    <div>Итого:</div>
                    <div>
                      <span>
                        {items && items.reduce(
                          (accumulator, item) => accumulator + item.count * item.price,
                          0,
                        )}
                      </span>
                      {' '}
                      ₽
                    </div>
                  </TotalValue>
                  <hr color="LightGray" size="1" />
                  <Label>
                    <InputName>Ваше имя</InputName>
                    <TextInput
                      placeholder="Ваше имя"
                      name="name"
                      onChange={this.handleChangeForm}
                    />
                  </Label>
                  <Label>
                    <InputName>Ваш телефон</InputName>
                    <PhoneInput
                      mask="+7 (999) 999-99-99"
                      placeholder="+7"
                      name="phone"
                      onChange={this.handleChangeForm}
                    />
                  </Label>
                  <Description>
                    Наш оператор свяжется с вами, чтобы уточнить все детали заказа
                  </Description>
                  <ButtonWrapper>
                    <GhostButton
                      onClick={(e) => {
                        e.preventDefault();
                        if (phone && validatePhone(phone)) {
                          this.sendOrder(items, phone, name);
                        }
                      }}
                    >
                      Отправить заказ
                    </GhostButton>
                  </ButtonWrapper>
                </Form>
              </Col>
            </Row>
          </BasketRowWrapper>
        </BasketContent>
        <Footer />
      </Wrapper>
    );
  }
}

export default withCookies(Basket);
