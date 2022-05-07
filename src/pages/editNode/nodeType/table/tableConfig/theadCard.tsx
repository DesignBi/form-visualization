import react from "react";
import { TableColumn } from "../tableConfig";
import { Button, Card, Space } from "antd";
import { SettingFilled } from "@ant-design/icons";

const cellType: { [l: string]: string } = {
  text: '文本',
  image: '图片',
  slot: '插槽',
  mapText: '状态文本',
  rangeText: '范围文本',
  serial: '序号',
  handle: '按钮',
}

interface Props {
  data: TableColumn;
  onEdit: (data: TableColumn, index: number) => void;
  index: number;
  onDelete: (index: number) => void
}

const TheadCard = (props: Props) => {
  let rangeText = null;
  let mapText = null;
  let handle = null;
  if (props.data.type === 'rangeText') {
    rangeText = (<Space>
      <div>开始key： { props.data.params.startKey }</div>
      <div>链接符： { props.data.params.linkSymbol }</div>
      <div>结束key： { props.data.params.endKey }</div>
    </Space>)
  }
  if (props.data.type === 'mapText') {
    if (props.data.params.type === 'localData') {
      mapText = (<>
        <p>数据类型： 本地</p>
        <ul>
          <li>数据 ：</li>
          {
            props.data.params.localData.map((v: Options) => (
                <li>标题： { v.label } 值： { v.value }</li>
            ))
          }
        </ul>
      </>)
    }
    if (props.data.params.type === 'dictionary') {
      mapText = (
          <>
            <p>数据类型： 字典</p>
            <p>字典名称： { props.data.params.dictionaryName }</p>
          </>
      )
    }
  }
  if (props.data.type === 'handle') {
    handle = props.data.actions?.map(v => {
      return <Space align="baseline">
        <p>
          按钮文字: { v.label }
        </p>
        <p>
          事件名称: { v.emit }
        </p>
        <SettingFilled/>
      </Space>
    })
  }
  return (<Card title={ props.data.label } style={ { width: '300px' } }
                extra={
                  <Space>
                    <Button size={ "small" } onClick={ () => props.onEdit(props.data, props.index) }>编辑</Button>
                    <Button danger={ true } size={ "small" }
                            onClick={ () => props.onDelete(props.index) }>删除</Button>
                  </Space>
                }>
    <p>类型： { cellType[props.data.type as string] }</p>
    <p>Key： { props.data.key }</p>
    <p>值格式化： { props.data.formatter ?? '无' }</p>
    { props.data.width ? <p>宽度： { props.data.width } px</p> : null }
    {
      rangeText
    }
    {
      mapText
    }
    {
      handle
    }
  </Card>)
}

export default TheadCard;
