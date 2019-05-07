import materials from '../../src/constant/materials';

export default items => (items.map(item => (
  `${item.name} ${item.size}мм ${materials[item.material]} ${item.price} руб. ${item.count} шт.`
)).join('<br />'));
