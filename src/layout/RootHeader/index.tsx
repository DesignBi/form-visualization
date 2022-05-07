import React from "react";
import './sty.less';
import { Menu, Dropdown } from 'antd';

const menu = (
    <Menu>
      <Menu.Item>
        个人中心
      </Menu.Item>
      <Menu.Item>退出</Menu.Item>
    </Menu>
)

function RootHeader() {
  return (
      <header className="root-header">
        <h1 className="logo-area">可视化组件编辑平台</h1>
        <div className="user-msg">
          <Dropdown overlay={ menu } trigger={ [ 'click' ] }>
            <p>您好，<span className="user-name">烈烈</span></p>
          </Dropdown>
        </div>
      </header>
  )
}

export default RootHeader
