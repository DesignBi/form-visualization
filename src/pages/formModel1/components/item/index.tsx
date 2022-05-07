import React, { useEffect, useState } from "react";
import { Checkbox, DatePicker, Form, Input, Select, Switch } from 'antd';
import { FormItemOptions, InputType, inputType, Option, validCheckbox } from "../../type";
import Options from './options';
import { FormInstance } from "antd/lib/form/hooks/useForm";
import DateItem from './date'

const buildDefaultValue = (type: string) => {
  switch (type) {
    case InputType.text:
    case InputType.select:
    case InputType.number:
      return <Input placeholder="如有需要，请输入默认值"></Input>
    case InputType.textArea:
      return <Input.TextArea placeholder="如有需要，请输入默认值"></Input.TextArea>
    case InputType.switch:
      return <Checkbox>默认打开</Checkbox>
    case InputType.checkbox:
      return <Input placeholder="如有需要，请输入默认值多个值请以逗号间隔"></Input>
    case InputType.date:
      return <DatePicker style={ { width: '100%' } } placeholder="如有需要，请选择默认值"></DatePicker>
    case InputType.daterange:
      return <DatePicker.RangePicker style={ { width: '100%' } }></DatePicker.RangePicker>
    case InputType.dateTime:
      return <DatePicker showNow showTime style={ { width: '100%' } } placeholder="如有需要，请选择默认值"></DatePicker>
    default:
      return <Input placeholder="如有需要，请输入默认值"></Input>
  }
}
// 是否显示添加Options
const showOptions = (label: string): boolean => [ 'select', 'checkbox', 'radio' ].indexOf(label) > -1;
// 是否显示配置placeholer的配置
const showPlaceholder = (label: string): boolean => [ '', 'radio', 'checkbox', 'switch' ].indexOf(label) === -1
const layout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 1, span: 16 },
};

interface Props {
  formData: FormItemOptions,
  onGetFormCtl: (ctl: FormInstance<any>) => void;
}

function FormItem(props: Props) {
  const [ itemForm ] = Form.useForm();
  const [ formData, setFormData ] = useState(props.formData)
  useEffect(() => {
    props.onGetFormCtl(itemForm);
  })
  const validSwitchChange = (checked: boolean) => {
    const data = { ...formData }
    data.valid = checked
    setFormData(data)
  }

  const inputTypeChoose = (e: InputType) => {
    const data = { ...formData }
    itemForm.setFieldsValue({ defaultValue: '' })
    data.inputType = e
    setFormData(data)
  }

  const getOptionsChange = (op: Option[]) => {
    const data = { ...itemForm.getFieldsValue() };
    data.options = op;
    itemForm.setFieldsValue(data);
  }

  return (
      <Form { ...layout } initialValues={ props.formData } form={ itemForm }>
        <Form.Item label="label" name="label" rules={ [ { required: true, message: '请输入label，空白的表单会让人抓狂' } ] }>
          <Input placeholder="请输入label"></Input>
        </Form.Item>
        <Form.Item label="KEY" name="key" rules={ [ { required: true, message: '请输入key，要不后台同事会提刀来见你' } ] }>
          <Input placeholder="请输入key"></Input>
        </Form.Item>
        <Form.Item label="表单类型" name="inputType" rules={ [ { required: true, message: '请选择表单类型' } ] }>
          <Select placeholder="请输入label" onChange={ inputTypeChoose }>
            {
              inputType.map(v => (
                  <Select.Option key={ v.value } value={ v.value }>{ v.label }</Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        {
          formData.inputType ? <Form.Item label="默认值" name="defaultValue">
            { buildDefaultValue(formData.inputType) }
          </Form.Item> : null
        }
        {
          showPlaceholder(formData.inputType) ? <Form.Item label="提示文字" name="placeholder">
            <Input placeholder="默认用户输入值"/>
          </Form.Item> : null
        }
        {
          formData.inputType === InputType.select ? <Form.Item label="字典表" name="showDictionary">
            <Switch onChange={ e => {
              const data = { ...formData };
              data.showDictionary = e;
              setFormData(data);
            }
            }/>
          </Form.Item> : null
        }
        {
          formData.showDictionary ? <Form.Item label="字典表名称" name="dictionary">
            <Input placeholder="字典表名称"/>
          </Form.Item> : null
        }
        {
          formData.inputType === InputType.date ? <DateItem itemForm={ itemForm }></DateItem> : null
        }
        {
          // 创建Options
          showOptions(formData.inputType) && !formData.showDictionary ? <Form.Item label="Option" name="options">
            <Options onGetOptionsChange={ getOptionsChange }></Options>
          </Form.Item> : null
        }
        <Form.Item label="是否校验" name="valid">
          <Switch onChange={ validSwitchChange }/>
        </Form.Item>
        {
          formData.valid ? (<Form.Item label="是否校验" name="validValue">
            <Checkbox.Group>
              {
                validCheckbox.map(v => (
                    <Checkbox key={ v.value } value={ v.value }>{ v.label }</Checkbox>
                ))
              }
            </Checkbox.Group>
          </Form.Item>) : null
        }
      </Form>
  )
}

export default FormItem;
