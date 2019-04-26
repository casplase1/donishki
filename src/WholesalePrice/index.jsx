import React, { Component } from 'react';
import styled from 'styled-components';
import PriceList from './priceList';
import price from './data';
import SummaryTable from './summaryTable';
import PopUpForm from './popUp';
import PopUpFeedback from '../Main/Popup';
import HeaderImage from './header-image.jpg';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  margin: 0 auto;
  max-width: 967px;
`;

const HeaderBlock = styled.div`
  display: flex;
  height: 150px;
  margin-top: 30px;
  font-family: 'Roboto', sans-serif;
`;

const Image = styled.img`
  width: 30%;
`;

const ButtonWrap = styled.div`
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #3b3b3b;
  color: #fff;
  cursor: pointer;
  border: solid 1px #fff;
  border-radius: 20px;
  font-family: 'Roboto-Light', sans-serif;
  font-size: 16px;
  padding: 10px 25px;
`;

const HeaderText = styled.div`
  width: 50%;
  padding: 10px;
  & ol {
    margin: 0;
    padding: 0 0 0 10px;
  }
  & li {
    margin: 0;
    padding: 0;
    font-size: 11px;
  }
`;

const Text = styled.h3`
  margin: 0;
  font-size: 14px;
`;

const Span = styled.span`
  font-size: 12px;
`;

const Redspan = styled.span`
  color: red;
  font-size: 12px;
  font-weight: bolder;
`;

const Requisites = styled.div`
  width: 30%;
  padding: 10px;
  border-left: 2px solid #000;
`;

const RequisitesHeader = styled.h3`
  font-size: 14px;
  margin: 0;
`;

const RequisitesText = styled.h4`
  padding: 5px;
  margin: 0;
  font-size: 10px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: price,
      datasummary: {},
      popForm: false,
      popFeedback: false,
    };
  }

  calcMaterialSummary = (material) => {
    let sum = 0;
    const { datasummary } = this.state;
    for (const id in datasummary[material]) {
      sum += datasummary[material][id];
    }
    return sum;
  };

  calcSummary = () => {
    const { datasummary } = this.state;
    const materials = Object.getOwnPropertyNames(datasummary);
    const sumArray = materials.map(material => this.calcMaterialSummary(material));
    if (sumArray.length > 0) {
      return sumArray.reduce((index, a) => index + a);
    }
    return 0;
  };

  setSummary = (material, id, sum) => {
    this.setState(prevState => ({
      datasummary: {
        ...prevState.datasummary,
        [material]: { ...prevState.datasummary[material], [id]: sum },
      },
    }));
  };

  popUpOpen = () => {
    this.setState({ popForm: true });
  };

  popUpClose = () => {
    this.setState({ popForm: false });
  };

  componentDidMount() {
    this.load();
  }

  load = async () => {
    await fetch('/api/products')
      .then(response => response.json())
      .then((products) => {
        console.log(products);
        // this.setState({ products });
      });
    // this.sortPrice();
  };

  /* sortGroups = () => products.reduce((accumulator, product) => {
    const groupIndex = accumulator.findIndex(el => el.group === product.group);
    if (groupIndex < 0) {
      accumulator.push({
        group: product.group,
        sizes: [product.size],
        types: [product],
      });
    } else {
      const group = accumulator[groupIndex];
      group.types.push(product);
      if (group.sizes.indexOf(product.size) === -1) group.sizes.push(product.size);
    }
    return accumulator;
  }, []); */

  handleChangeItemsCount = (groupName, typeCode, id, value) => {
    const { data } = this.state;
    const groupIndex = data.findIndex(obj => obj.groupName === groupName);
    const typeIndex = data[groupIndex].types.findIndex(obj => obj.typeCode === typeCode);
    const itemIndex = data[groupIndex].types[typeIndex].items.findIndex(obj => obj.id === id);
    data[groupIndex].types[typeIndex].items[itemIndex].count = value;

    this.setState({
      data,
    });
  };

  render() {
    const {
      data, datasummary, popForm, popFeedback,
    } = this.state;
    return (
      <Wrapper>
        <HeaderBlock>
          <Image src={HeaderImage} />
          <HeaderText>
            <Text>Телефон: +7 (985) 973-07-39</Text>
            <Text>Почта: info@casplase.ru</Text>
            <Text>Сайт: https://nagravirovku.ru</Text>
            <Span>
              Возможно изготовление донышек
              {' '}
              <Redspan>любых форм и размеров </Redspan>
              {' на заказ '}
            </Span>
            <ol>
              <li>
                Стоимость указана
                {' '}
                <Redspan>при общей закупке товара на сумму от 6300 руб</Redspan>
              </li>
              <li>
                При заказе на сумму более
                <Redspan>12000</Redspan>
                {' '}
                {' рублей доставка транспортной '}
                компанией до терминала в вашем городе или курьером по городу Москва
                {' '}
                <Redspan>Бесплатно.</Redspan>
              </li>
              <li>Все заказы из фанеры проходят процесс шлифовки.</li>
            </ol>
          </HeaderText>
          <Requisites>
            <RequisitesHeader>Реквизиты для заказа:</RequisitesHeader>
            <RequisitesText>
              ИП Панченко Андрей Дмитриевич
              {' '}
              <br />
              {'ОГРНИИП 318774600098068 '}
              <br />
              {'ИНН 771386120991 '}
              <br />
              {'Банк МОСКОВСКИЙ ФИЛИАЛ '}
              <br />
              {'АО КБ "МОДУЛЬБАНК"'}
              <br />
              БИК 044525092
              <br />
              К/с 30101810645250000092
              <br />
              {'Счет 40802810870010072151 '}
            </RequisitesText>
          </Requisites>
        </HeaderBlock>
        <PriceList
          data={data}
          handleChangeItemsCount={this.handleChangeItemsCount}
          setSummary={this.setSummary}
        />
        <SummaryTable
          calcMaterialSummary={this.calcMaterialSummary}
          datasummary={datasummary}
          calcSummary={this.calcSummary}
        />
        <ButtonWrap>
          <Button onClick={this.popUpOpen}>Заказать</Button>
        </ButtonWrap>
        <PopUpForm popForm={popForm} closePopForm={this.popUpClose} />
        <PopUpFeedback isOpened={popFeedback} />
      </Wrapper>
    );
  }
}
