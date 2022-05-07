import React, { useState } from "react";
import { Button } from "antd";
import "./style.less";

function Home(props: any) {
  const [ showContent, updateContent ] = useState(false);
  const items = [ '表格页面', '表单页面', '分类页面' ];
  return (
      <div className="page home-page">
        <h1 className="welcome">欢迎使用可视化组件编辑平台</h1>
        <div className="btn-wrap">
          <Button type={ "primary" } onClick={ () => updateContent(true) }>开始您的制作</Button>
        </div>
        { showContent ? <div className="content">
          <h3>您是要制作一个：</h3>
          <div className="items">
            {
              items.map((v, i) => (
                  <div className="item" key={i} onClick={ () => {
                    props.history.push('/module')
                  }
                  } style={ { animationDelay: i * 0.2 + 's' } }>{ v }</div>
              ))
            }
            <div className="item" onClick={ () => {props.history.push('/formModel1')}} style={ { animationDelay: items.length * 0.2 + 's' } }>表单</div>
            <div className="item" onClick={ () => {props.history.push('/formModel2')}} style={ { animationDelay: items.length * 0.3 + 's' } }>表单2</div>
          </div>
        </div> : null
        }
      </div>
  )
}

export default Home;
