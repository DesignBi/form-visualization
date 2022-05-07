import React, {useState} from "react";
import {Form, Input, Select, Button} from "antd";
import {OptionType} from '../../../type'

const {Option} = Select;
let id = 0;
const buildDefault = (): OptionType => {
  return {
    id: ++id,
    label: '',
    value: '',
    type: ''
  }
}

function StepActionCallBack(props: any) {
  const [list, setList] = useState<OptionType[]>([buildDefault()])
  const onAdd = () => {
    list.push(buildDefault())
    // props.form.setFieldsValue({[props.config.key]: list})
    setList([...list])
  }
  const onDelete = (index: number) => {
    list.splice(index, 1)
    props.form.setFieldsValue({[props.config.key]: list})
    setList([...list])
  }
  const onChange = (val: string, name: 'type' | 'label' | 'value', index: number) => {
    list[index][name] = val
    setList([...list])
  }
  return (
    <div>
      {
        list.map((item, index) => (
          <div key={item.id}>
            {
              props.config.params.type === 'callbackAction' ?
                <Input.Group compact>
                  <Form.Item name={[props.config.key, index, 'type']} rules={[{required: props.config.required, message: '请选择类型'}]}>
                    <Select
                      onChange={(val:string) => onChange(val, 'type', index)}
                      style={{width: 316}}
                      placeholder="请选择类型">
                      {
                        props.config.options.map((item: OptionType) =>
                          <Option value={item.value} key={item.value}>{item.label}</Option>)
                      }
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <Button type="link" size="small" onClick={() => onAdd()}>新增</Button>
                    {index !== 0 ?
                      <Button type="text" danger size="small" onClick={() => onDelete(index)}>删除</Button> : ''}
                  </Form.Item>
                </Input.Group> : ''
            }
            <Input.Group compact>
              <Form.Item name={[props.config.key, index, 'label']} rules={[{required: props.config.required, message: '请选择表单项'}]}>
                <Select
                  onChange={(val:string) => onChange(val, 'label', index)}
                  style={{width: 158}}
                  placeholder="请选择表单项">
                  {
                    props.stepIndex !== undefined ?
                      props.stepsConfig[props.stepIndex].items.map((item: any, formItemIndex: number) => <Option
                        value={item.key} key={formItemIndex}>{item.name}</Option>) : ''
                  }
                </Select>
              </Form.Item>
              <Form.Item name={[props.config.key, index, 'value']} rules={[{required: props.config.required, message: '请输入选择器列表key'}]}>
                <Input style={{width: 158}} placeholder="请输入选择器列表key" onChange={(e) => onChange(e.target.value, 'value', index)}/>
              </Form.Item>
              {
                props.config.params.type === 'callback' ?
                  <Form.Item>
                    <Button type="link" size="small" onClick={() => onAdd()}>新增</Button>
                    {index !== 0 ?
                      <Button type="text" danger size="small" onClick={() => onDelete(index)}>删除</Button> : ''}
                  </Form.Item> : ''
              }
            </Input.Group>
          </div>
        ))
      }
    </div>
  )
}

export default StepActionCallBack