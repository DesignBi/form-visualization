export interface Option {
  defaultValue?: string;
  id: number;
  label: string;
  value: string;
}

export interface ParentConfigForm {
  labelWidth: string,
  layout: 'column' | 'row',
  dictionary?: string[]
}

export interface FormItemOptions {
  // 循环使用的ID
  id: number,
  // key
  key: string;
  // 默认值
  defaultValue: string;
  // label文字
  label: string,
  // 表单控件的类型
  inputType: InputType,
  // 是否需要校验
  valid: boolean,
  // 使用的校验类型
  validValue: string[],
  // 是否使用字典
  showDictionary: boolean,
  // 字典名称
  dictionary: string,
  // 默认提示文字
  placeholder: string,
  options?: Option[],
  // 日期像前推X天
  dateBefore?: string;
  // 日期像后推X天
  dateAfter?: string;
  // 时间间隔 以逗号间隔
  dateRanger?: Date[];
  // 是否是可以选择的
  dateCanPlay: 'Y' | 'N';
}

export enum InputType {
  text = 'text',
  number = 'number',
  radio = 'radio',
  checkbox = 'checkbox',
  select = 'select',
  date = 'date',
  dateTime = 'dateTime',
  switch = 'switch',
  textArea = 'textArea',
  button = 'button',
  // 带有间隔的时间选者器
  daterange = 'daterange',
  default = ''
}

export interface ParentConfig {
  // 需要去查询的字典名称，统一读取后赋值
  dictionary?: string[];
  labelWidth: string;
  inline: boolean;
  labelPosition: 'right' | 'left' | 'top';
}

export interface validItem {
  type?: string;
  required?: boolean;
  valid?: RegExp;
  message: string;
  trigger: 'change' | 'input' | 'blur';
}

export interface FormInput {
  label?: string;
  defaultValue?: any;
  attr?: { [label: string]: any };
  placeholder?: string;
  eventName?: string;
}

export enum EventName {
  submit = 'submit',
  reset = 'reset'
}

export interface OptionsItem {
  label: string;
  value: string;
}

export interface DateConfig {
  // 日期像前推X天
  dateBefore?: number;
  // 日期像后推X天
  dateAfter?: number;
  // 时间间隔 以逗号间隔
  dateRanger?: string;
  // 是否是可以选择的
  canPlay: boolean;
}

export interface FormItem {
  validNames?: string[];
  // 表单项显示的文字，
  label?: string;
  // 接受用户输入值的key
  key: string;
  placeholder?: string;
  // 渲染表单时的默认值
  defaultValue: any;
  // 表单类型
  type?: InputType;
  // 同时多个表单时的配置项，一般用在 radio和checkbox
  input?: FormInput[];
  // 校验项
  valid?: validItem[];
  // 基本select的option的数据源
  options?: OptionsItem[];
  // 其他属性
  attr?: { [label: string]: any };
  // 事件名称
  eventName?: EventName;
  // 字典名称,一般用与从后台字典数据库中取值时的值
  dictionaryName?: string;
  // 时间相关的配置
  dataConfig?: DateConfig
}

export interface Req {
  parentConfig: ParentConfig,
  itemData: FormItem[]
}

// 输入框的类型
export const inputType = [
  {
    label: '文本输入',
    value: InputType.text
  },
  {
    label: '下拉选者',
    value: InputType.select
  },
  {
    label: '日期选择',
    value: InputType.date
  },
  {
    label: '日期区间',
    value: InputType.daterange
  },
  {
    label: '日期时间',
    value: InputType.dateTime
  },
  {
    label: '数字输入',
    value: InputType.number
  },
  {
    label: '单选',
    value: InputType.radio
  },
  {
    label: '多选',
    value: InputType.checkbox
  },
  {
    label: '开关',
    value: InputType.switch
  },
  {
    label: '文本框',
    value: InputType.textArea
  }
];
// 校验可用的类型
export const validCheckbox = [
  {
    label: '必填',
    value: 'required'
  },
  {
    label: '数字',
    value: 'number'
  },
  {
    label: '邮箱',
    value: 'email'
  }
];
// 校验类型对应的规则
export const validRules: { [l: string]: validItem } = {
  required: {
    required: true,
    message: '请输入该项',
    trigger: 'change'
  },
  number: {
    type: 'number',
    message: '请输入数字',
    trigger: 'change'
  },
  email: {
    type: 'email',
    message: '请输入正确的邮箱',
    trigger: 'change'
  }
}
