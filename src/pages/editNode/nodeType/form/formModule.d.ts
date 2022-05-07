import { TagItem } from '@/components/utils/commonType';

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
  upload = 'upload'
}

export enum EventName {
  submit = 'submit',
  reset = 'reset'
}

export interface ParentConfig {
  // 需要去查询的字典名称，统一读取后赋值
  dictionary?: string[];
  labelWidth: string | number;
  inline: boolean;
  labelPosition: 'right' | 'left' | 'top';
  showMessage?: boolean;
  resetText?: string;
  submitText?: string;
  size?: 'mini' | 'small' | 'medium';
  showBtn: boolean;
}

export interface validItem {
  validator?: (rule: validItem, value: any, callback: (err?: Error) => void) => any;
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

export interface DateConfig {
  // 日期像前推X天
  dateBefore?: number;
  // 日期像后推X天
  dateAfter?: number;
  // 时间间隔 以逗号间隔
  dateRanger?: string;
  // 是否是可以选择的
  canPlay: boolean;
  // 时间开始的key
  startKey?: string;
  // 时间结束的key
  endKey?: string;
}

// 联动逻辑
export interface ShowRule {
  // 哪个key触发
  sourceKey: string;
  // 具体某个值等于哪个值时出现，如果是any的话，就是只有有值就触发规则
  sourceValue: any[] | 'any';
  // 目前仅仅提供显示与隐藏
  ruleType: 'show';
  // 被应用的key
  playKey: string[];
}

// 联动显示使用目前暂时未启用
export interface ItemRule {
  // 具体某个值等于哪个值时出现，如果是any的话，就是只有有值就触发规则
  sourceValue: string[] | 'any';
  // 被应用的key
  playKey: string[];
}

// 上传文件的配置项
export interface UploadConfig {
  // 需要上传的文件类型， 主要影响显示已上传文件的展示样式
  type: 'image' | 'file';
  // 最大上传文件的显示数量
  limit?: number;
  // 大小限制 以KB为单位
  size?: number;
  // 提示文字
  tip: string[];
}

export interface OptionsItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface FormItem {
  show?: boolean;
  // 校验规则
  validNames?: string[];
  // 表单项显示的文字，
  label?: string;
  // 接受用户输入值的key1
  key: string;
  // 输入框内的提示文字
  placeholder?: string;
  // 渲染表单时的默认值
  defaultValue: any;
  // 表单类型
  type?: InputType;
  // 同时多个表单时的配置项
  input?: FormInput[];
  // 校验项，校验规则实例化后存储的位置，不在传入的配置JSON中体现
  valid?: validItem[];
  // 基本select的option的数据源，也在 radio和checkbox
  options?: OptionsItem[];
  // 其他HTML属性
  attr?: { [label: string]: any };
  // 事件名称
  eventName?: EventName;
  // 字典名称,一般用与从后台字典数据库中取值时的值
  dictionaryName?: string;
  // 时间相关的配置
  dateConfig?: DateConfig;
  // 联动显示使用目前暂时未启用
  rules?: ItemRule[];
  // 上传管理配置
  uploadConfig: UploadConfig;
}

export interface FormMethods {
  setData: (data: { [k: string]: any }) => void;
  getData: () => Promise<{ [l: string]: any }>;
  reset: () => { [l: string]: any };
}

export interface UseFormProps {
  sn: string;
  handlder: (name: string, data: any[]) => void;
}
