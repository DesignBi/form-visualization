import React, {useEffect, useState} from "react";
import {Input, Row, Col, Button} from "antd";
import { } from 'antd/lib/'
import StepItemSelect from '../stepItemSelect'
import {StepsConfig} from "../../../type";
let id = 0;
const buildDefault = (val: string = '') => {
  return {
    id: ++id,
    val: val
  }
}
interface PropsData {
  value: {
    relyItem: string
    relyValue: string[],
  },
  form: any,
  stepsConfig: StepsConfig[]
}
function DependencyControl(props: PropsData) {
  const [relyValue, setRelyValue] = useState<{id: number, val: string}[]>([])
  const [relyItem, setRelyItem] = useState('')
  useEffect(() => {
    if (props.value) {
      const list: { id: number, val: string }[] = []
      props.value.relyValue.forEach(val => {
        list.push(buildDefault(val))
      })
      setRelyValue([...list])
    } else {
      setRelyValue([buildDefault()])
    }
  }, []);
  const stepItemSelectChange = (data: { stepValue: string, stepItemValue: string }) => {
    setRelyItem(`${data.stepValue}.${data.stepItemValue}`)
  }
  const onAdd = () => {
    setRelyValue([...relyValue, buildDefault()])
  }
  const onDelete = (idx: number) => {
    relyValue.splice(idx, 1)
    setRelyValue([...relyValue])
  }
  const stepItemValueChange = (val:string, idx: number) => {
    relyValue[idx].val = val
    props.form.setFieldsValue({
      rely_on: {
        relyValue: relyValue.map(item => item.val),
        relyItem: relyItem
      }
    })
  }
  return (
    <div>
      <StepItemSelect stepsConfig={props.stepsConfig} value={props.value?.relyItem || ''} change={stepItemSelectChange}></StepItemSelect>
      {
        relyValue.map((item, idx:number) => (
          <Row key={item.id}>
            <Col span={20}>
              <Input value={item.val} placeholder='请输入依赖步骤子项的值' onChange={(e) => stepItemValueChange(e.target.value, idx)}/>
            </Col>
            <Col span={4}>
              { idx === relyValue.length - 1 ? <Button type="link" onClick={onAdd}>新增</Button> : ''}
              { idx !== relyValue.length - 1 ? <Button type="link" danger onClick={() => onDelete(idx)}>删除</Button> : ''}
            </Col>
          </Row>
        ))
      }
    </div>
  );
};
export default DependencyControl