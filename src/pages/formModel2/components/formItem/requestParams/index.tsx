import React, {useState} from "react";
import {Button, Form, Input, Select} from "antd";
const { Option } = Select;
let id = 0;
type inputType = 'label' | 'value' | 'name'
type RequestParamsType = 'original' | 'mapping'
interface RequestParams {
  id: number,
  type: RequestParamsType
  label: string,
  value: string,
  name: string,
  stepKey?: string
  stepIndex?: number
}
const buildDefault = (): RequestParams => {
  return {
    id: ++id,
    type: 'original',
    label: '',
    value: '',
    name: ''
  }
}
function RequestParams (props: any) {
  const [requestParams, setRequestParams] = useState<RequestParams[]>(props.form.getFieldValue(props.config.key) || [])
  const onAdd = () => {
    requestParams.push(buildDefault())
    setRequestParams([...requestParams])
  }
  const onDelete = (index: number) => {
    requestParams.splice(index, 1)
    props.form.setFieldsValue({[props.config.key]: requestParams})
    setRequestParams([...requestParams])
  }
  const onChange = (e: any, name: inputType, index: number) => {
    requestParams[index][name] = e.target.value
    setRequestParams([...requestParams])
  }
  const selectChange = (val:RequestParamsType, index: number) => {
    requestParams[index].type = val
    requestParams[index].value = ''
    props.form.setFieldsValue({[props.config.key]: requestParams})
    setRequestParams([...requestParams])
  }
  const valueSelectChange = (val: string, index: number) => {
    requestParams[index].value = val
    setRequestParams([...requestParams])
  }
  const stepSelectChange = (val:string, index: number) => {
    requestParams[index].stepKey = val
    props.stepsConfig.forEach((item: any, i: number) => {
      if (item.step.key === val) requestParams[index].stepIndex = i
    })
    setRequestParams([...requestParams])
  }
  return (
    <div>
      {
        requestParams.length === 0 ? <Button type="link" onClick={() => onAdd()}>添加</Button> :
        requestParams.map((item, index) => (
          <div key={item.id}>
            <Input.Group compact >
              <Form.Item name={[props.config.key, index, 'name']} rules={[{required: true, message: '请输入key'}]}>
                <Input style={{ width: 280 }} placeholder={`key, ${props.config.key}: { key: {}}`} onChange={(e) => onChange(e, 'name', index)}/>
              </Form.Item>
              <Form.Item>
                <Button type="link" size="small" onClick={() => onAdd()}>新增</Button>
                <Button type="text" danger size="small" onClick={() => onDelete(index)}>删除</Button>
              </Form.Item>
            </Input.Group>
            <Input.Group compact>
              <Form.Item name={[props.config.key, index, 'type']} rules={[{required: true, message: '请选择类型'}]}>
                <Select style={{ width: 200 }} placeholder="请选择类型" onChange={(val:RequestParamsType) => selectChange(val, index)}>
                  <Option value="original">原值</Option>
                  <Option value="mapping">映射</Option>
                </Select>
              </Form.Item>
              <Form.Item name={[props.config.key, index, 'label']} rules={[{required: true, message: '请输入label'}]}>
                <Input placeholder="请输入label" onChange={(e) => onChange(e, 'label', index)}/>
              </Form.Item>
            </Input.Group>
            { item.type === 'mapping' ?
              <Input.Group compact>
                <Form.Item rules={[{required: true, message: '请选择步骤'}]}>
                  <Select style={{ width: 200 }} placeholder="请选择步骤" onChange={(val:RequestParamsType) => stepSelectChange(val, index)}>
                    { props.stepsConfig.map((item: any, stepIndex: number) => <Option value={item.step.key} key={stepIndex}>{item.step.title}</Option>)}
                  </Select>
                </Form.Item>
                <Form.Item name={[props.config.key, index, 'value']} rules={[{required: true, message: '请选择值'}]}>
                  <Select style={{ width: 200 }} placeholder="请选择步骤子项" onChange={(val:RequestParamsType) => valueSelectChange(val, index)}>
                    {
                      item.stepIndex !== undefined ?
                        props.stepsConfig[item.stepIndex].items.map((item: any, formItemIndex: number) => <Option value={item.key} key={formItemIndex}>{item.name}</Option>) : ''
                    }
                  </Select>
                </Form.Item>
              </Input.Group> :
              <Form.Item name={[props.config.key, index, 'value']} rules={[{required: true, message: '请输入value'}]}>
                <Input placeholder="请输入value" onChange={(e) => onChange(e, 'value', index)}/>
              </Form.Item>
            }
          </div>
        ))
      }
    </div>
  )
}
export default RequestParams