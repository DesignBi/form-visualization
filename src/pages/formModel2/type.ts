
export interface OptionType{
  label: string,
  value: string,
  id?: number,
  type?: string
}
export interface ShowRule{
  key?: string,
  val?: any,
  show: boolean,
  tabFormData: any
}
export interface FormItemConfig {
  type: string,
  key: string,
  name: string,
  placeholder?: string,
  required: boolean,
  rules?: any[],
  show?: boolean,
  formData?: any,
  optionsKey?: string,
  options?: OptionType[],
  id?: number,
  formConfig?: any,
  defaultValue?: any,
  params?: any,
  showRule?: ({key, val, show, tabFormData}: ShowRule) => boolean
}
export type ConfigKey = 'dictionary' | 'check'
export enum formItemType {
  serialNumber= 'serialNumber',
  text= 'text',
  number= 'number',//数字
  integer = 'integer',//整数
  textarea = 'textarea',
  select = 'select',
  switch = 'switch',
  addOption = 'addOption',//新增本地options
  checkbox = 'checkbox',
  radio = 'radio',
  tabs = 'tabs',
  tipType = 'tipType',//提示类型
  tableBtn = 'tableBtn',//表格按钮
  multiple = 'multiple',
  date = 'date',
  expiredDate= 'expiredDate',//证件有效期
  phone = 'phone',//手机号
  idcard = 'idcard',//身份证号
  email = 'email',
  dateRange = 'dateRange',
  file = 'file',
  image = 'image',
  video = 'video',
  imagesUpload = 'imagesUpload',//图片集合
  filesUpload = 'filesUpload',//文件集合
  requestParams = 'requestParams',
  stepCallBack = 'stepCallBack',
  dependencyControl = 'dependencyControl'//依赖控制，显示、禁用、取值依赖
}
export interface Actions {
  id: number
  name: string
  params: any
  step_key_code: string
  sort: number
  type: string
  value: string,
  callback: Record<string, any>
}
export interface StepRes{
  name: string
  formData?: any,
  formConfig?: any,
}
export interface StepsConfig{
  items: FormItemConfig[],
  step: any,
  actions: any[]
}
export interface FormDef {
  name: string,
  step_key_code: string,
  title: string,
  type: string,
  value: string,
  description: string,
  instance_title: string
}
export enum SelectedType {
  formDef= 'formDef',
  formItem= 'formItem',
  formStep= 'formStep',
  formStepAction= 'formStepAction'
}