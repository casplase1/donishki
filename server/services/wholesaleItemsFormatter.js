import materials from '../../src/constant/materials';

export default items => (items.map(item => (
  `${item.name} ${item.size}см ${materials[item.material]} ${item.wholesalePrice} руб. ${item.count} шт.`
)).join('<br />'));
