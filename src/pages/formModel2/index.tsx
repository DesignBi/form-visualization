import React, {useState, useEffect} from "react";
import {Button, Form, message, Tag} from 'antd';
import {SearchOutlined, MinusCircleOutlined, ArrowUpOutlined, ArrowDownOutlined, PlusOutlined} from '@ant-design/icons';
import './style.less'
import BuildFormItem from './components/formItem'
import { FormItemConfig, StepsConfig, SelectedType, Actions } from "./type";
import {
  tabsConfig,
  formDefConfig,
  formStepActionConfig
} from './formItemConfig'
import KmjsTabs from "./components/Tabs";
import LeftComponent from "./components/left";
import RightComponent from "./components/right";
interface StepActions {
  formConfig: any[],
  formData: any,
  id: number
}
let id = 0;
const defaultTab = (formConfig: FormItemConfig[]) => {
  return {
    step: {},
    items: [] as FormItemConfig[],
    actions: []
  }
}
const defaultStepAction = () => {
  return {
    id: ++id,
    name: '',
    params: null,
    step_key_code: '',
    sort: 0,
    type: '',
    value: '',
    callback: {}
  }
}
const setDefaultData = (form: any) => {
  const fieldsValue: Record<string, any> = {}
  formDefConfig.forEach((item: FormItemConfig) => {
    if (item.defaultValue) fieldsValue[item.key] = item.defaultValue || ''
  })
  form.setFieldsValue(fieldsValue)
}
function FormModel2() {
  const [form] = Form.useForm();
  const [formModel] = Form.useForm();
  const tailLayout = {
    wrapperCol: {offset: 21, span: 10},
  }
  const [selectedIndex, setSelectedIndex] = useState(-1)
  let [selectedType, setSelectedType] = useState<string>(SelectedType.formDef)
  let [tabActive, setTabActive] = useState(0)
  let [stepActionsIndex, setStepActionsIndex] = useState<number>(-1)
  //右侧配置项数据源
  const [currentFormItemConfig, setCurrentFormItemConfig] = useState<FormItemConfig[]>(formDefConfig)
  // 表单定义数据def
  const [formDef, setFormDef] = useState<{
    description: string,
    instance_title: string,
    name: string,
    step_type: string,
    title: string,
  }>()
  //步骤项+步骤子项配置+步骤动作
  const [stepsConfig, setStepsConfig] = useState<StepsConfig[]>([defaultTab(tabsConfig)])
  useEffect(() => {
    const formStr = localStorage.getItem('form')
    if (formStr) {
      const formConfig = JSON.parse(formStr)
      setStepsConfig(formConfig.formSteps)
      setFormDef(formConfig.formDef)
      form.setFieldsValue(formConfig.formDef)
    }
  }, []);
  //选中表单项，展示右侧配置
  const selectedFormItem = (index: number) => {
    if (index === selectedIndex) return
    setSelectedType(SelectedType.formItem)
    form.resetFields();
    setSelectedIndex(index)
    if (Object.keys(stepsConfig[tabActive].step).length !== 0) {
      stepsConfig[tabActive].items[index].formConfig.forEach((item: FormItemConfig) => {
        if (item.showRule) {//初始化隐藏值
          item.show = item.showRule({
            tabFormData: stepsConfig[tabActive].step,
            show: Boolean(item.show)
          })
        }
      })
    }
    setCurrentFormItemConfig(stepsConfig[tabActive].items[index].formConfig)
    form.setFieldsValue({...stepsConfig[tabActive].items[index].formData})
  }
  const onTabChange = (index: number) => {
    setSelectedType(SelectedType.formStep)
    form.resetFields()
    setSelectedIndex(-1)
    setStepActionsIndex(-1)
    setTabActive(index)
    setCurrentFormItemConfig(tabsConfig)
    form.setFieldsValue({
      ...stepsConfig[index].step
    })
  }
  const onTabAdd = () => {
    if (Object.keys(stepsConfig[stepsConfig.length - 1].step).length === 0) {
      form.validateFields()
      message.warning('请先填写当前tab栏配置项');
      return
    }
    stepsConfig.push(defaultTab(tabsConfig))
    setTabActive(stepsConfig.length - 1)
    form.resetFields()
    if (Object.keys(stepsConfig[stepsConfig.length - 1].step).length === 0) {
      setDefaultData(form)
    }
    setCurrentFormItemConfig([...tabsConfig])
    setStepsConfig([...stepsConfig])
  }
  const onTabRemove = (index: number) => {
    stepsConfig.splice(index, 1)
    setTabActive(0)
    form.setFieldsValue({
      ...stepsConfig[0].step
    })
    setStepsConfig([...stepsConfig])
  }
  const onFormItemRemove = (index: number) => {
    stepsConfig[tabActive].items.splice(index, 1)
    setStepsConfig([...stepsConfig])
  }
  const onFormItemUp = (index: number) => {
    const items = stepsConfig[tabActive].items
    items.splice(index - 1, 0, (items[index]))
    items.splice(index + 1, 1)
    setStepsConfig([...stepsConfig])
  }
  const onFormItemDown = (index: number) => {
    const items = stepsConfig[tabActive].items
    items.splice(index + 2, 0, (items[index]))
    items.splice(index, 1)
    setStepsConfig([...stepsConfig])
  }
  const onClickTitle = () => {
    if (selectedType === SelectedType.formDef) return
    setSelectedType(SelectedType.formDef)
    setCurrentFormItemConfig([...formDefConfig])
    form.setFieldsValue({...formDef})
  }
  const onSubmit = () => {
    console.log(stepsConfig)
    localStorage.setItem('form', JSON.stringify({
      formSteps: stepsConfig,
      formDef: formDef
    }))
  }
  const renderStepActions = () => {
    const onStepActionRemove = (e: React.MouseEvent, index: number) => {
      e.preventDefault()
      stepsConfig[tabActive].actions.splice(index, 1)
      setStepsConfig([...stepsConfig])
    }
    const onAddStepAction = () => {
      stepsConfig[tabActive].actions?.push(defaultStepAction())
      setStepActionsIndex(stepsConfig[tabActive].actions.length - 1)
      setCurrentFormItemConfig([...formStepActionConfig])
      setStepsConfig([...stepsConfig])
    }
    const onSelectedStepAction = (index: number) => {
      form.resetFields()
      setSelectedType(SelectedType.formStepAction)
      setStepActionsIndex(index)
      setCurrentFormItemConfig([...formStepActionConfig])
      form.setFieldsValue({...stepsConfig[tabActive].actions[index]})
    }
    return (
      <div>
        {
          stepsConfig[tabActive].actions.map((item, index) => (
            <Tag
              key={item.id}
              color={stepActionsIndex === index ? '#108ee9' : ''}
              closable
              onClose={e => onStepActionRemove(e, index)}
              onClick={() => onSelectedStepAction(index)}>
              {item.name || '动作名称' }
            </Tag>
          ))
        }
        <Tag className="site-tag-plus" onClick={onAddStepAction}>
          <PlusOutlined />新增步骤
        </Tag>
      </div>
    )
  };
  return (
    <div className="form-model">
      <LeftComponent formDef={formDef} form={form} stepsConfig={stepsConfig} tabActive={tabActive} setStepsConfig={setStepsConfig}></LeftComponent>
      <div className="form-content">
        <h2 className={`form-title ${selectedType === SelectedType.formDef ? 'selected' : ''}`} onClick={onClickTitle}>{ formDef?.name || '请填写表单定义'}</h2>
        <KmjsTabs
          activeKey={tabActive} stepsConfig={stepsConfig}
          onChange={(index: number) => onTabChange(index)}
          onRemove={onTabRemove}
          onAdd={() => onTabAdd()}>
        </KmjsTabs>
        <div className="form-step-actions">
          <span className="title">步骤动作：</span>
          { renderStepActions() }
        </div>
        <Form
          onFinish={onSubmit}
          form={formModel}
          name="form"
          labelCol={{span: 5}}
          wrapperCol={{span: 19}}
          initialValues={{remember: true}}
          autoComplete="off">
          {
            stepsConfig[tabActive].items.map((item, i) => {
              return (
                <div style={{display: "flex"}} key={item.id}>
                  <div className={`form-item ${selectedIndex === i ? 'selected' : ''}`}
                       onClick={() => selectedFormItem(i)}>
                    {
                      BuildFormItem({stepsConfig, stepIndex: tabActive, config: item, form})
                    }
                  </div>
                  <div className="form-item-actions">
                    <MinusCircleOutlined className="remove-form-item" onClick={() => onFormItemRemove(i)}/>
                    { i !== 0 ? <ArrowUpOutlined onClick={() => onFormItemUp(i)}/> : ''}
                    { i !== stepsConfig[tabActive].items.length - 1 ? <ArrowDownOutlined onClick={() => onFormItemDown(i)}/> : ''}
                  </div>
                </div>
              )
            })
          }
          <Form.Item wrapperCol={{ offset: 20, span: 24 }} className="footer_warp">
            <Button type="primary" htmlType="submit">确认</Button>
          </Form.Item>
        </Form>
      </div>
      <RightComponent config={{ form, currentFormItemConfig,  selectedType, stepsConfig, tabActive, selectedIndex, stepActionsIndex,
        setFormDef, setStepsConfig, setCurrentFormItemConfig }}></RightComponent>
    </div>
  )
}

export default FormModel2;
