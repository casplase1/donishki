import React, { Component } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PriceList from './PriceList';
import SummaryTable from './SummaryTable';
import PopUpForm from './PopUp/PopUp';
import Header from './Header';

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 967px;
`;

const H3 = styled.h3`
  font-family: 'Roboto', sans-serif;
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

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
  margin: 30px;
`;

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedProducts: [],
      dataSummary: {},
      isPopUpOpen: false,
      currentMaterial: 'plywood',
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
      // тк при большом разнообразии донышек в группе "Формы" создается слишком много колонок
      const groupName = product.groupName === 'form' ? product.typeCode : product.groupName;
      const groupIndex = accumulator.findIndex(
        el => el.groupName === groupName && el.material === product.material,
      );
      if (groupIndex === -1) {
        accumulator.push({
          groupName,
          sizes: [product.size],
          material: product.material,
          types: [product],
        });
      } else {
        const group = accumulator[groupIndex];
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
            image: product.icon,
            items: [
              {
                id: Number(product.id),
                size: product.size,
                price: product.wholesalePrice,
                count: 0,
              },
            ],
          });
        } else {
          accumulator[typeIndex].items.push({
            id: Number(product.id),
            size: product.size,
            price: product.wholesalePrice,
            count: 0,
          });
        }

        return accumulator;
      }, []);
    }

    return sortedGroups;
  };

  filterGroupsByMaterial = () => {
    const { sortedProducts, currentMaterial } = this.state;
    return sortedProducts.filter(group => group.material === currentMaterial);
  };

  calcMaterialSummary = (material) => {
    let sum = 0;
    const { dataSummary } = this.state;
    for (const id in dataSummary[material]) {
      sum += dataSummary[material][id];
    }
    return sum;
  };

  calcSummary = () => {
    const { dataSummary } = this.state;
    const materials = Object.getOwnPropertyNames(dataSummary);
    const sumArray = materials.map(material => this.calcMaterialSummary(material));
    if (sumArray.length > 0) {
      return sumArray.reduce((index, a) => index + a);
    }
    return 0;
  };

  setSummary = (material, id, sum) => {
    this.setState(prevState => ({
      dataSummary: {
        ...prevState.dataSummary,
        [material]: { ...prevState.dataSummary[material], [id]: sum },
      },
    }));
  };

  openPopUp = () => {
    this.setState({ isPopUpOpen: true });
  };

  closePopUp = () => {
    this.setState({ isPopUpOpen: false });
  };

  handleChange = (event) => {
    this.setState({ currentMaterial: event.target.value });
  };

  getChosenProducts = (chosedId, value) => {
    const { choosedItems, products } = this.state;
    const product = products.find(item => item.id === chosedId);
    product.count = value;
    const index = choosedItems.findIndex(item => item.id === chosedId);
    if (index < 0) {
      choosedItems.push(product);
    } else if (value === 0) {
      choosedItems.splice(index, 1);
    } else {
      choosedItems[index] = product;
    }
    this.setState({ choosedItems });
  };

  handleChangeItemsCount = (groupName, typeCode, id, value, material) => {
    const { sortedProducts } = this.state;
    const groupIndex = sortedProducts.findIndex(
      obj => obj.groupName === groupName && obj.material === material,
    );
    const typeIndex = sortedProducts[groupIndex].types.findIndex(obj => obj.typeCode === typeCode);
    const itemIndex = sortedProducts[groupIndex].types[typeIndex].items.findIndex(
      obj => obj.id === id,
    );
    sortedProducts[groupIndex].types[typeIndex].items[itemIndex].count = value;
    this.getChosenProducts(id, value);
    this.setState({
      sortedProducts,
    });
  };

  sendOrder = (phone, name, email) => {
    ym(48164057, 'reachGoal', 'wholesale_order');
    const { choosedItems } = this.state;
    fetch('/api/wholesale-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        items: choosedItems,
        name,
        phone,
        email,
      }),
    })
      .then(async (
      // data
      ) => {
        // const response = await data.json();
        // console.log(response);
      })
      .catch((/* error */) => {});
  };

  render() {
    const sortedProducts = this.filterGroupsByMaterial();
    const {
      dataSummary, isPopUpOpen, currentMaterial, choosedItems,
    } = this.state;
    return (
      <Wrapper>
        <Helmet>
          <title>Оптовый каталог донышек | Донышки заказать оптом</title>
          <meta name="viewport" content="width=1024" />
        </Helmet>
        <Header />
        <H3>Выберите материал:</H3>
        <StyledFormControl>
          <InputLabel>Материал</InputLabel>
          <Select native value={currentMaterial} onChange={this.handleChange}>
            <option value="plywood">Фанера</option>
            <option value="mdf">МДФ</option>
            <option value="colored">Цветные</option>
            <option value="plexiglas">Оргстекло</option>
            <option value="acrylic_black">Акрил черный матовый</option>
            <option value="acrylic_silver">Акрил серебряный</option>
            <option value="acrylic_gold">Акрил золотой</option>
          </Select>
        </StyledFormControl>
        <H3>Выберите донышки:</H3>
        <PriceList
          data={sortedProducts}
          handleChangeItemsCount={this.handleChangeItemsCount}
          setSummary={this.setSummary}
          currentMaterial={currentMaterial}
        />
        <SummaryTable
          calcMaterialSummary={this.calcMaterialSummary}
          dataSummary={dataSummary}
          calcSummary={this.calcSummary}
        />
        <ButtonWrap>
          <Button onClick={choosedItems.length > 0 ? this.openPopUp : null}>
            {choosedItems.length > 0 ? 'Заказать' : 'Ничего на выбрано'}
          </Button>
        </ButtonWrap>
        <PopUpForm
          isPopUpOpen={isPopUpOpen}
          closePopUp={this.closePopUp}
          sendOrder={this.sendOrder}
        />
      </Wrapper>
    );
  }
}
