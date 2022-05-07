import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute';
import 'antd/dist/antd.css';
import './App.less';
import Layout from "./layout";
import Login from './layout/login'
console.log('jenkins测试')
function App() {
  return (
      <Switch>
        <Route path='/login' component={ Login }/>
        <PrivateRoute path='/' component={ Layout }/>
      </Switch>
  );
}

export default withRouter(App);
