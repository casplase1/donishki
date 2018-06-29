import React, { Component } from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-flexbox-grid';
import InputMask from 'react-input-mask';
import {withCookies, Cookies} from 'react-cookie';
import BasketItem from './BasketItem';
import TextInput from './../generic/TextInput';
import GhostButton from './../generic/GhostButton';
import Header from '../Header';
import Footer from './../Footer';

const cookies = new Cookies();

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

const BasketWrapper = styled.div`
  
`;

const Items = styled.div`
  padding-top: 15px;
`;

const Total = styled.div`

`;

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
 
`;

const ButtonWrapper = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const PhoneInput = styled(InputMask)`
  border: 1px solid #cccccc;
  border-radius: 20px;
  padding: 8px 15px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Lato-Regular';
  color: #4a4a4a;
`;

const removeItem = (items, id, material) => {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id && items[i].material === material) {
      items.splice(i,1);
    }
  }
  return items;
};

class Basket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: cookies.get('items')
    };

    this.handleRemoveItem = this.handleRemoveItem.bind(this);
    this.handleAddQuantity = this.handleAddQuantity.bind(this);
    this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
  }

  handleRemoveItem(id, material) {
    const cookieItems = cookies.get('items');
    let items = cookieItems || [];
    items = removeItem(items, id, material);
    cookies.set('items', items, {path: '/'});
    this.setState({items});
  }

  handleAddQuantity(id, material) {
    const cookieItems = cookies.get('items');
    let items = cookieItems || [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id && items[i].material === material) {
        items[i].quantity++;
      }
    }
    cookies.set('items', items, {path: '/'});
    this.setState({items});
  }

  handleDecreaseQuantity(id, material) {
    const cookieItems = cookies.get('items');
    let items = cookieItems || [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id && items[i].material === material) {
        (items[i].quantity !== 1) && items[i].quantity--;
      }
    }
    cookies.set('items', items, {path: '/'});
    this.setState({items});
  }

  render() {
    return (
      <Wrapper>
        <Header hide={true} />
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
                    {this.state.items && this.state.items.map(item => (
                      <BasketItem
                        id={item.id}
                        image={item.image}
                        name={item.name}
                        material={item.material}
                        size={item.size}
                        price={item.price}
                        quantity={item.quantity}
                        handleRemoveItem={this.handleRemoveItem}
                        handleAddQuantity={this.handleAddQuantity}
                        handleDecreaseQuantity={this.handleDecreaseQuantity}
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
                        {this.state.items && this.state.items.reduce(
                          (accumulator, item) => accumulator + item.quantity * item.price, 0
                        )}
                      </span> руб
                    </div>
                  </TotalValue>
                  <hr color="LightGray" size="1"/>
                  <Label>
                    <InputName>Ваше имя</InputName>
                    <TextInput placeholder="Ваше имя" name="name" onChange=""/>
                  </Label>
                  <Label>
                    <InputName>Ваш телефон</InputName>
                    <PhoneInput mask="+7 (999) 999-99-99" placeholder="+7" name="name" onChange="" />
                  </Label>
                  <ButtonWrapper>
                    <GhostButton>Отправить заказ</GhostButton>
                  </ButtonWrapper>
                </Form>
              </Col>
            </Row>
          </BasketRowWrapper>
        </BasketContent>
        <Footer />
      </Wrapper>
    )
  }
}

export default withCookies(Basket);