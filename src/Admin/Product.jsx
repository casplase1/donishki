/* eslint jsx-a11y/label-has-associated-control: 0 */
/* eslint jsx-a11y/label-has-for: 0 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Auth from '../Auth';
// import ImageHandling from './ImageHandling';

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  width: 600px;
  margin: 0 auto;
  padding: 40px;
`;

const FieldWrapper = styled.div`
  font-size: 12px;
  padding-top: 10px;
`;

const ButtonWrapper = styled.div`
  padding-top: 20px;
  width: 155px;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  margin: 20px 0 40px 0;
`;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      name: '',
      price: '',
      description: '',
      url: '',
      title: '',
      meta_description: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  async componentWillMount() {
    await this.updateProduct();
  }

  handleChange = name => event => {
    // this.setState({
    //   [name]: event.target.value
    // });
  };

  handleClick = (id) => {
    // fetch(`/api/products/${id}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `bearer ${Auth.getToken()}`,
    //     Accept: 'application/json',
    //   },
    //   body: JSON.stringify(this.state)
    // }).then(async (response) => {
    //   const responseData = await response.json();
    //
    //   if (responseData.result) {
    //     const product = responseData.result[0];
    //     this.setState({
    //       name: product.name,
    //       price: product.price,
    //       description: product.description,
    //       meta_description: product.meta_description,
    //       url: product.url,
    //       title: product.title
    //     });
    //   }
    // }).catch((e) => {
    //   console.log(e);
    // })
  };

  handleRemoveClick = (id) => {
    if (!window.confirm("Удалить страницу со всеми фото?")) {
      return;
    }
    fetch(`/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${Auth.getToken()}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then(async (response) => {
      const responseData = await response.json();
      if (responseData.status === 'success') {
        window.location = '/list';
      }
    }).catch((e) => {
      console.log(e);
    })
  };

  updateProduct() {
    const { match } = this.props;
    const id = match.url.split('/').pop();
    fetch(`/api/products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${Auth.getToken()}`,
        Accept: 'application/json',
      },
    }).then(async (response) => {
      const responseData = await response.json();

      if (responseData[0]) {
        const product = responseData[0];
        this.setState({
          id: product.id,
          name: product.name,
          typeCode: product.type_code,
          groupName: product.group_name,
          icon: product.icon,
          image: product.image,
          isCarved: product.is_carved,
          size: product.size,
          order: product.order,
          material: product.material,
          price: product.price,
        });
      }
    }).catch((e) => {
      console.log(e);
    });
  }

  render() {
    const {
      name,
      typeCode,
      groupName,
      icon,
      image,
      isCarved,
      size,
      order,
      material,
      price,
    } = this.state;
    return (
      <Wrapper>
        <Header>
          <Link to="/admin">Назад</Link>
        </Header>
        <FieldWrapper>
          <label>
            <div>Название:</div>
            <TextField
              value={name}
              onChange={this.handleChange('name')}
            />
          </label>
          <label>
            <Checkbox
              checked={isCarved}
              onChange={this.handleChange('checked')}
              name="name"
            />
            <span>Резной</span>
          </label>
        </FieldWrapper>
        <FieldWrapper>
          <label>
            <div>Группа</div>
            <Select
              native
              value={groupName}
              // onChange={this.handleChange('age')}
              name="group_name"
            >
              <option value="circle">Круги</option>
              <option value="Square">Квадраты</option>
              <option value="Rectangle">Прямоугольники</option>
              <option value="Oval">Овалы</option>
              <option value="Form">Формы</option>
            </Select>
          </label>
        </FieldWrapper>
        <FieldWrapper>
          <label>
            <div>Материал</div>
            <Select
              native
              value={groupName}
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
          </label>
        </FieldWrapper>
        <FieldWrapper>
          <label>
            <div>Артикул</div>
            <TextField
              fullWidth
              value={typeCode}
              onChange={this.handleChange('price')}
            />
          </label>
        </FieldWrapper>
        <FieldWrapper>
          <label>
            <div>Цена:</div>
            <TextField
              fullWidth
              value={price}
              onChange={this.handleChange('title')}
            />
          </label>
        </FieldWrapper>
        <FieldWrapper>
          <label>
            <div>Размеры (в мм, прим: 90, 120x160)</div>
            <TextField
              fullWidth
              value={size}
              onChange={this.handleChange('meta_description')}
            />
          </label>
        </FieldWrapper>
        <FieldWrapper>
          <label>
            <div>icon</div>
            <TextField
              fullWidth
              multiline
              value={icon}
              onChange={this.handleChange('description')}
            />
          </label>
        </FieldWrapper>
        <FieldWrapper>
          <label>
            <div>Order</div>
            <TextField
              fullWidth
              multiline
              value={order}
              onChange={this.handleChange('description')}
            />
          </label>
        </FieldWrapper>

        <ButtonWrapper>
          <Button
            onClick={(event) => this.handleClick(this.state.id)}
            raised
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            onClick={(event) => this.handleRemoveClick(this.state.id)}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </ButtonWrapper>

        {/*<h4>Photo</h4>*/}
        {/*<ImageHandling*/}
          {/*match={this.props.match}*/}
          {/*productId={this.state.id}*/}
          {/*productUrl={this.state.url}*/}
        {/*/>*/}
      </Wrapper>
    );
  }
}
