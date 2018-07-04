import materials from '../../src/constant/materials';

export default (items) => (items.map((item)=>(
  `${item.name} ${item.size}см ${materials[item.material]} ${item.price} руб. ${item.quantity} шт.`
)).join('<br />'));
