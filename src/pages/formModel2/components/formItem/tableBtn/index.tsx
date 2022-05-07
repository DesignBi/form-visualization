import React, {useState} from "react";
import { Input, Select, Form, Button } from "antd";
import { OptionType } from '../../../type'
import './style.less'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
const { Option } = Select;
const { TextArea } = Input;
let id = 0;
const buildDefault = () => {
  return {
    id: ++id,
    type: '',
    name: '',
    tip: ''
  }
}
type inputType = 'name' | 'tip'
function TableBtn (props: any) {
  const { config } = props
  const [btns, setBtns] = useState(props.form.getFieldValue(props.config.key) || [buildDefault()])
  const addBtn = () => {
    btns.push(buildDefault())
    props.form.setFieldsValue({tableBtn: btns})
    setBtns([...btns])
  }
  const onDelete = (index: number) => {
    btns.splice(index, 1)
    props.form.setFieldsValue({[props.config.key]: btns})
    setBtns([...btns])
  }
  const onTypeChange = (val: string, index: number) => {
    btns[index].type = val
    setBtns([...btns])
  }
  const onInputChange = (e: any, type: string, index: number) => {
    btns[index][type as inputType] = e.target.value
    setBtns([...btns])
  }
  return (
    <div>
      { btns.map((item: any, index: number) => (
        <div key={item.id}>
          <Input.Group compact style={{ display: 'flex', alignItems:"center" }}>
            <Form.Item
              name={[config.key, index, 'type']}
              noStyle
            >
              <Select placeholder="按钮类型" style={{ width: '30%' }} onChange={(val:string) => onTypeChange(val, index)}>
                { config.options.map((item: OptionType) => (
                  <Option value={item.value} key={item.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name={[config.key, index, 'name']}
              noStyle>
              <Input style={{ width: '60%' }} placeholder="按钮名称"  onChange={(e) => onInputChange(e, 'name', index)}/>
            </Form.Item>
            {index !== 0 ?
              <Form.Item noStyle>
                <MinusCircleOutlined className="icon-delete" onClick={() => onDelete(index)}/>
              </Form.Item> : ''
            }
          </Input.Group>
          <Form.Item name={[config.key, index, 'tip']}>
            <TextArea placeholder="提示内容" onChange={(e) => onInputChange(e, 'tip', index)}/>
          </Form.Item>
        </div>
      ))}
      <div className="btn_warp">
        <Button icon={<PlusOutlined />} onClick={addBtn}>新增表格按钮</Button>
      </div>
    </div>
  );
};
export default TableBtn