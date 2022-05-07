import React, { useState } from "react";
import './sty.less';
import { Button, Card, Form, Input, Radio, message } from 'antd';
import FormItem from "./components/item";
import { FormItemOptions, InputType, ParentConfigForm } from "./type";
import { FormInstance } from "antd/lib/form/hooks/useForm";
import { ValidateFields } from "rc-field-form/es/interface";
import { buildPostData } from "./util";

let id = 0;
const layout = {
  labelCol: { span: 1 },
  wrapperCol: { span: 16 },
};
const formControl: { [l: string]: ValidateFields<any> } = {}
const buildDefaultItem = (): FormItemOptions => {
  return {
    key: '',
    defaultValue: '',
    id: ++id,
    // label文字
    label: '',
    // 表单控件的类型
    inputType: InputType.default,
    // 是否需要校验
    valid: false,
    // 使用的校验类型
    validValue: [],
    // 是否使用字典
    showDictionary: false,
    // 字典名称
    dictionary: '',
    // 默认提示文字
    placeholder: '',
    dateBefore: '',
    dateAfter: '',
    dateCanPlay: 'Y',
    dateRanger: []
  }
}


function FormModel1() {
  const [ ParentForm ] = Form.useForm();
  const [ btnLoad, setBtnLoad ] = useState(false);
  const [ formItem, setFormItem ] = useState<FormItemOptions[]>([
    buildDefaultItem()
  ])
  const getFormCtl = (ctl: FormInstance<any>, id: number) => {
    formControl[id.toString()] = ctl.validateFields;
  }
  const addFormItem = () => {
    let data: FormItemOptions[] | null = [ ...formItem ];
    data.push(buildDefaultItem());
    setFormItem(data);
    data = null;
  }
  const subFormItem = (v: FormItemOptions) => {
    let data: FormItemOptions[] | null = [ ...formItem ];
    const index = data.indexOf(v);
    Reflect.deleteProperty(formControl, v.id.toString());
    data.splice(index, 1);
    setFormItem(data);
    data = null;
  }

  const getValData = () => {
    if (btnLoad) return;
    const arr: ValidateFields[] = Object.values(formControl);
    Promise.all([ ParentForm.validateFields(), ...arr.map(v => v()) ]).then(async res => {
      setBtnLoad(true);
      const flag = await buildPostData(res[0], res.slice(1));
      flag && message.success('提交成功')
      setBtnLoad(false);
    }).catch(e => {
      message.error('请修改页面上的错误项')
      console.log('e', e);
    })
  }
  return (
      <div className="form-model">
        <h1 className="title">模式一动态表单配置</h1>
        <Card title="基础配置" extra={
          [ <Button onClick={ getValData } style={ { marginRight: '10px' } }>排序</Button>,
            <Button type={ "primary" } onClick={ getValData } loading={ btnLoad }>提交</Button> ]
        }>
          <Form { ...layout } form={ ParentForm } initialValues={ { layout: 'column' } } name="labelWidth">
            <Form.Item label="label宽度" name="labelWidth" rules={ [ { required: true, message: '请输入label宽度' } ] }>
              <Input placeholder="请输入label宽度"></Input>
            </Form.Item>
            <Form.Item label="布局" name="layout" rules={ [ { required: true, message: '请选择布局方向' } ] }>
              <Radio.Group>
                <Radio value={ 'column' }>竖向</Radio>
                <Radio value={ 'row' }>横向</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Card>
        {
          formItem.map(v => {
            return <Card key={ v.id } style={ { marginTop: '10px' } } title="表单项" extra={
              [
                <Button size="small" key="add" onClick={ addFormItem } style={ { marginRight: '10px' } }>添加</Button>,
                formItem.length > 1 ?
                    <Button size="small" key="del" onClick={ () => subFormItem(v) } danger>删除</Button> : null
              ]
            }>
              <FormItem formData={ v } onGetFormCtl={ (ctl: FormInstance<any>) => getFormCtl(ctl, v.id) }></FormItem>
            </Card>
          })
        }
      </div>
  )
}

export default FormModel1;



