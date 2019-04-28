import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import SimpleStorage from 'react-simple-storage';
import logo from '../icons/donishki-color-black-logo.svg';
import noPhotoIcon from '../icons/no-photo.svg';

const StyledLink = styled(Link)`
  color: black;
`;

const Icon = styled.img`
  width: 30px;
`;

const Wrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-top: 40px;
`;

const Header = styled.div`
  padding-bottom: 30px;
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 80px;
  display: block;
  padding-right: 50px;
`;

const FilterWrapper = styled.div`
  display: inline-block;
  padding-left: 25px; 
`;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      filteredProducts: [],
      sizes: [],
      filters: {
        material: 'plywood',
        groupName: null,
        size: null,
      },
    };
  }

  componentWillMount() {
    fetch('/api/products', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }).then(async (response) => {
      const responseData = await response.json();
      // const { filters } = this.state;
      // const filteredProducts = responseData.filter(
      //   product => (product.material === filters.material),
      // );

      const sizes = responseData.reduce(
        (accumulator, product) => {
          accumulator.push(product.size);
          return accumulator;
        }, [],
      );

      this.setState({
        products: responseData,
        // filteredProducts,
        sizes: [...new Set(sizes)],
      }, () => {
        this.filterOutProducts();
      });

      console.log(this.state);
    }).catch((e) => {
      console.log(e);
    });
  }

  handleChangeFilter = () => (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [name]: value,
      },
    }), () => (this.filterOutProducts()));
  };

  filterOutProducts = () => {
    const { products, filters } = this.state;
    const filteredProducts = products.filter(product => (
      (!filters.material || filters.material === product.material)
      && (!filters.size || filters.size === product.size)
      && (!filters.groupName || filters.groupName === product.groupName)
    ));

    this.setState(prevState => ({
      filteredProducts,
    }), () => (console.log(this.state)));
  };

  render() {
    const { sizes, filteredProducts, filters } = this.state;

    return (
      <Wrapper>
        <SimpleStorage parent={this} />
        <Header>
          <Link to="/">
            <Logo src={logo} />
          </Link>
          <Button
            component={Link}
            to={{
              pathname: '/admin/product',
              state: {
                material: filters.material,
                groupName: filters.groupName,
              },
            }}
            variant="contained"
            color="primary"
          >
            Добавить
          </Button>
          <FilterWrapper>
            <Select
              native
              onChange={this.handleChangeFilter()}
              name="material"
              value={filters.material}
            >
              <option value="plywood">Фанера</option>
              <option value="mdf">МДФ</option>
              <option value="colored">Цветные</option>
              <option value="plexiglass">Оргстекло</option>
              <option value="acrylic_black">Акрил черный матовый</option>
              <option value="acrylic_silver">Акрил серебряный</option>
              <option value="acrylic_gold">Акрил золотой</option>
            </Select>
          </FilterWrapper>
          <FilterWrapper>
            <Select
              native
              onChange={this.handleChangeFilter()}
              name="groupName"
              value={filters.groupName}
            >
              <option value="" />
              <option value="circle">Круг</option>
              <option value="square">Квадрат</option>
              <option value="rectangle">Прямоугольник</option>
              <option value="oval">Овал</option>
              <option value="form">Форма</option>
            </Select>
          </FilterWrapper>
          <FilterWrapper>
            <Select
              native
              onChange={this.handleChangeFilter()}
              name="size"
              value={filters.size}
            >
              <option value="" />
              {sizes.map(size => (<option value={size}>{size}</option>))}
            </Select>
          </FilterWrapper>
        </Header>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Название</TableCell>
              <TableCell>Артикул</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Размер</TableCell>
              <TableCell>Резной</TableCell>
              <TableCell>Цена</TableCell>
              <TableCell>Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map(item => (
              <TableRow>
                <TableCell>
                  <StyledLink to={`/admin/product/${item.id}`}>{item.name || '---'}</StyledLink>
                </TableCell>
                <TableCell>{item.type_code}</TableCell>
                <TableCell>
                  <Icon src={item.icon || noPhotoIcon} alt="" />
                </TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.is_carved ? 'Да' : 'Нет'}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.order}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
    );
  }
}
