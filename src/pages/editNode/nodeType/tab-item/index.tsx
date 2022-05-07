import  { useState } from "react";

import { FormInstance } from "antd/es/form/hooks/useForm";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

interface FormData {
  title: string;
  value: string;
  disable?: boolean;
}

interface Props {
  defaultData?: FormData,
  getFormInterface: (formInterface: FormInstance) => void
}

const TabItemModule = (props: Props) => {
  const [ formInterface ] = useForm()
  props.getFormInterface(formInterface)
  const [ formModel ] = useState(props.defaultData || {
    defaultValue: ''
  })
  return <Form
      form={ formInterface }
      name="wrapHeader"
      labelCol={ { span: 2 } }
      wrapperCol={ { span: 18 } }
      initialValues={ formModel }
  >
    <Form.Item
        label="标题"
        name="title"
        rules={ [ { required: true, message: '请输入标题' } ] }
    >
      <Input placeholder="请输入标题"/>
    </Form.Item>
    <Form.Item
        label="value"
        name="value"
        rules={ [ { required: true, message: '请输入value' } ] }
    >
      <Input placeholder="请输入value"/>
    </Form.Item>
  </Form>
}

export default TabItemModule;
