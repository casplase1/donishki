import React, { Component } from 'react';
import styled from 'styled-components';
import {Row, Col} from 'react-flexbox-grid';
import { withCookies, Cookies } from 'react-cookie';
import Card from '../Catalog/Card';
import H1 from './../generic/H1';
import Header from '../Header';
import Footer from './../Footer';

const Wrapper = styled.div`
  background-color: #f5f5f6;
`;

const CatalogContent = styled.div`

  @media (min-width: 768px) {
    margin: 0 auto;
    max-width: 967px;
  }
`;

const RowWrapper = styled.div`
  margin: 15px;
  padding-bottom: 40px;
`;

const TextHeader = styled(H1)`
  font-size: 32px;
  padding: 0 15px;
`;

class Catalog extends Component {
  constructor(props) {
    super(props);

    const cookies = this.props.cookies || new Cookies();

    this.state = {
      items: cookies.get('items')
    };

    this.setItems = this.setItems.bind(this);
  }

  setItems(items) {
    this.setState({items});
  }

  render() {
    return (
      <Wrapper>
        <Header items={this.state.items} />
        <CatalogContent>
          <TextHeader>Каталог</TextHeader>
          <RowWrapper>
            <Row>
              {products && products.map(product =>
                (<Col xs={6} sm={6} md={4} lg={3}>
                  <Card
                    name={product.name}
                    size={product.size}
                    prices={product.prices}
                    id={product.id}
                    image={product.image}
                    url={product.url}
                    setItems={this.setItems}
                  />
                </Col>))}
            </Row>
          </RowWrapper>
        </CatalogContent>
        <Footer />
      </Wrapper>
    )
  }
}

export default withCookies(Catalog);

const products = [{
  "id": "1",
  "name": "Круглое донышко",
  "image": "https://donishki.ru/gallery/1.jpg",
  "size": 20,
  "prices": {
    "mdf": 70,
    "plywood": 80,
    "plexiglas": 90,
  },
}, {
  "id": "2",
  "name": "Круглое донышко",
  "image": "https://donishki.ru/gallery/1.jpg",
  "size": 20,
  "prices": {
    "mdf": 70,
    "plywood": 80,
    "plexiglas": 90,
  },
},{
  "id": "3",
  "name": "Круглое донышко",
  "image": "https://donishki.ru/gallery/1.jpg",
  "size": 20,
  "prices": {
    "mdf": 70,
    "plywood": 80,
    "plexiglas": 90,
  },
},{
  "id": "4",
  "name": "Круглое донышко",
  "image": "https://donishki.ru/gallery/1.jpg",
  "size": 20,
  "prices": {
    "mdf": 70,
    "plywood": 80,
    "plexiglas": 90,
  }
}];