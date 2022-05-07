import React, {useState} from "react";
import {Button, Form, Input} from "antd";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";
import {OptionType} from '../../../type'
let id = 0;
type inputType = 'label' | 'value'
const buildDefault = (): OptionType => {
  return {
    id: ++id,
    label: '',
    value: ''
  }
}
function AddOption (props: any) {
  const [options,setOptions] = useState<OptionType[]>([buildDefault()])
  const addOption = () => {
    options.push(buildDefault())
    props.form.setFieldsValue({options: options})
    setOptions([...options])
  }
  const deleteOption = (index: number) => {
    options.splice(index, 1)
    props.form.setFieldsValue({options: options})
    setOptions([...options])
  }
  const onChange = (e: any, type: string, index: number) => {
    options[index][type as inputType] = e.target.value
    setOptions([...options])
  }
  const validatorKey = (rule: any, value: string, callback: any) => {
    const res = options.filter(item => {
      if (item.value === value) {
        return item
      }
    })
    if (res.length >= 2) {
      return Promise.reject('请确保value是唯一的')
    } else {
      return Promise.resolve()
    }
  }
  return (
    <div>
      {
        options.map((item, index) => (
          <div className="flex" key={item.id}>
            <Form.Item name={['options',index,'label']} rules={[{required: true, message: '请输入label'}]}>
              <Input placeholder="请输入显示的label" onChange={(e) => onChange(e, 'label', index)}/>
            </Form.Item>
            <Form.Item name={['options',index,'value']} rules={[
              {required: true, message: '请输入value'},
              {
                validator: ((rule, value, callback) => validatorKey(rule, value, callback))
              }
            ]}>
              <Input placeholder="请输入提交后台的value" onChange={(e) => onChange(e, 'value', index)}/>
            </Form.Item>
            { index === 0 ? <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={() => addOption()}></Button> : ''}
            { index !== 0 ? <Button className="delete-option" type="primary" shape="circle" danger icon={<MinusOutlined />} onClick={() => deleteOption(index)}></Button> : ''}
          </div>
        ))
      }
    </div>
  )
}
export default AddOption