import react from "react";
import { Form, Input, Space, Button, Row, Col, Select } from "antd";
import { MinusCircleOutlined } from '@ant-design/icons'
import * as React from "react";

export interface BtnProps {
  // 按钮渲染类型 大部分对应element的样式， refresh显示刷新图标
  type?: 'default' | 'refresh' | 'primary';
  label: string;
  emit: string;
  // 按钮是否展示 默认值是 'always'
  show?: 'always' | 'never' | 'rule';
  // 满足数组中的规则时，会展示按钮
  rules?: {
    // 表格中控制按钮展示的key
    columnKey: string;
    // 表格中控制按钮展示的key对应的值， 就是说某个key的值是这个时，按钮展示
    columnValue: any;
  }[];
}

interface Props {
  name: string | string[];
  ColSpan: number;
  deafultType?: string;
}

const BtnConfig = (props: Props) => {
  return <div>btn</div>
  // return <>
    // <Form.List name={ props.name }>
    //   { (fields, { add, remove }, { errors }) => {
    //     return (
    //         <>
    //           <Form.Item label="按钮区域">
    //             <Button onClick={ () => add({
    //               label: '',
    //               value: '',
    //               type: props.deafultType ?? 'default'
    //             }) }>添加按钮</Button>
    //           </Form.Item>
    //           { fields.map(({ key, name, fieldKey, ...restField }) => (
    //               <Row key={ key }>
    //                 <Col span={ props.ColSpan }></Col>
    //                 <Col>
    //                   <Space align="baseline">
    //                     <Form.Item
    //                         labelCol={ { span: 8, offset: 0 } }
    //                         label="按钮文字"
    //                         { ...restField }
    //                         name={ [ name, 'label' ] }
    //                         fieldKey={ [ fieldKey, 'label' ] }
    //                         rules={ [ { required: true } ] }
    //                     >
    //                       <Input placeholder="按钮文字"/>
    //                     </Form.Item>
    //                     <Form.Item
    //                         labelCol={ { span: 8, offset: 0 } }
    //                         label="事件名称"
    //                         { ...restField }
    //                         name={ [ name, 'emit' ] }
    //                         fieldKey={ [ fieldKey, 'emit' ] }
    //                         rules={ [ { required: true } ] }
    //                     >
    //                       <Input placeholder="事件名称"/>
    //                     </Form.Item>
    //                     { props.deafultType ? null : <Form.Item
    //                         labelCol={ { span: 12, offset: 0 } }
    //                         label="按钮类型"
    //                         { ...restField }
    //                         name={ [ name, 'type' ] }
    //                         fieldKey={ [ fieldKey, 'type' ] }
    //                         rules={ [ { required: true } ] }
    //                     >
    //                       <Select>
    //                         <Select.Option value="default">默认</Select.Option>
    //                         <Select.Option value="primiary">高亮</Select.Option>
    //                         <Select.Option value="wraning">提示</Select.Option>
    //                       </Select>
    //                     </Form.Item>
    //                     }
    //                     <MinusCircleOutlined onClick={ () => remove(name) }/>
    //                   </Space>
    //                 </Col>
    {/*              </Row>*/}
    {/*          )) }*/}
    {/*        </>)*/}
    {/*  } }*/}
    {/*</Form.List>*/}
  // </>
}

export default BtnConfig;
