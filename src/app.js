import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from './Main';
import Catalog from './Catalog';
import Basket from './Basket';
import WholesalePrice from './WholesalePrice';

export default () => (
  <Switch>
    <Route key="0" exact path="/" component={Main} />
    <Route key="1" exact path="/catalog" component={Catalog} />
    <Route key="2" exact path="/basket" component={Basket} />
    <Route key="3" exact path="/wholesaleprice" component={WholesalePrice} />
  </Switch>
);
