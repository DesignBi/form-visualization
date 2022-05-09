import react from "react";
import { Form, Input, Space, Button, Row, Col, Select } from "antd";
import { MinusCircleOutlined } from '@ant-design/icons'
import * as React from "react";

interface Props {
  name: string | string[];
  ColSpan: number;
  label?: string;
}

const OptionsConfig = (props: Props) => {
  return <div>OptionsConfig</div>
  // return <>
  //   <Form.List name={ props.name }>
  //     { (fields, { add, remove }, { errors }) => {
  //       return (
  //           <>
  //             <Form.Item label={ props.label ?? '数据源' }>
  //               <Button onClick={ () => add({
  //                 label: '',
  //                 value: ''
  //               }) }>添加数据</Button>
  //             </Form.Item>
  //             { fields.map(({ key, name, fieldKey, ...restField }) => (
  //                 <Row key={ key }>
  //                   <Col span={ props.ColSpan }></Col>
  //                   <Col>
  //                     <Space align="baseline">
  //                       <Form.Item
  //                           labelCol={ { span: 8, offset: 0 } }
  //                           label="标题"
  //                           { ...restField }
  //                           name={ [ name, 'label' ] }
  //                           fieldKey={ [ fieldKey, 'label' ] }
  //                           rules={ [ { required: true } ] }
  //                       >
  //                         <Input placeholder="标题"/>
  //                       </Form.Item>
  //                       <Form.Item
  //                           labelCol={ { span: 8, offset: 0 } }
  //                           label="值"
  //                           { ...restField }
  //                           name={ [ name, 'value' ] }
  //                           fieldKey={ [ fieldKey, 'value' ] }
  //                           rules={ [ { required: true } ] }
  //                       >
  //                         <Input placeholder="value"/>
  //                       </Form.Item>
  //                       <MinusCircleOutlined onClick={ () => remove(name) }/>
  //                     </Space>
  //                   </Col>
  //                 </Row>
  //             )) }
  //           </>)
  //     } }
  {/*  </Form.List>*/}
  {/*</>*/}
}

export default OptionsConfig;
