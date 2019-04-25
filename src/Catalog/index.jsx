import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { withCookies, Cookies } from 'react-cookie';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import products from './productsList';
import Footer from '../Footer';
import H2 from '../generic/H2';
import Card from './Card';
import Header from '../Header';

const Wrapper = styled.div`
  background-color: #f5f5f6;
`;

const CatalogContent = styled.div`
  @media (min-width: 768px) {
    margin: 0 auto;
    max-width: 967px;
    margin-top: 100px;
  }
`;

const RowWrapper = styled.div`
  margin: 15px;
  padding-bottom: 40px;
`;

const WrapperFixed = styled.div`
  position: fixed;
  background: rgba(256, 256, 256, 0.9);
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
`;

const FormBlock = styled.div`
  width: 967px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const StyledFormControl = styled(FormControl)`
  margin-left: 20px;
  width: 120px;
`;

const FilterBlock = styled.div`
width: 50%;
    display: flex;
    justify-content: space-between;`;

class Catalog extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    this.cookies = cookies || new Cookies();

    this.state = {
      items: this.cookies.get('items'),
      material: 'plywood',
      figure: '',
      size: '',
      isCarved: false,
    };

    this.setItems = this.setItems.bind(this);
  }

  handleChangeSelect = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeCheckbox = () => {
    this.setState({ isCarved: !this.state.isCarved });
  };

  setItems(items) {
    this.setState({ items });
  }

  render() {
    const { classes, setItems } = this.props;
    const {
      material, figure, size, isCarved, items,
    } = this.state;

    return (
      <Wrapper>
        <Header />
        <WrapperFixed>
          <FormBlock>
            <H2>Каталог донышек (розница)</H2>
            <FilterBlock>
              <StyledFormControl error>
                <InputLabel>Материал</InputLabel>
                <Select
                  value={material}
                  onChange={this.handleChangeSelect}
                  inputProps={{
                    name: 'material',
                  }}
                >
                  <MenuItem value="plywood">Фанера</MenuItem>
                  <MenuItem value="mdf">МДФ</MenuItem>
                  <MenuItem value="plexiglas">Оргстекло</MenuItem>
                </Select>
              </StyledFormControl>
              <StyledFormControl error>
                <InputLabel>Фигура</InputLabel>
                <Select
                  value={figure}
                  onChange={this.handleChangeSelect}
                  inputProps={{
                    name: 'figure',
                  }}
                >
                  <MenuItem value="circle">Круги</MenuItem>
                  <MenuItem value="square">Квадраты</MenuItem>
                  <MenuItem value="oval">Овалы</MenuItem>
                  <MenuItem value="straight oval">Овалы прямые</MenuItem>
                  <MenuItem value="figures">Фигуры </MenuItem>
                </Select>
              </StyledFormControl>
              <StyledFormControl error>
                <InputLabel>Размер</InputLabel>
                <Select
                  value={size}
                  onChange={this.handleChangeSelect}
                  inputProps={{
                    name: 'size',
                  }}
                >
                  <MenuItem value="plywood">Фанера</MenuItem>
                  <MenuItem value="mdf">МДФ</MenuItem>
                  <MenuItem value="plexiglas">Оргстекло</MenuItem>
                </Select>
              </StyledFormControl>

              <FormControlLabel
                control={(
                  <Checkbox
                    checked={isCarved}
                    onChange={this.handleChangeCheckbox}
                    value="isCarved"
                    color="primary"
                  />
)}
                label="С узором"
              />
            </FilterBlock>
          </FormBlock>
        </WrapperFixed>
        <CatalogContent>
          <RowWrapper>
            <Row>
              {products
                && products.map(product => (
                  <Col xs={6} sm={6} md={4} lg={3}>
                    <Card
                      name={product.name}
                      size={product.size}
                      prices={product.prices[material]}
                      material={material}
                      id={product.id}
                      image={product.image}
                      url={product.url}
                      setItems={setItems}
                    />
                  </Col>
                ))}
            </Row>
          </RowWrapper>
        </CatalogContent>
        <Footer />
      </Wrapper>
    );
  }
}

export default withCookies(Catalog);
