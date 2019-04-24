const data = [
  {
    group: 'circle',
    sizes: ['90', '150', '180', '210'],
    types: [
      {
        name: 'круг',
        typeCode: '0001',
        image: 'https://...',
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
        image: 'https://...',
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
];

export { data as default };
