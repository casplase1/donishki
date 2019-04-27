import React, { Component } from 'react';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PriceList from './priceList';
import SummaryTable from './summaryTable';
import PopUpForm from './popUp';
import HeaderImage from './header-image.jpg';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 967px;
`;

const HeaderBlock = styled.div`
  display: flex;
  height: 150px;
  margin: 30px 0;
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

const StyledFormControl = styled(FormControl)`
  width: 120px;
  margin: 30px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedProducts: [],
      datasummary: {},
      popForm: false,
      currentmaterial: 'plywood',
      choosedItems: [],
      products: [],
    };
  }

  async componentDidMount() {
    await this.load();
    this.addSortedproducts();
  }

  load = async () => {
    await fetch('/api/products')
      .then(response => response.json())
      .then((products) => {
        this.setState({ products });
      });
  };

  addSortedproducts = () => {
    const { products } = this.state;
    const sortedProducts = this.sortGroups(products);
    this.setState({ sortedProducts });
  };

  sortGroups = (products) => {
    const sortedGroups = products.reduce((accumulator, product) => {
      const groupIndex = accumulator.findIndex(el => el.groupName === product.group);
      if (groupIndex === -1) {
        accumulator.push({
          groupName: product.group,
          sizes: [product.size],
          types: [product],
        });
      } else {
        const group = accumulator[groupIndex];
        // debugger;
        group.types.push(product);
        if (group.sizes.indexOf(product.size) === -1) group.sizes.push(product.size);
      }
      return accumulator;
    }, []);

    for (let i = 0; i < sortedGroups.length; i += 1) {
      sortedGroups[i].types = sortedGroups[i].types.reduce((accumulator, product) => {
        const typeIndex = accumulator.findIndex(el => el.typeCode === product.typeCode);
        if (typeIndex === -1) {
          accumulator.push({
            name: product.name,
            typeCode: product.typeCode,
            material: product.material,
            image: product.images[0],
            items: [
              {
                id: Number(product.id),
                size: product.size,
                price: product.price,
                count: 0,
              },
            ],
          });
        } else {
          const type = accumulator[typeIndex];
          type.items.push({
            id: Number(product.id),
            size: product.size,
            price: product.price,
            count: 0,
          });
        }

        return accumulator;
      }, []);
    }

    return sortedGroups;
  };

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

  handleChange = (event) => {
    this.setState({ currentmaterial: event.target.value });
  };

  choosenItems = (choosedId, value) => {
    const { choosedItems, products } = this.state;
    const copyChoosedItems = choosedItems;
    const product = products.find(item => item.id === choosedId.toString());
    product.count = value;
    const index = choosedItems.findIndex(item => item.id === choosedId.toString());
    if (index < 0) {
      copyChoosedItems.push(product);
    } else if (value === 0) {
      copyChoosedItems.splice(index, 1);
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
      copyChoosedItems[index] = product;
    }
    this.setState({ choosedItems: copyChoosedItems });
  };

  handleChangeItemsCount = (groupName, typeCode, id, value) => {
    const { sortedProducts } = this.state;
    const groupIndex = sortedProducts.findIndex(obj => obj.groupName === groupName);
    const typeIndex = sortedProducts[groupIndex].types.findIndex(obj => obj.typeCode === typeCode);
    const itemIndex = sortedProducts[groupIndex].types[typeIndex].items.findIndex(
      obj => obj.id === id,
    );
    sortedProducts[groupIndex].types[typeIndex].items[itemIndex].count = value;
    this.choosenItems(id, value);
    this.setState({
      sortedProducts,
    });
  };

  sendOrder = (phone, name, email) => {
    const { choosedItems } = this.state;
    const items = choosedItems;
    fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        items,
        name,
        phone,
        email,
      }),
    })
      .then(async (data) => {
        const response = await data.json();
        console.log(response);
      })
      .catch((/* error */) => {});
  };

  render() {
    const {
      sortedProducts, datasummary, popForm, currentmaterial, choosedItems,
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
        <StyledFormControl>
          <InputLabel>Материал</InputLabel>
          <Select native value={currentmaterial} onChange={this.handleChange}>
            <option value="plywood">Фанера</option>
            <option value="mdf">МДФ</option>
            <option value="plexiglas">Оргстекло</option>
          </Select>
        </StyledFormControl>
        <PriceList
          data={sortedProducts}
          handleChangeItemsCount={this.handleChangeItemsCount}
          setSummary={this.setSummary}
          currentmaterial={currentmaterial}
        />
        <SummaryTable
          calcMaterialSummary={this.calcMaterialSummary}
          datasummary={datasummary}
          calcSummary={this.calcSummary}
        />
        <ButtonWrap>
          <Button onClick={choosedItems.length > 0 ? this.popUpOpen : null}>
            {choosedItems.length > 0 ? 'Заказать' : 'Ничего на выбрано'}
          </Button>
        </ButtonWrap>
        <PopUpForm popForm={popForm} closePopForm={this.popUpClose} sendOrder={this.sendOrder} />
      </Wrapper>
    );
  }
}
