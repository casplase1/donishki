const data = [
  {
    group: 'circle',
    sizes: ['90', '150', '180', '210'],
    types: [
      {
        name: 'круг',
        typeCode: '0001',
        image: 'https://donishki.ru/product/kvadrat9.jpg',
        items: [
          {
            id: 1,
            size: '90',
            price: 12,
          },
          {
            id: 2,
            size: '150',
            price: 14,
          },
          {
            id: 3,
            size: '180',
            price: 14,
          },
        ],
      },
      {
        name: 'круг резной',
        typeCode: '0002',
        image: 'https://donishki.ru/product/kvadrat9.jpg',
        items: [
          {
            id: 4,
            size: '150',
            price: 18,
          },
          {
            id: 5,
            size: '180',
            price: 18,
          },
          {
            id: 6,
            size: '210',
            price: 18,
          },
        ],
      },
    ],
  },
  {
    group: 'square',
    sizes: ['90', '150', '180', '210', '250'],
    types: [
      {
        name: 'квадрат',
        typeCode: '0006',
        image: 'https://donishki.ru/product/kvadrat9.jpg',
        items: [
          {
            id: 7,
            size: '90',
            price: 12,
          },
          {
            id: 8,
            size: '150',
            price: 14,
          },
          {
            id: 9,
            size: '180',
            price: 14,
          },
        ],
      },
      {
        name: 'квадрат резной',
        typeCode: '0005',
        image: 'https://donishki.ru/product/kvadrat9.jpg',
        items: [
          {
            id: 10,
            size: '150',
            price: 18,
          },
          {
            id: 11,
            size: '250',
            price: 18,
          },
          {
            id: 12,
            size: '210',
            price: 18,
          },
        ],
      },
    ],
  },
];

export { data as default };
