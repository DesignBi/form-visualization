import  { useState } from 'react';
import { Card, Form, Input, Switch } from "antd";
import BtnConfig, { BtnProps } from "../BtnConfig";
import { useForm } from "antd/es/form/Form";
import { FormInstance } from "antd/es/form/hooks/useForm";

interface FormData {
  title: string,
  canBack: boolean,
  actions: BtnProps[]
}

interface Props {
  defaultData?: FormData,
  getFormInterface: (formInterface: FormInstance) => void
}

const HeaderConfig = (props: Props) => {
  const [ formInterface ] = useForm()
  props.getFormInterface(formInterface)
  const [ formModel ] = useState(props.defaultData || {
    title: '',
    canBack: true,
    actions: []
  })

  return (
      <Form
          form={ formInterface }
          name="wrapHeader"
          labelCol={ { span: 2 } }
          wrapperCol={ { span: 18 } }
          initialValues={ formModel }
      >
        <Form.Item
            label="标题"
            name="title"
            rules={ [ { required: true, message: '请输入页面标题' } ] }
        >
          <Input placeholder="如不需要标题，请输入 '不需要'"/>
        </Form.Item>
        <Form.Item
            label="是否支持返回"
            name="canBack"
            valuePropName="checked"
            rules={ [ { required: true } ] }
        >
          <Switch/>
        </Form.Item>
        <BtnConfig ColSpan={ 2 } name="actions"/>
      </Form>
  )
}

export default HeaderConfig
