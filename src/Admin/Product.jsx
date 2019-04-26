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
import FileUploadSection from './FileUploadSection';
// import ImageHandling from './ImageHandling';

const Wrapper = styled.div`
  font-family: 'Roboto', sans-serif;
  width: 600px;
  margin: 0 auto;
  padding: 40px;
`;

const TopWrapper = styled.div`
  display: flex;
  // justify-content: space-;
`;

const FieldWrapper = styled.div`
  font-size: 12px;
  padding-top: 10px;
`;

const ButtonWrapper = styled.div`
  padding-top: 20px;
  width: 220px;
  display: flex;
  justify-content: space-between;
`;

const Header = styled.div`
  margin: 20px 0 40px 0;
`;

const LeftColumn = styled.div`
  width: 350px;
`;

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      typeCode: '',
      groupName: 'circle',
      icon: '',
      image: '',
      isCarved: false,
      size: '',
      order: 0,
      material: 'plywood',
      price: 0,
      isNewProduct: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.updateProduct = this.updateProduct.bind(this);
  }

  async componentWillMount() {
    await this.updateProduct();
  }

  handleChange = () => (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleChangeCheckbox = () => () => {
    this.setState(prevState => ({
      isCarved: !prevState.isCarved,
    }));
  };

  handleClick = (id) => {
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/products/${id}` : '/api/products/';
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${Auth.getToken()}`,
        Accept: 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then(async (response) => {
      //
      const responseData = await response.json();

      window.location = `/admin/product/${responseData.id}`;

      //
      // if (responseData.result) {
      //   const product = responseData.result[0];
      //   this.setState({
      //     name: product.name,
      //     price: product.price,
      //     description: product.description,
      //     meta_description: product.meta_description,
      //     url: product.url,
      //     title: product.title,
      //   });
    }).catch((e) => {
      console.log(e);
    });
  };

  handleDelete = (id) => {
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
      body: JSON.stringify(this.state),
    }).then(() => {
      window.location = '/admin';
    }).catch((e) => {
      console.log(e);
    });
  };

  updateProduct() {
    const { match } = this.props;
    const id = match.params.productId;
    if (!id) {
      this.setState({
        isNewProduct: true,
      });
      return;
    }
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
          icon: product.icon ? `${product.icon}?rand=${Math.random()}` : null,
          image: product.image ? `${product.image}?rand=${Math.random()}` : null,
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
      id,
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
      isNewProduct,
    } = this.state;
    return (
      <Wrapper>
        <Header>
          <Link to="/admin">Назад</Link>
        </Header>
        <TopWrapper>
          <LeftColumn>
            <FieldWrapper>
              <label>
                <div>Название:</div>
                <TextField
                  value={name}
                  onChange={this.handleChange()}
                  name="name"
                />
              </label>
              <label>
                <Checkbox
                  checked={isCarved}
                  onChange={this.handleChangeCheckbox()}
                  name="isCarved"
                />
                <span>Резной</span>
              </label>
            </FieldWrapper>
            <FieldWrapper>
              <label>
                <div>Группа</div>
                <Select
                  native
                  fullWidth
                  value={groupName}
                  onChange={this.handleChange()}
                  name="groupName"
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
                  fullWidth
                  value={material}
                  onChange={this.handleChange()}
                  name="material"
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
                  name="typeCode"
                  onChange={this.handleChange()}
                />
              </label>
            </FieldWrapper>
            <FieldWrapper>
              <label>
                <div>Цена:</div>
                <TextField
                  type="number"
                  fullWidth
                  value={price}
                  name="price"
                  onChange={this.handleChange()}
                />
              </label>
            </FieldWrapper>
            <FieldWrapper>
              <label>
                <div>Размеры (в мм, прим: 90, 120x160)</div>
                <TextField
                  fullWidth
                  value={size}
                  name="size"
                  onChange={this.handleChange()}
                />
              </label>
            </FieldWrapper>
            {/*<FieldWrapper>*/}
            {/*<label>*/}
            {/*<div>icon</div>*/}
            {/*<TextField*/}
            {/*fullWidth*/}
            {/*multiline*/}
            {/*value={icon}*/}
            {/*name="icon"*/}
            {/*onChange={this.handleChange()}*/}
            {/*/>*/}
            {/*</label>*/}
            {/*</FieldWrapper>*/}
            <FieldWrapper>
              <label>
                <div>Order</div>
                <TextField
                  fullWidth
                  multiline
                  type="number"
                  value={order}
                  name="order"
                  onChange={this.handleChange()}
                />
              </label>
            </FieldWrapper>
          </LeftColumn>
          <FileUploadSection
            productId={id}
            image={image}
            icon={icon}
            updateProduct={this.updateProduct}
          />
        </TopWrapper>

        <ButtonWrapper>
          <Button
            onClick={() => this.handleClick(id)}
            raised
            variant="contained"
            color="primary"
          >
            Сохранить
          </Button>

          {!isNewProduct && (
            <Button
              onClick={() => this.handleDelete(id)}
              variant="contained"
              color="secondary"
            >
              Удалить
            </Button>
          )}
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
