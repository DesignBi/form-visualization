/**
 * 树型架子，递归循环出结构
 * */
import  { ReactElement, useState } from "react";
import { Space, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import './style.less';

const noChildrenType = [ 'table', 'form' ]

interface Props {
  data: ModuleItem[],
  moduleIndex: string, // 1-1-2-3 这种
  onInsert: (moduleIndex: string, type: string) => void,
  onDelete: (moduleIndex: string) => void,
  onConfig: (moduleIndex: string) => void
}

const TreeShelf = (props: Props) => {
  const defaultValue = new Array(props.data.length).fill(true, 0, props.data.length);
  const [ showChild, setShowChild ] = useState<boolean[]>(defaultValue);
  return (
      <ul className="terr-node">
        {
          props.data.map((v, i) => {
            let childRen: ReactElement | null = null;
            if (Array.isArray(v.children)) {
              childRen = showChild[i] ? (
                  <TreeShelf key={ props.moduleIndex + '-' + i } onInsert={ props.onInsert } onConfig={ props.onConfig }
                             onDelete={ props.onDelete }
                             moduleIndex={ props.moduleIndex + '-' + i }
                             data={ v.children }/>) : null
            }
            return (
                <li key={ v.name }>
                  <div className="item">
                    <Space>
                      { Array.isArray(v.children) ?
                          <RightOutlined style={ { transform: `rotate(${ showChild[i] ? '90' : '0' }deg)` } }
                                         onClick={
                                           () => {
                                             showChild[i] = !showChild[i]
                                             setShowChild([ ...showChild ])
                                           }
                                         }/> : null }
                      <div className="title">{ v.label }<span style={ { color: '#999' } }>[ { v.name } ]</span></div>
                      { noChildrenType.includes(v.type) ? null : <Button size="small" type={ "primary" }
                                                                         onClick={ () => props.onInsert(props.moduleIndex + '-' + i, v.type) }>添加子组件</Button> }
                      <Button size="small" onClick={ () => props.onConfig(props.moduleIndex + '-' + i) }>配置</Button>
                      { v.type === 'wrap-module' ? null : <Button danger={ true } size="small"
                                                                  onClick={ () => props.onDelete(props.moduleIndex + '-' + i) }>删除</Button> }
                    </Space>
                  </div>
                  { childRen }
                </li>
            )
          })
        }
      </ul>
  )
}

export default TreeShelf;
