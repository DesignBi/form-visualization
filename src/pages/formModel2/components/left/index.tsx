import React, {useState} from "react";
import {Input, Select, Form, Button, message} from "antd";
// import './style.less'
import {FormItemConfig, formItemType} from "../../type";
import {SearchOutlined} from "@ant-design/icons";
import {
  dateConfig,
  dateRangeConfig,
  emailConfig,
  expiredDateConfig,
  fileConfig, filesUploadConfig,
  idCardConfig,
  imageConfig,
  imagesUploadConfig,
  multipleConfig,
  numberConfig,
  phoneConfig,
  radioConfig,
  selectConfig,
  serialNumberConfig,
  switchConfig,
  textareaConfig,
  textConfig,
  videoConfig
} from "../../formItemConfig";
const { Option } = Select;
const { TextArea } = Input;
interface BtnItem {
  name: string,
  icon: any,
  type: string,
  config: FormItemConfig[]
}
let id = 0;
function LeftComponent (props: any) {
  const { config } = props
  // 左侧按钮
  const btns:BtnItem[] = [
    { name: '编号', type: formItemType.text, icon: <SearchOutlined/>, config: serialNumberConfig },
    { name: '单行文本', type: formItemType.text, icon: <SearchOutlined/>, config: textConfig },
    { name: '多行文本', type:formItemType.textarea, icon: <SearchOutlined/>, config: textareaConfig },
    { name: '下拉框', type:formItemType.select, icon: <SearchOutlined/>, config: selectConfig },
    { name: '开关', type: formItemType.switch, icon: <SearchOutlined/>, config: switchConfig },
    { name: '单选框', type: formItemType.radio, icon: <SearchOutlined/>, config: radioConfig },
    { name: '多选下拉框', type: formItemType.multiple, icon: <SearchOutlined/>, config: multipleConfig },
    { name: '数字输入框', type: formItemType.number, icon: <SearchOutlined/>, config: numberConfig },
    { name: '整数输入框', type: formItemType.integer, icon: <SearchOutlined/>, config: numberConfig },
    { name: '日期', type: formItemType.date, icon: <SearchOutlined/>, config: dateConfig },
    { name: '证件有效期', type: formItemType.expiredDate, icon: <SearchOutlined/>, config: expiredDateConfig },
    { name: '手机号', type: formItemType.phone, icon: <SearchOutlined/>, config: phoneConfig },
    { name: '身份证号', type: formItemType.idcard, icon: <SearchOutlined/>, config: idCardConfig },
    { name: '邮箱', type: formItemType.email, icon: <SearchOutlined/>, config: emailConfig },
    { name: '日期范围', type: formItemType.dateRange, icon: <SearchOutlined/>, config: dateRangeConfig },
    { name: '文件上传', type: formItemType.file, icon: <SearchOutlined/>, config: fileConfig },
    { name: '图片上传', type: formItemType.image, icon: <SearchOutlined/>, config: imageConfig },
    { name: '视频上传', type: formItemType.video, icon: <SearchOutlined/>, config: videoConfig },
    { name: '图片集合', type: formItemType.imagesUpload, icon: <SearchOutlined/>, config: imagesUploadConfig },
    { name: '文件集合', type: formItemType.filesUpload, icon: <SearchOutlined/>, config: filesUploadConfig }
  ]
  // 中间form默认配置
  const btnFormItemConfig: Record<string, any> = {
    serialNumber: {type: 'serialNumber', key: '', id: '', name: '编号', placeholder: '请输入', formData: {}, options: [], show: true},
    text: {type: 'text', key: '', id: 1, name: '单行文本', placeholder: '请输入', formData: {}, options: [], show: true},
    textarea: {type: 'textarea', key: '', id: 2, name: '多行文本', placeholder: '请输入', formData: {}, show: true},
    select: {type: 'select', key: '', id: 3, name: '选择框', placeholder: '请选择', formData: {}, options: [], show: true},
    tabs: {type: 'tabs', key: '', id: 4, name: '', placeholder: '请选择', formData: {}, options: [], show: true},
    switch: {type: 'switch', key: '', id: 5, name: '开关', placeholder: '请选择', formData: {}, options: [], show: true},
    radio: {type: 'radio', key: '', id: 6, name: '单选框', placeholder: '请选择', formData: {}, show: true, options: [
        {label: '是', value: true },
        {label: '否', value: false }
      ]},
    multiple: {type: 'select', key: '', id: 7, name: '多选下拉框', placeholder: '请选择', formData: {}, show: true, params: { mode: 'multiple' }},
    number: {type: 'number', key: '', id: 8, name: '数字输入框', placeholder: '请输入数字', formData: {}, show: true},
    integer: {type: 'integer', key: '', id: 9, name: '整数输入框', placeholder: '请输入整数', formData: {}, show: true},
    date: {type: formItemType.date, key: '', id: 9, name: '日期', placeholder: '请选择日期', formData: {}, show: true},
    expiredDate: {type: formItemType.expiredDate, key: '', id: 9, name: '证件有效期', formData: {}, show: true},
    phone: {type: formItemType.text, key: '', id: 9, name: '手机号', formData: {}, show: true},
    idcard: {type: formItemType.text, key: '', id: 9, name: '身份证号', formData: {}, show: true},
    email: {type: formItemType.text, key: '', id: 9, name: '邮箱', formData: {}, show: true},
    dateRange: {type: formItemType.dateRange, key: '', id: 9, name: '日期范围', formData: {}, show: true},
    file: {type: formItemType.file, key: '', id: 9, name: '文件上传', placeholder: '文件上传', formData: {}, show: true},
    image: {type: formItemType.image, key: '', id: 9, name: '图片上传', placeholder: '图片上传', formData: {}, show: true},
    video: {type: formItemType.video, key: '', id: 9, name: '视频上传', placeholder: '视频上传', formData: {}, show: true},
    imagesUpload: {type: formItemType.imagesUpload, key: '', id: 9, name: '图片集合', placeholder: '图片集合', formData: {}, show: true},
    filesUpload: {type: formItemType.filesUpload, key: '', id: 9, name: '文件集合', placeholder: '文件集合', formData: {}, show: true}
  }
  const doubleClickBtn = (item: BtnItem) => {
    // if (!props.formDef) {
    //   props.form.validateFields()
    //   message.warning('请先填写表单定义');
    //   return
    // }
    // if (Object.keys(props.stepsConfig[props.tabActive].step).length === 0) {
    //   props.form.validateFields()
    //   message.warning('请先填写当前tab栏配置项');
    //   return
    // }
    const btnConfig = {...btnFormItemConfig[item.type]}
    btnConfig.id = ++id
    const config = [...props.stepsConfig]
    config[props.tabActive].items.push({
      formConfig: item.config,
      ...btnConfig
    })
    props.setStepsConfig([...config])
    console.log(config)
  }
  return (
    <div className="form-left">
      {
        btns.map((item, index) => (
          <Button key={index} icon={item.icon} onClick={() => doubleClickBtn(item)}>{ item.name }</Button>
        ))
      }
    </div>
  );
};
export default LeftComponent