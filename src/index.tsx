import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import { store } from "./store";
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={ store }>
      <ConfigProvider locale={ zhCN }>
        <BrowserRouter>
          {/* 使用了路由懒加载，所以需要使用<Suspense>包起来 */ }
          <Suspense fallback={ <div></div> }>
            <Switch>
              <Route path="/" render={ routerProps => {
                return <App { ...routerProps }/>
              } }/>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>,
    document.getElementById('root')
);
