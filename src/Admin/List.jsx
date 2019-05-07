import React, { Component } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import InputLabel from '@material-ui/core/InputLabel';
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
      typeCodes: [],
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

      const sizes = responseData.reduce(
        (accumulator, product) => {
          accumulator.push(product.size);
          return accumulator;
        }, [],
      );

      const typeCodes = responseData.reduce(
        (accumulator, product) => {
          accumulator.push(product.typeCode);
          return accumulator;
        }, [],
      );

      this.setState({
        products: responseData,
        sizes: [...new Set(sizes)],
        typeCodes: [...new Set(typeCodes)],
      }, () => {
        this.filterOutProducts();
      });

      // console.log(this.state);
    }).catch(() => {
      // console.log(e);
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
    // console.log(this.state);

    const { products, filters } = this.state;
    const filteredProducts = products.filter(product => (
      (!filters.material || filters.material === product.material)
      && (!filters.size || filters.size === product.size)
      && (!filters.typeCode || filters.typeCode === product.typeCode)
      && (!filters.groupName || filters.groupName === product.groupName)
    ));

    this.setState({
      filteredProducts,
    });
  };

  render() {
    const {
      sizes,
      typeCodes,
      filteredProducts,
      filters,
    } = this.state;

    return (
      <Wrapper>
        <Helmet>
          <title>Admin</title>
          <meta name="viewport" content="width=1024" />
        </Helmet>
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
              <option value="plexiglas">Оргстекло</option>
              <option value="acrylic_black">Акрил черн. мат.</option>
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
            <InputLabel htmlFor="age-simple">Арт. </InputLabel>
            <Select
              id="age-simple"
              native
              onChange={this.handleChangeFilter()}
              name="typeCode"
              label="test"
              value={filters.typeCode}
            >
              <option value="" />
              {typeCodes.map(typeCode => (<option value={typeCode}>{typeCode}</option>))}
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
              <TableCell>Опт. цена</TableCell>
              <TableCell>Order</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map(item => (
              <TableRow>
                <TableCell>
                  <StyledLink to={`/admin/product/${item.id}`}>{item.name || '---'}</StyledLink>
                </TableCell>
                <TableCell>{item.typeCode}</TableCell>
                <TableCell>
                  <Icon src={item.icon || noPhotoIcon} alt="" />
                </TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.isCarved ? 'Да' : 'Нет'}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.wholesalePrice}</TableCell>
                <TableCell>{item.order}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Wrapper>
    );
  }
}
