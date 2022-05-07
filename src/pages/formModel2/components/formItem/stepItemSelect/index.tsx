import React, {useEffect, useState} from "react";
import { Input, Select, Row, Col } from "antd";
import {getStepOptions} from "../../../configTransform";
import {OptionType} from "../../../type";
const { Option } = Select;
function StepItemSelect (props: any) {
  const steps = getStepOptions(props.stepsConfig)
  const [stepItems, setStepItems] = useState([])
  const [stepActive, setStepActive] = useState(-1)
  const [stepValue, setStepValue] = useState('')
  const [stepItemValue, setStepItemValue] = useState('')
  useEffect(() => {
    if (props.value) {
      const relyItemArr = props.value.split('.')
      const idx = steps.findIndex(item => item.value === relyItemArr[0])
      setStepActive(idx)
      setStepItems(props.stepsConfig[idx].items)
      setStepValue(relyItemArr[0])
      setStepItemValue(relyItemArr[1])
    }
  }, []);
  const onStepChange = (val: string) => {
    const idx = steps.findIndex(item => item.value === val)
    setStepActive(idx)
    setStepValue(val)
    setStepItems(props.stepsConfig[idx].items)
  }
  const onStepItemChange = (val: string) => {
    setStepItemValue(val)
    props.change({
      stepValue: steps[stepActive].value,
      stepItemValue: val
    })
  }
  return (
    <Row>
      <Col span={12}>
        <Select
          placeholder='请选择步骤'
          value={stepValue}
          onChange={onStepChange}
          allowClear>
          {
            steps.map((item: OptionType) => <Option value={item.value} key={item.value}>{item.label}</Option>)
          }
        </Select>
      </Col>
      <Col span={12}>
        <Select
          placeholder='请选择步骤子项'
          value={stepItemValue}
          onChange={onStepItemChange}
          allowClear>
          {
            stepItems.map((item: {key: string, name: string}) => <Option value={item.key} key={item.key}>{item.name}</Option>)
          }
        </Select>
      </Col>
    </Row>
  );
};
export default StepItemSelect