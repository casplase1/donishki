import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Auth from './modules/Auth';
import Main from './Main';
import Catalog from './Catalog';
import Basket from './Basket';
import WholesalePrice from './WholesalePrice';
import Admin from './Admin/List';
import Product from './Admin/Product';
import Login from './Login';

export default () => (
  <Switch>
    <Route key="0" exact path="/" component={Main} />
    <Route key="1" exact path="/catalog" component={Catalog} />
    <Route key="2" exact path="/basket" component={Basket} />
    <Route key="3" exact path="/wholesaleprice" component={WholesalePrice} />
    <Route key="4" exact path="/login" component={Login} />
    <Route key="5" exact path="/admin" component={Admin} />
    <Route key="6" path="/admin/product/:productId" component={Product} />
    {/*<Route exact path="/admin" render={() => {*/}
      {/*if (!Auth.isUserAuthenticated()) {*/}
        {/*return <Redirect to="/login" />;*/}
      {/*}*/}
      {/*return <Redirect to="/admin/list" />*/}
    {/*}}*/}
    {/*/>*/}
  </Switch>
);
