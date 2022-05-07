import React from 'react';
import { withRouter } from "react-router-dom";
import RootHeader from './RootHeader'
import RootMain from "./RootMain";
import './style.less';

export function Layout() {
  return (
      <div className="layout-wrap">
        <RootHeader/>
        <RootMain/>
      </div>
  );
}

export default withRouter(Layout);
