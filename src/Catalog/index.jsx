import React, { Component } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import Waypoint from 'react-waypoint';
import { withCookies, Cookies } from 'react-cookie';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Footer from '../Footer';
import Card from './Card';
import Header from '../Header';
import preloader from './loader.svg';

const Wrapper = styled.div`
  background-color: #f5f5f6;
`;

const H2 = styled.h2`
  padding-left: 20px;
  font-family: Roboto, sans-serif;
  font-size: 32px;
  font-weight: 400;
`;

const CatalogContent = styled.div`
  margin-top: 130px;
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
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    width: 967px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
  }
`;

const StyledFormControl = styled(FormControl)`
  margin-left: 20px;
  width: 99px;
  @media (min-width: 768px) {
    width: 120px;
  }
`;

const FilterBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  @media (min-width: 768px) {
    width: 50%;
    margin-right: 40px;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    background: #fff;
  }
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  padding-top: 10px;
  display: block;
`;

const LoadingText = styled.div`
  display: ${({ isLoadingActive }) => (isLoadingActive ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 24px;
`;

const PreloaderImg = styled.img`
  width: 40px;
`;

const ScrollToTop = () => {
  window.scrollTo(0, 0);
  return null;
};

class Catalog extends Component {
  constructor(props) {
    super(props);
    const { cookies } = this.props;

    this.cookies = cookies || new Cookies();

    let material;
    if (props.location.state && props.location.state.filters) {
      ({ material } = props.location.state.filters);
    } else {
      material = 'plywood';
    }

    this.state = {
      limit: 50,
      isLimitIncreaseAllowed: false,
      isLoadingActive: true,
      products: [],
      filteredProducts: [],
      sizes: [],
      items: this.cookies.get('items'),
      filters: {
        material,
        size: '',
        groupName: '',
        isCarved: false,
      },
    };

    this.setItems = this.setItems.bind(this);
  }

  componentWillMount() {
    fetch('/api/products', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(async (response) => {
        const responseData = await response.json();

        const sizes = responseData.reduce((accumulator, product) => {
          accumulator.push(product.size);
          return accumulator;
        }, []);

        this.setState(
          {
            products: responseData,
            sizes: [...new Set(sizes)],
          },
          () => {
            this.filterOutProducts();
            setTimeout(() => {
              this.setState({
                isLoadingActive: false,
                isLimitIncreaseAllowed: true,
              });
            }, 1000);
          },
        );
      })
      .catch(() => {
        // console.log(e);
      });
  }

  setItems(items) {
    this.setState({ items });
  }

  filterOutProducts = () => {
    const { products, filters, limit } = this.state;
    const filteredProducts = products.filter(
      product => (!filters.material || filters.material === product.material)
        && (!filters.size || filters.size === product.size)
        && (!filters.groupName || filters.groupName === product.groupName)
        && (!filters.isCarved || filters.isCarved === product.isCarved),
    );

    this.setState(
      {
        filteredProducts: filteredProducts.slice(0, limit),
      },
      // () => console.log(this.state),
    );
  };

  handleChangeCheckbox = () => {
    ScrollToTop();
    this.setState(
      prevState => ({
        filters: {
          limit: 50,
          ...prevState.filters,
          isCarved: !prevState.filters.isCarved,
        },
      }),
      () => this.filterOutProducts(),
    );
  };

  handleChangeFilter = () => (event) => {
    ScrollToTop();
    const { name, value } = event.target;
    this.setState(
      prevState => ({
        limit: 50,
        filters: {
          ...prevState.filters,
          [name]: value,
        },
      }),
      () => this.filterOutProducts(),
    );
  };

  handleWaypointEnter = () => {
    const { isLimitIncreaseAllowed } = this.state;
    if (isLimitIncreaseAllowed) {
      this.setState({
        isLoadingActive: true,
      });

      setTimeout(() => {
        this.setState(prevState => ({
          limit: prevState.limit + 50,
          isLimitIncreaseAllowed: false,
        }), () => {
          this.filterOutProducts();
          setTimeout(() => {
            this.setState({
              isLimitIncreaseAllowed: true,
              isLoadingActive: false,
            });
          }, 1000);
        });
      }, 1000);
    }
  };

  render() {
    const {
      filters, sizes, filteredProducts, items, isLoadingActive,
    } = this.state;

    return (
      <Wrapper>
        <Header items={items} />
        <WrapperFixed>
          <FormBlock>
            <FilterBlock>
              <StyledFormControl error>
                <InputLabel>Материал</InputLabel>
                <Select
                  value={filters.material}
                  onChange={this.handleChangeFilter()}
                  name="material"
                >
                  <MenuItem value="plywood">Фанера</MenuItem>
                  <MenuItem value="mdf">МДФ</MenuItem>
                  <MenuItem value="plexiglas">Оргстекло</MenuItem>
                  {/*<MenuItem value="colored">Цветные</MenuItem>*/}
                  <MenuItem value="acrylic_black">Акрил черный матовый</MenuItem>
                  <MenuItem value="acrylic_silver">Акрил серебряный</MenuItem>
                  <MenuItem value="acrylic_gold">Акрил золотой</MenuItem>
                </Select>
              </StyledFormControl>
              <StyledFormControl error>
                <InputLabel>Форма</InputLabel>
                <Select
                  value={filters.groupName}
                  onChange={this.handleChangeFilter()}
                  name="groupName"
                >
                  <MenuItem value="" />
                  <MenuItem value="circle">Круги</MenuItem>
                  <MenuItem value="square">Квадраты</MenuItem>
                  <MenuItem value="rectangle">Прямоуольники</MenuItem>
                  <MenuItem value="oval">Овалы</MenuItem>
                  <MenuItem value="form">Фигуры</MenuItem>
                </Select>
              </StyledFormControl>
              <StyledFormControl error>
                <InputLabel>Размер</InputLabel>
                <Select value={filters.size} onChange={this.handleChangeFilter()} name="size">
                  <MenuItem value="" />
                  {sizes.map(size => (
                    <MenuItem value={size}>{size}</MenuItem>
                  ))}
                </Select>
              </StyledFormControl>

              <StyledFormControlLabel
                control={(
                  <Checkbox
                    checked={filters.isCarved}
                    onChange={this.handleChangeCheckbox}
                    value
                    color="primary"
                  />
                )}
                label="С узором"
              />
            </FilterBlock>
          </FormBlock>
        </WrapperFixed>

        <CatalogContent>
          <H2>Каталог (розница)</H2>
          <RowWrapper>
            <Row>
              {filteredProducts.map(product => (
                <Col xs={6} sm={6} md={4} lg={3}>
                  <Card
                    name={product.name}
                    size={product.size}
                    price={product.price}
                    material={product.material}
                    typeCode={product.typeCode}
                    id={product.id}
                    image={product.image}
                    icon={product.icon}
                    url={product.url}
                    setItems={this.setItems}
                  />
                </Col>
              ))}
            </Row>
          </RowWrapper>
        </CatalogContent>
        <LoadingText isLoadingActive={isLoadingActive}>
          <div>
            {'Загрузка... '}
          </div>
          <PreloaderImg src={preloader} />
        </LoadingText>
        <Waypoint onEnter={this.handleWaypointEnter} />
        <Footer />
      </Wrapper>
    );
  }
}

export default withCookies(Catalog);
