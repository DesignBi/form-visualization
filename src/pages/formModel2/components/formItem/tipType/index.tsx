import React, {useState} from "react";
import { Input, Select, Form } from "antd";
import {OptionType} from "../../../type";
import './style.less'
const { Option } = Select;
const { TextArea } = Input;
function TipType (props: any) {
  const { config } = props
  // const [data, setData] = useState({})
  const onChange = () => {
  }
  return (
    <div>
      <Form.Item name={[config.key, 'type']} noStyle>
      <Select
        placeholder="请选择提示类型"
        onChange={onChange}
        allowClear>
        {
          config.options ? config.options.map((item: OptionType) => {
            return (<Option value={item.value} key={item.value}>{item.label}</Option>)
          }) : ''
        }
      </Select>
      </Form.Item>
      <Form.Item name={[config.key, 'title']} noStyle>
        <TextArea placeholder="请输入提示内容"/>
      </Form.Item>
    </div>
  );
};
export default TipType