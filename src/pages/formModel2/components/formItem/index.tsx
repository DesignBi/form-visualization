import {Button, Form, Input, Select, Switch, Checkbox, Radio, InputNumber, DatePicker} from 'antd';
import React from "react";
import './style.less'
import {FormItemConfig, OptionType, formItemType, StepsConfig} from '../../type'
import AddOption from './addOption'
import KmjsTabs from './Tabs'
import TipType from './tipType'
import TableBtn from './tableBtn'
import RequestParams from './requestParams'
import StepCallBack from './stepCallBack'
import {getStepOptions} from "../../configTransform";
import DependencyControl from "./dependencyControl";

const {Option} = Select;
const {TextArea} = Input;
const {RangePicker} = DatePicker;

interface CallBack {
  (config: FormItemConfig, event: any): void;
}

function integerParser(val: string | undefined = '') {
  return /^\d+$/.test(val) ? val : ''
}

function BuildFormItem({stepsConfig, stepIndex, config, form, callBack
}: { stepsConfig: StepsConfig[], stepIndex: number, config: FormItemConfig, form: any, callBack?: CallBack }) {
  let formItem;
  const onSelectChange = (value: string) => {
    if (callBack) callBack(config, value)
  }
  const onChange = (config: FormItemConfig, e: any) => {
    if (callBack) callBack(config, e)
  }
  switch (config.type) {
    case formItemType.text:
      formItem = (
        <Input placeholder={config.placeholder}/>
      )
      break;
    case formItemType.number:
      formItem = (
        <InputNumber
          style={{width: '100%'}}
          placeholder={config.placeholder}
        />
      )
      break;
    case formItemType.integer:
      formItem = (
        <InputNumber
          style={{width: '100%'}}
          placeholder={config.placeholder}
          parser={integerParser}
        />
      )
      break;
    case formItemType.textarea:
      formItem = (
        <TextArea placeholder={config.placeholder}/>
      )
      break;
    case formItemType.select:
      let options: OptionType[] = []
      if (config.optionsKey === 'formStep') {//获取步骤项
        options = getStepOptions(stepsConfig)
      } else {
        options = config.options || []
      }
      formItem = (
        <Select
          mode={config?.params?.mode}
          placeholder={config.placeholder}
          onChange={onSelectChange}
          allowClear>
          {
            options ? options.map((item: OptionType) => <Option value={item.value}
                                                                key={item.value}>{item.label}</Option>) : ''
          }
        </Select>
      )
      break;
    case formItemType.switch:
      formItem = (
        <Switch onChange={(event) => onChange(config, event)}/>
      )
      break;
    case formItemType.checkbox:
      formItem = (
        <Checkbox.Group>
          {
            config.options?.map(item => (
              <Checkbox value={item.value} key={item.value} style={{lineHeight: '32px'}}>{item.label}</Checkbox>
            ))
          }
        </Checkbox.Group>
      )
      break;
    case formItemType.radio:
      formItem = (
        <Radio.Group onChange={(event) => onChange(config, event)}>
          {
            config.options?.map(item => (
              <Radio value={item.value} key={item.value}>{item.label}</Radio>
            ))
          }
        </Radio.Group>
      )
      break;
    case formItemType.date:
      formItem = (
        <DatePicker/>
      )
      break;
    case formItemType.dateRange:
      formItem = (
        <RangePicker/>
      )
      break;
    case formItemType.addOption:
      formItem = (
        <AddOption form={form} config={config}></AddOption>
      )
      break;
    case formItemType.tabs:
      formItem = (
        <KmjsTabs></KmjsTabs>
      )
      break;
    case formItemType.tipType:
      formItem = (
        <TipType config={config}></TipType>
      )
      break;
    case formItemType.tableBtn:
      formItem = (
        <TableBtn form={form} config={config}></TableBtn>
      )
      break;
    case formItemType.requestParams:
      formItem = (
        <RequestParams stepsConfig={stepsConfig} form={form} config={config}></RequestParams>
      )
      break;
    case formItemType.stepCallBack:
      formItem = (
        <StepCallBack stepsConfig={stepsConfig} stepIndex={stepIndex} form={form} config={config}></StepCallBack>
      )
      break;
    case formItemType.dependencyControl:
      formItem = (
        <DependencyControl stepsConfig={stepsConfig} form={form} value={{
          relyItem: '',
          relyValue: [],
        }}></DependencyControl>
      )
      break;
    default:
      formItem = (
        <Button type="primary">{config.placeholder}</Button>
      )
      break;
  }
  ;
  return (
    config.show ? <Form.Item
      name={config.type !== formItemType.addOption ? config.key : undefined}
      label={config.name}
      key={config.id || config.key}
      required={config.required}
      rules={config.rules}
      valuePropName={config.type === formItemType.switch ? 'checked' : undefined}>
      {formItem}
    </Form.Item> : null
  )
}

export default BuildFormItem