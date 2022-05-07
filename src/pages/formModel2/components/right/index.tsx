import React, {useState} from "react";
import {Input, Select, Form, Button, message} from "antd";
// import './style.less'
import {FormItemConfig, formItemType, SelectedType} from "../../type";
import BuildFormItem from "../formItem";

const {Option} = Select;
const {TextArea} = Input;

interface BtnItem {
  name: string,
  icon: any,
  type: string,
  config: FormItemConfig[]
}

let id = 0;

function RightComponent(props: any) {
  const {
    form, currentFormItemConfig, selectedType, stepsConfig, tabActive, selectedIndex, stepActionsIndex,
    setFormDef, setStepsConfig, setCurrentFormItemConfig
  } = props.config
  //右侧配置确认完成
  const onFinish = (values: any) => {
    console.log(values)
    switch (selectedType) {
      case SelectedType.formItem:
        const data = stepsConfig[tabActive].items[selectedIndex]
        stepsConfig[tabActive].items[selectedIndex].formData = values
        data.name = values.title
        data.key = values.key
        data.options = values.options
        break;
      case SelectedType.formStep:
        stepsConfig[tabActive].step = values
        break;
      case SelectedType.formDef:
        setFormDef({...values})
        break;
      case SelectedType.formStepAction:
        stepsConfig[tabActive].actions[stepActionsIndex] = values
        break;
    }
    setStepsConfig([...stepsConfig])
    message.success('保存成功');
    console.log(stepsConfig)
  }
  const onChange = (config: FormItemConfig, value: any) => {
    currentFormItemConfig.forEach((item: FormItemConfig) => {
      if (item.showRule) {
        item.show = item.showRule({
          key: config.key,
          val: form.getFieldValue(config.key),
          show: Boolean(item.show),
          tabFormData: stepsConfig[tabActive].step
        })
      }
    })
    setCurrentFormItemConfig([...currentFormItemConfig])
  }
  return (
    <Form
      className="form-config"
      form={form}
      name="formConfig"
      onFinish={onFinish}
      labelCol={{span: 6}}
      wrapperCol={{span: 18}}
      initialValues={{remember: true}}
      autoComplete="off">
      {
        currentFormItemConfig.map((item: FormItemConfig) => {
          return (BuildFormItem({stepsConfig, stepIndex: tabActive, config: item, form, callBack: onChange}))
        })
      }
      <Form.Item wrapperCol={{ offset: 20, span: 24 }} className="footer_warp">
        <Button type="primary" htmlType="submit">确认</Button>
      </Form.Item>
    </Form>
  );
};
export default RightComponent