import React from 'react';

import {
  Home, Test, FormModel1, TableModel1, ModulePage, EditPage, FormModel2
} from '../pages'

export type RouterType = {
  path: string,
  component: React.LazyExoticComponent<any> | React.ComponentClass<any>,
  root: string[],
  notExect?: boolean
}

// 总路由
export const Routers: RouterType[] = ([
  {
    path: '/home',
    component: Home,
    root: [],
  },
  {
    path: '/test',
    component: Test,
    root: [],
  },
  {
    path: '/formModel1',
    component: FormModel1,
    root: [],
  },
  {
    path: '/tableModel1',
    component: TableModel1,
    root: [],
  },
  {
    path: '/module',
    component: ModulePage,
    root: [],
  },
  {
    path: '/edit-node',
    component: EditPage,
    root: [],
  },
  {
    path: '/formModel2',
    component: FormModel2,
    root: [],
  },
]);
