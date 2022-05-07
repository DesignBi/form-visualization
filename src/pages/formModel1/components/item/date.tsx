import React, { useState } from "react";
import { Radio, DatePicker, Form, Input } from 'antd';
import { FormInstance } from "antd/lib/form/hooks/useForm";

const buildItem: { [l: string]: () => JSX.Element } = {
  'before': () =>
      (<Form.Item name="dateBefore" label="X">
        <Input placeholder="请输入像前推的天数"></Input>
      </Form.Item>),
  after: () => (<Form.Item name="dateAfter" label="X">
    <Input placeholder="请输入像后推的天数"></Input>
  </Form.Item>),
  range: () => (
      <>
        <Form.Item name="dateCanPlay" label="规则代表" initialValue={ 'Y' }>
          <Radio.Group>
            <Radio value="Y">可选</Radio>
            <Radio value="N">不可选</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="time" label="时间间隔">
          <DatePicker.RangePicker></DatePicker.RangePicker>
        </Form.Item>
      </>
  )
}

function DateItem({ itemForm }: { itemForm: FormInstance<any> }) {
  const [ dateRule, setDateRule ] = useState<string>('default');

  return (
      <>
        <Form.Item name="dateRule" label="限制规则" initialValue={ 'default' }>
          <Radio.Group onChange={ e => {
            setDateRule(e.target.value);
            itemForm.setFieldsValue({
              dateCanPlay: 'Y',
              dateAfter: '',
              dateBefore: ''
            })
          } }>
            <Radio value="default">不限制</Radio>
            <Radio value="before">当天像前推X天</Radio>
            <Radio value="after">当天像后推X天</Radio>
            <Radio value="range">指定时间段</Radio>
          </Radio.Group>
        </Form.Item>
        {
          buildItem[dateRule] && buildItem[dateRule]()
        }
      </>
  )
}

export default DateItem;
