import  { useState, useEffect } from "react";
import { Modal, Form, Select, Input } from "antd";

interface Props {
  selectOptions: Options[];
  show: boolean;
  onCancel: (data?: any) => void;
}

const InsertWindow = (props: Props) => {
  const [ form ] = Form.useForm();
  const [ showSlotName, setShowSlotName ] = useState(false)
  const [ model ] = useState<ModuleItem>({
    label: '',
    type: '',
    name: '',
    canHaveChild: false
  })
  /**
   * 表单的值变化时触发，主要计算slotName这个选项是否要出现
   * */
  const getFormChange = (a: ModuleItem, { type }: ModuleItem) => {
    setShowSlotName(type === 'slot')
  }
  // 默认选中第一个值
  useEffect(() => {
    form.setFields([ { name: 'type', value: props.selectOptions[0]?.value || '' } ])
    getFormChange({
      canHaveChild: false,
      name: "",
      type: ''
    }, {
      canHaveChild: false,
      name: "",
      type: (props.selectOptions[0]?.value as ModuleItem["type"])
    })
  }, [ props.selectOptions ])
  const [ show, setShow ] = useState<boolean>(props.show)
  // 监听外部控制是否显示
  useEffect(() => {
    setShow(props.show);
  }, [ props.show ])
  return (
      <Modal title="新增子组件" visible={ show } onOk={ async () => {
        const flag = await form.validateFields()
        if (!flag) return
        flag.label = props.selectOptions.find(s => s.value === flag.type)?.label
        props.onCancel(flag);
        form.resetFields();
      } } onCancel={ () => {
        // 清空用户的输入
        props.onCancel();
        form.resetFields();
      } }>
        <Form form={ form } initialValues={ model } onValuesChange={ getFormChange }>
          <Form.Item label='子组件类型' name="type" rules={ [ { required: true } ] }>
            <Select placeholder="请选择组件名称">
              {
                props.selectOptions.map(v => (
                        <Select.Option value={ v.value } key={ v.value }>{ v.label }</Select.Option>
                    )
                )
              }
            </Select>
          </Form.Item>
          <Form.Item label='组件name' name="name" rules={ [ { required: true, message: '请输入组件名称 英文字母' }, {
            pattern: /[a-z]$/g,
            message: '请输入英文字母'
          } ] }>
            <Input placeholder="请输入组件名称"/>
          </Form.Item>
          { showSlotName ?
              <Form.Item label='插槽名称' name="slotName" rules={ [ { required: true, message: '请输入插槽名称 英文字母' }, {
                pattern: /[a-z]/g,
                message: '请输入英文字母'
              } ] }>
                <Input placeholder="请输入插槽名称"/>
              </Form.Item> : null
          }
        </Form>
      </Modal>
  )
}

export default InsertWindow
