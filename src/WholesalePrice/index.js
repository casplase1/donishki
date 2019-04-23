import React, { Component } from 'react';
import styled from 'styled-components';
import { withCookies, Cookies } from 'react-cookie';
import PriceList from './priceList';

const Wrapper = styled.div`
  background-color: #f5f5f6;
  margin: 0 auto;
  max-width: 967px;
`;

class WholesalePrice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: [],
    };
    this.dataSort = this.dataSort.bind(this);
  }

  componentDidMount() {
    this.dataSort();
  }

  dataSort() {
    const price = [];
    data.map((item) => {
      if (price.find(el => el.name === item.name) === undefined) {
        price.push({ name: item.name, size: [item.size], prices: [item.prices] });
      } else {
        const index = price.findIndex(x => x.name === item.name);
        price[index].size.push(item.size);
        price[index].prices.push(item.prices);
      }
      this.setState({ price });
    });
  }

  render() {
    return (
      <Wrapper>
        <PriceList data={this.state.price} />
      </Wrapper>
    );
  }
}

export default withCookies(WholesalePrice);

const data = [
  {
    id: '1',
    name: 'Круг',
    image: '/product/krug9.jpg',
    size: 9,
    prices: {
      mdf: 49,
      plywood: 46,
      plexiglas: 151,
    },
  },
  {
    id: '2',
    name: 'Круг',
    image: '/product/krug15.jpg',
    size: 15,
    prices: {
      mdf: 106,
      plywood: 98,
      plexiglas: 408,
    },
  },
  {
    id: '3',
    name: 'Круг',
    image: '/product/krug18.jpg',
    size: 18,
    prices: {
      mdf: 113,
      plywood: 103,
      plexiglas: 442,
    },
  },
  {
    id: '3',
    name: 'Круг',
    image: '/product/krug20.jpg',
    size: 20,
    prices: {
      mdf: 118,
      plywood: 108,
      plexiglas: 458,
    },
  },
  {
    id: '4',
    name: 'Круг',
    image: '/product/krug25.jpg',
    size: 25,
    prices: {
      mdf: 185,
      plywood: 166,
      plexiglas: 886,
    },
  },
  {
    id: '5',
    name: 'Круг',
    image: '/product/krug35.jpg',
    size: 35,
    prices: {
      mdf: 290,
      plywood: 274,
      plexiglas: 1291,
    },
  },
  {
    id: '6',
    name: 'Круг',
    image: '/product/krug40.jpg',
    size: 40,
    prices: {
      mdf: 367,
      plywood: 317,
      plexiglas: 1382,
    },
  },
  // /////////////////////////////////////
  {
    id: '6',
    name: 'Резной круг',
    image: '/product/krrezn15.jpg',
    size: 15,
    prices: {
      mdf: 252,
      plywood: 233,
      plexiglas: 581,
    },
  },
  {
    id: '6',
    name: 'Резной круг',
    image: '/product/krrezn18.jpg',
    size: 18,
    prices: {
      mdf: 262,
      plywood: 240,
      plexiglas: 600,
    },
  },
  // /////////////////////////////////////
  {
    id: '7',
    name: 'Квадрат',
    image: '/product/kvadrat9.jpg',
    size: 9,
    prices: {
      mdf: 53,
      plywood: 50,
      plexiglas: 165,
    },
  },
  {
    id: '8',
    name: 'Квадрат',
    image: '/product/kvadrat13.jpg',
    size: 13,
    prices: {
      mdf: 115,
      plywood: 113,
      plexiglas: 398,
    },
  },
  {
    id: '8',
    name: 'Квадрат',
    image: '/product/kvadrat15.jpg',
    size: 15,
    prices: {
      mdf: 137,
      plywood: 130,
      plexiglas: 420,
    },
  },
  {
    id: '9',
    name: 'Квадрат',
    image: '/product/kvadrat2040.jpg',
    size: 20,
    prices: {
      mdf: 166,
      plywood: 163,
      plexiglas: 499,
    },
  },
  {
    id: '10',
    name: 'Квадрат',
    image: '/product/kvadrat2040.jpg',
    size: 25,
    prices: {
      mdf: 194,
      plywood: 185,
      plexiglas: 586,
    },
  },
  {
    id: '11',
    name: 'Квадрат',
    image: '/product/kvadrat2040.jpg',
    size: 35,
    prices: {
      mdf: 307,
      plywood: 298,
      plexiglas: 1044,
    },
  },
  {
    id: '12',
    name: 'Квадрат',
    image: '/product/kvadrat40.jpg',
    size: 40,
    prices: {
      mdf: 348,
      plywood: 326,
      plexiglas: 1070,
    },
  },
  // //////////////////////////////////////////
  {
    id: '12',
    name: 'Квадрат резной',
    image: '/product/kvadrat2040.jpg',
    size: 20,
    prices: {
      mdf: 276,
      plywood: 257,
      plexiglas: 641,
    },
  },
  // //////////////////////////////////////////
  {
    id: '13',
    name: 'Прямоугольник',
    image: '/product/pryam24x12.jpg',
    size: '24x12',
    prices: {
      mdf: 156,
      plywood: 151,
      plexiglas: 437,
    },
  },
  {
    id: '14',
    name: 'Прямоугольник',
    image: '/product/pryam20x15.jpg',
    size: '20x15',
    prices: {
      mdf: 170,
      plywood: 163,
      plexiglas: 430,
    },
  },
  {
    id: '15',
    name: 'Прямоугольник',
    image: '/product/pryam22x15.jpg',
    size: '22x15',
    prices: {
      mdf: 180,
      plywood: 173,
      plexiglas: 434,
    },
  },
  {
    id: '16',
    name: 'Прямоугольник',
    image: '/product/pryam27x15.jpg',
    size: '27x15',
    prices: {
      mdf: 187,
      plywood: 178,
      plexiglas: 564,
    },
  },
  {
    id: '17',
    name: 'Прямоугольник',
    image: '/product/pryam30x15.jpg',
    size: '30x15',
    prices: {
      mdf: 194,
      plywood: 180,
      plexiglas: 643,
    },
  },
  {
    id: '18',
    name: 'Прямоугольник',
    image: '/product/pryam30x22.jpg',
    size: '30x22',
    prices: {
      mdf: 202,
      plywood: 190,
      plexiglas: 710,
    },
  },
  {
    id: '19',
    name: 'Прямоугольник',
    image: '/product/pryam30x40.jpg',
    size: '40x30',
    prices: {
      mdf: 274,
      plywood: 259,
      plexiglas: 1277,
    },
  },
  // //////////////////////////////////////
  {
    id: '12',
    name: 'Прямоугольник резной',
    image: '/product/salfet.jpg',
    size: '27x15',
    prices: {
      mdf: 276,
      plywood: 257,
      plexiglas: 641,
    },
  },
  // //////////////////////////////////////////
  {
    id: '12',
    name: 'Салфетница',
    image: '/product/salfet.jpg',
    size: '27x15',
    prices: {
      mdf: 262,
      plywood: 254,
      plexiglas: 463,
    },
  },
  // //////////////////////////////////////////
  {
    id: '20',
    name: 'Овал',
    image: '/product/oval15x10.jpg',
    size: '15x10',
    prices: {
      mdf: 125,
      plywood: 115,
      plexiglas: 310,
    },
  },
  {
    id: '20',
    name: 'Овал',
    image: '/product/oval21x12.jpg',
    size: '21x12',
    prices: {
      mdf: 146,
      plywood: 142,
      plexiglas: 382,
    },
  },
  {
    id: '20',
    name: 'Овал',
    image: '/product/oval20x15.jpg',
    size: '20x15',
    prices: {
      mdf: 161,
      plywood: 154,
      plexiglas: 386,
    },
  },
  {
    id: '20',
    name: 'Овал',
    image: '/product/oval26x15.jpg',
    size: '26x15',
    prices: {
      mdf: 170,
      plywood: 158,
      plexiglas: 473,
    },
  },
  {
    id: '20',
    name: 'Овал',
    image: '/product/oval28x15.jpg',
    size: '28x15',
    prices: {
      mdf: 178,
      plywood: 166,
      plexiglas: 514,
    },
  },
  {
    id: '20',
    name: 'Овал',
    image: '/product/oval30x12.jpg',
    size: '30x12',
    prices: {
      mdf: 180,
      plywood: 166,
      plexiglas: 382,
    },
  },
  {
    id: '20',
    name: 'Овал',
    image: '/product/oval30x15.jpg',
    size: '30x15',
    prices: {
      mdf: 185,
      plywood: 175,
      plexiglas: 518,
    },
  },
  {
    id: '20',
    name: 'Овал',
    image: '/product/oval30x20.jpg',
    size: '30x20',
    prices: {
      mdf: 199,
      plywood: 185,
      plexiglas: 799,
    },
  },
  // ///////////////////////////////
  {
    id: '20',
    name: 'Овал прямой',
    image: '/product/ovalpr.jpg',
    size: '15x10',
    prices: {
      mdf: 125,
      plywood: 115,
      plexiglas: 310,
    },
  },
  {
    id: '20',
    name: 'Овал прямой',
    image: '/product/ovalpr.jpg',
    size: '21x12',
    prices: {
      mdf: 146,
      plywood: 142,
      plexiglas: 382,
    },
  },
  {
    id: '20',
    name: 'Овал прямой',
    image: '/product/ovalpr.jpg',
    size: '20x15',
    prices: {
      mdf: 161,
      plywood: 154,
      plexiglas: 386,
    },
  },
  {
    id: '20',
    name: 'Овал прямой',
    image: '/product/ovalpr.jpg',
    size: '26x15',
    prices: {
      mdf: 170,
      plywood: 158,
      plexiglas: 473,
    },
  },
  {
    id: '20',
    name: 'Овал прямой',
    image: '/product/ovalpr.jpg',
    size: '28x15',
    prices: {
      mdf: 178,
      plywood: 166,
      plexiglas: 514,
    },
  },
  {
    id: '20',
    name: 'Овал прямой',
    image: '/product/ovalpr.jpg',
    size: '30x12',
    prices: {
      mdf: 180,
      plywood: 166,
      plexiglas: 382,
    },
  },
  {
    id: '20',
    name: 'Овал прямой',
    image: '/product/ovalpr.jpg',
    size: '30x15',
    prices: {
      mdf: 185,
      plywood: 175,
      plexiglas: 518,
    },
  },
  {
    id: '20',
    name: 'Овал прямой',
    image: '/product/ovalpr.jpg',
    size: '30x20',
    prices: {
      mdf: 199,
      plywood: 185,
      plexiglas: 799,
    },
  },
  // //////////////////////////////////
  {
    id: '4',
    name: 'Звезда',
    image: '/product/zvezda18.jpg',
    size: 18,
    prices: {
      mdf: 194,
      plywood: 185,
      plexiglas: 461,
    },
  },
  {
    id: '4',
    name: 'Звезда',
    image: '/product/zvezda25.jpg',
    size: 25,
    prices: {
      mdf: 202,
      plywood: 197,
      plexiglas: 648,
    },
  },
  {
    id: '4',
    name: 'Звезда',
    image: '/product/zvezda30.jpg',
    size: 30,
    prices: {
      mdf: 211,
      plywood: 206,
      plexiglas: 821,
    },
  },
  // /////////////////
  {
    id: '3',
    name: 'Елка',
    image: '/product/elka.jpg',
    size: '25x20',
    prices: {
      mdf: 185,
      plywood: 182,
      plexiglas: 624,
    },
  },
  // /////////////////
  {
    id: '3',
    name: 'Сердце',
    image: '/product/serdechko27x29.jpg',
    size: '21x20',
    prices: {
      mdf: 151,
      plywood: 156,
      plexiglas: 1042,
    },
  },

  {
    id: '3',
    name: 'Сердце',
    image: '/product/serdechko27x29.jpg',
    size: '29x27',
    prices: {
      mdf: 175,
      plywood: 170,
      plexiglas: 1042,
    },
  },
];
