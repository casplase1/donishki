import React from 'react';
import styled from 'styled-components';
import H2 from '../../generic/H2';
import Article from '../../generic/Article';
import Scroll from 'react-scroll';

const Anchor = Scroll.Element;

const Wrapper = styled.div`
  padding: 40px 0;

  @media (min-width: 768px) {
    width: 970px;
    margin: 0 auto;
  }
`;

const Text = styled(Article)`
  margin-bottom: 35px;
`;

export default () => (
  <Wrapper>
    <Anchor name="DeliveryAnchor" />
    <H2>Доставка и оплата</H2>
    <Text>
      По России отправляем «Почтой России» и курьерскими компаниями («СДЭК» и прочее).
      Стоимость отправки зависит от региона и веса посылки.
      По Москве возможна отправка курьером.
      Оплату принимаем на карту «Сбербанк», наличными, а так же на расчетный счет.
    </Text>
  </Wrapper>
);