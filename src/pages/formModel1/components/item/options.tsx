/**
 * 配置当类型是 checkbox 和 select 和 radio时，渲染多个控件时的数据
 * */
import React, { useState } from "react";
import { Row, Col, Input, Button } from "antd";
import { Option } from "../../type";


let id = 0;
const buildDefault = (): Option => {
  return {
    id: ++id,
    label: '',
    value: ''
  }
}

function Options({ onGetOptionsChange }: { onGetOptionsChange: (op: Option[]) => void; }) {
  const [ options, setOptions ] = useState<Option[]>([
    buildDefault()
  ])
  const add = () => {
    console.log('add');
    const data = [ ...options ];
    data.push(buildDefault());
    setOptions(data);
  }
  const sub = (item: Option) => {
    const data = [ ...options ];
    const index = options.indexOf(item);
    data.splice(index, 1);
    setOptions(data);
  }
  const change = (i: number, value: string, label: 'label' | 'value') => {
    const data: Option[] = [ ...options ];
    data[i][label] = value;
    setOptions(data);
    onGetOptionsChange(data);
  }
  return (
      <div>
        {
          options.map((v, i) => (
              <Row key={ v.id.toString() } style={ { marginBottom: '10px' } }>
                <Col span={ 6 }>
                  <Input placeholder="请输入显示的label" onChange={ (e) => change(i, e.target.value, 'label') }></Input>
                </Col>
                <Col span={ 6 } offset={ 1 }>
                  <Input placeholder="请输入提交后台的value" onChange={ (e) => change(i, e.target.value, 'value') }></Input>
                </Col>
                <Col span={ 6 } offset={ 1 }>
                  <Button style={ { marginRight: '10px' } } onClick={ () => add() }>新增</Button>
                  { options.length > 1 ? <Button danger onClick={ () => sub(v) }>删除</Button> : null }
                </Col>
              </Row>
          ))
        }
      </div>
  )
}

export default Options;
