import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import H2 from '../../generic/H2';
import Card from '../../Catalog/Card';
import GhostButton from '../../generic/GhostButton';
import products from './productsList';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const CatalogContent = styled.div`
  margin: 0 auto;
  max-width: 967px;
`;

const HeaderWrapper = styled(CatalogContent)`
  display: flex;
  justify-content: space-between;
`;

const RowWrapper = styled.div`
  margin: 15px;
  padding-top: 20px;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  padding-top: 30px;
`;

const Button = GhostButton.withComponent(Link);

const StyledButton = styled(Button)`
  background-color: #eb7e87;
  border-radius: 50pt;
  padding: 15px 25px;
`;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

const FilterBlock = styled.div``;

class Catalog extends Component {
  render() {
    const { classes, setItems } = this.props;

    return (
      <Wrapper>
        <HeaderWrapper>
          <H2>Каталог донышек (розница)</H2>
          <FilterBlock>
            <FormControl className={classes.formControl} error>
              <InputLabel>Материал</InputLabel>
              <Select>
                <MenuItem value="">
                  <em>Фанера</em>
                </MenuItem>
                <MenuItem value={10}>МДФ</MenuItem>
                <MenuItem value={20}>Оргстекло</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} error>
              <InputLabel>Фигура</InputLabel>
              <Select>
                <MenuItem value="">
                  <em>Фанера</em>
                </MenuItem>
                <MenuItem value={10}>МДФ</MenuItem>
                <MenuItem value={20}>Оргстекло</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} error>
              <InputLabel>Размер</InputLabel>
              <Select>
                <MenuItem value="">
                  <em>Фанера</em>
                </MenuItem>
                <MenuItem value={10}>МДФ</MenuItem>
                <MenuItem value={20}>Оргстекло</MenuItem>
              </Select>
            </FormControl>
          </FilterBlock>
          <FormControlLabel
            control={<Checkbox checked="" value="checkedB" color="primary" />}
            label="С узором"
          />
        </HeaderWrapper>

        <CatalogContent>
          <RowWrapper>
            <Row>
              {products
                && products.map(product => (
                  <Col xs={6} sm={6} md={4} lg={3}>
                    <Card
                      name={product.name}
                      size={product.size}
                      prices={product.prices}
                      id={product.id}
                      image={product.image}
                      url={product.url}
                      setItems={setItems}
                    />
                  </Col>
                ))}
            </Row>
            <ButtonWrapper>
              <StyledButton to="/catalog">Смотреть весь каталог</StyledButton>
            </ButtonWrapper>
          </RowWrapper>
        </CatalogContent>
      </Wrapper>
    );
  }
}

export default withStyles(styles)(Catalog);
