import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import styled from 'styled-components';
import noPhotoIcon from '../icons/no-photo.svg';
import logo from '../icons/donishki-color-black-logo.svg';
import Auth from '../Auth';

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

const StyledLink = styled(Link)`
  color: black;
`;

const Icon = styled.img`
  width: 30px;
`;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };
  }

  componentWillMount() {
    fetch('/api/products', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `bearer ${Auth.getToken()}`,
      },
    }).then(async (response) => {
      const responseData = await response.json();
      this.setState({
        products: responseData,
      });
      console.log(responseData);
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    const { products } = this.state;

    return (
      <Wrapper>
        <Header>
          <Link to="/">
            <Logo src={logo} />
          </Link>
          <Button component={Link} to="/admin/product" variant="contained" color="primary">
            Добавить
          </Button>
          <FilterWrapper>
            <Select
              htmlFor="group_name"
              native
              // value={}
              // onChange={this.handleChange('age')}
              name="group_name"
            >
              <option value="plywood">Фанера</option>
              <option value="mdf">МДФ</option>
              <option value="plexiglass">Оргстекло</option>
              <option value="acrylic_black">Акрил черный матовый</option>
              <option value="acrylic_silver">Акрил серебряный</option>
              <option value="acrylic_gold">Акрил золотой</option>
            </Select>
          </FilterWrapper>
          <FilterWrapper>
            <Select
              native
              // value={}
              // onChange={this.handleChange('age')}
              name="group_name"
            >
              <option value="" />
              <option value="">Круг</option>
              <option value="">Квадрат</option>
              <option value="">Прямоугольник</option>
              <option value="">Овал</option>
              <option value="">Форма</option>
            </Select>
          </FilterWrapper>
          <FilterWrapper>
            <Select
              native
              // value={}
              // onChange={this.handleChange('age')}
              name="group_name"
            >
              <option value="" />
              <option value="">90</option>
              <option value="">120</option>
              <option value="">180</option>
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
            {products.map(item => (
              <TableRow>
                <TableCell>
                  <StyledLink to={`/admin/product/${item.id}`}>{item.name}</StyledLink>
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
