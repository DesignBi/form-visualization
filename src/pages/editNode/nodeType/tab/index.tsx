import  { useState } from "react";

import { FormInstance } from "antd/es/form/hooks/useForm";
import { Form, Input, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import BtnConfig from "../BtnConfig";

interface FormData {
  defaultValue: string
}

interface Props {
  defaultData?: FormData,
  getFormInterface: (formInterface: FormInstance) => void
}

const TabModule = (props: Props) => {
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
        label="默认Tab"
        name="defaultValue"
        rules={ [ { required: true, message: '请输入默认Tab' } ] }
    >
      <Input placeholder="请输入默认选中的tab的对应的value"/>
    </Form.Item>
  </Form>
}

export default TabModule;
