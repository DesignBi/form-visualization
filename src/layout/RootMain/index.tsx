import React from "react";
import { Switch } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import { Routers } from '../../router';
import './sty.less';
function Index() {
  return (
      <div className="root-main">
        <Switch>
          { Routers.map(v => <PrivateRoute path={ v.path } key={ v.path } component={ v.component }></PrivateRoute>
          ) }
        </Switch>
      </div>
  )
}

export default Index;
