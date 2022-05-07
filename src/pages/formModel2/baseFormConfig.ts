import {showFormItemRuleMethod} from "./method";
import {formItemType} from "./type";
import {
  actionsType,
  callBackActionsType,
  formType, selectModeOptions,
  sourceType,
  stepTypeOptions,
  tableBntOptions,
  tipOptions, whetherOptions
} from "./options";
import DependencyControl from "./components/formItem/dependencyControl";

export const baseFormConfig = {
  title: { type: 'text', key: 'title', name: '标题', placeholder: '请输入label', show: true, required: true, rules: [{required: true, message: '请输入标题'}]},
  key: { type: 'text', key: 'key', name: 'key', placeholder: '请输入value', show: true, required: true, rules: [{required: true, message: '请输入key'}]},
  required: { type: 'switch', key: 'required', name: '是否必须', show: true},
  defaultValue: { type: 'text', key: 'defaultValue', name: '默认值', placeholder: '如有需要，请输入默认值', show: true},
  switchDefaultValue: { type: 'switch', key: 'defaultValue', name: '默认值', show: true},
  dateRangeDefaultValue: { type: formItemType.dateRange, key: 'defaultValue', name: '默认值', show: true},
  dateDefaultValue: { type: formItemType.date, key: 'defaultValue', name: '默认值', show: true},
  placeholder: { type: 'text', key: 'placeholder', name: '提示文字', placeholder: '默认提示文字', show: true},
  dictionary: { type: 'switch', key: 'dictionary', name: '字典', show: true},
  sourceType: { type: 'select', key: 'sourceType', name: '数据来源类型', show: true, options: sourceType},
  businessSn: { type: 'text', key: 'sourceValue', name: '业务sn', placeholder: '数据来源业务sn', show: false, showRule: showFormItemRuleMethod.businessSn},
  dictionaryName: { type: 'text', key: 'sourceValue', name: '字典表名', placeholder: '字典表名称', show: false, showRule: showFormItemRuleMethod.dictionaryName },
  option: { type: 'addOption', key: 'option', name: 'option', show: false, showRule: showFormItemRuleMethod.option},
  maxLength: { type: 'text', key: 'length', name: '字符长度', placeholder: '字符最大长度', show: true},
  check: { type: 'switch', key: 'check', name: '是否检验', show: true},
  checkRules: {
    type: 'checkbox', key: 'checkRules', name: '校验方式', show: false, options: [
      {label: '必填', value: 'required'},
      {label: '数字', value: 'number'},
      {label: '邮箱', value: 'email'}
    ]
  },
  formType: {
    type: 'select', key: 'formType', name: '表单类型', placeholder: '请选择表单类型', required: true, rules: [{required: true, message: '请选择表单类型'}], show: true, options: formType},
  componentName: { type: 'text', key: 'componentName', name: '组件名', placeholder: '自定义组件名称', show: false, showRule: showFormItemRuleMethod.componentName },
  isEdit: { type: 'radio', key: 'isEdit', name: '是否允许编辑', defaultValue: true, show: true, options: whetherOptions},
  tipConfig: { type: 'tipType', key: 'tipConfig', name: '提示类型', show: true, options: tipOptions},
  tableBtn: { type: 'tableBtn', key: 'tableBtn', name: '表格按钮', show: false, showRule: showFormItemRuleMethod.formTypeGrid, options: tableBntOptions},
  tableMinCount: { type: formItemType.integer, key: 'tableMinCount', name: '表格至少需要几条数据', show: false, showRule: showFormItemRuleMethod.formTypeGrid},
  unit: { type: 'text', key: 'unit', name: '单位', placeholder: '例如:人、万元等', show: true },
  sort: { type: formItemType.number, key: 'sort', name: '排序', placeholder: '请输入排序值', show: true },
  tip: { type: 'text', key: 'tip', name: '提示内容', placeholder: '请输入提示内容', show: true },
  incrementDefSn: { type: 'text', key: 'incrementDefSn', name: '取号规则', placeholder: '请输入取号规则', show: true, required: true, rules: [{required: true, message: '请输入取号规则'}]},
  isHide: { type: formItemType.switch, key: 'isHide', name: '是否隐藏', show: true},
  useDefault: { type: formItemType.switch, key: 'useDefault', name: '使用默认值', defaultValue: false, show: true},
  gridWidth: { type: formItemType.text, key: 'gridWidth', name: '表格项宽度', show: false, showRule: showFormItemRuleMethod.isGrid },
  table_hide: { type: formItemType.switch, key: 'table_hide', name: '表格列隐藏', show: false, showRule: showFormItemRuleMethod.isGrid },
  key_mapping: { type: formItemType.text, key: 'key_mapping', name: '映射key', show: true},
  business_submit: { type: formItemType.radio, key: 'business_submit', name: '是否需要提交业务', show: true, options: whetherOptions},
  business_query_mapping_sn: { type: formItemType.text, key: 'business_query_mapping_sn', name: '业务查询接口sn', show: true },
  business_sn_mapping: { type: formItemType.text, key: 'business_sn_mapping', name: '业务sn映射', show: false, showRule: showFormItemRuleMethod.businessSubmit},
  business_add_mapping_sn: { type: formItemType.text, key: 'business_add_mapping_sn', name: '业务新增接口sn', show: false, showRule: showFormItemRuleMethod.businessSubmit},
  business_update_mapping_sn: { type: formItemType.text, key: 'business_update_mapping_sn', name: '业务修改接口sn', show: false, showRule: showFormItemRuleMethod.businessSubmit},
  bpm_submit: { type: formItemType.radio, key: 'bpm_submit', name: '是否需要提交流程', show: true, options: whetherOptions},
  bpm_submit_mapping_sn: { type: formItemType.text, key: 'bpm_submit_mapping_sn', name: '流程提交接口sn', show: false, showRule: showFormItemRuleMethod.bpmSubmit},
  max: { type: formItemType.number, key: 'max', name: '最大数值', show: true },
  min: { type: formItemType.number, key: 'min', name: '最小数值', show: true },
  beforePoint: { type: formItemType.integer, key: 'beforePoint', name: '前小数点位数', show: true },
  afterPoint: { type: formItemType.integer, key: 'afterPoint', name: '后小数点位数', show: true },
  isGridTotal: { type: formItemType.switch, key: 'isGridTotal', name: '是否合计列', show: false, showRule: showFormItemRuleMethod.isGrid },
  dateFormat: { type: formItemType.text, key: 'dateFormat', name: '时间格式', show: true },
  limit_count: { type: formItemType.integer, key: 'limit_count', name: '上传限制数量', show: true },
  selector_title: { type: formItemType.text, key: 'selector_title', name: '选择器标题', show: true },
  requestParams: { type: formItemType.requestParams, key: 'requestParams', name: '请求参数', show: true },
  rely_on: { type: formItemType.dependencyControl, key: 'rely_on', name: '显示依赖', show: true },
  value_rely: { type: formItemType.dependencyControl, key: 'value_rely', name: '取值依赖', show: true },
  disabled_rely: { type: formItemType.dependencyControl, key: 'disabled_rely', name: '禁用依赖', show: true },
}
export const baseFormDefConfig = {
  name: { type: formItemType.text, key: 'name', name: '名称', placeholder: '请输入名称', show: true, required: true, rules: [{required: true, message: '请输入名称'}]},
  description: { type: formItemType.text, key: 'description', name: '描述', placeholder: '请输入描述', show: true, required: true, rules: [{required: true, message: '请输入描述'}]},
  instance_title: { type: formItemType.text, key: 'instance_title', name: '草稿标题', placeholder: '请输入草稿标题', show: true},
  title: { type: formItemType.text, key: 'title', name: 'tab标题', placeholder: '请输入tab标题', show: true, required: true, rules: [{required: true, message: '请输入tab标题'}]},
  step_type: { type: formItemType.radio, key: 'step_type', name: '步骤类型', placeholder: '请选择步骤类型', show: true, required: true, rules: [{required: true, message: '请选择步骤类型'}], options: stepTypeOptions},
}

export const baseFormStepActionConfig = {
  step_key_code: { type: formItemType.select, key: 'step_key_code', name: '表单步骤', placeholder: '请选择表单步骤', optionsKey: 'formStep', show: true, required: true, rules: [{required: true, message: '请选择表单步骤'}]},
  name: { type: formItemType.text, key: 'name', name: '名称', placeholder: '请输入名称', show: true, required: true, rules: [{required: true, message: '请输入名称'}]},
  title: { type: formItemType.text, key: 'title', name: '标题', placeholder: '请输入标题', show: true, required: true, rules: [{required: true, message: '请输入标题'}]},
  type: { type: formItemType.select, key: 'type', name: '动作类型', placeholder: '请选择动作类型', show: true, required: true, rules: [{required: true, message: '请选择动作类型'}], options: actionsType},
  value: { type: formItemType.text, key: 'value', name: '值', placeholder: '请输入值', show: true, required: true, rules: [{required: true, message: '请输入值'}]},
  selectMode: { type: formItemType.select, key: 'selectMode', name: '选择模式', placeholder: '选择模式', show: true, options: selectModeOptions},
  requestParams: { type: formItemType.requestParams, key: 'requestParams', name: '请求参数', show: true },
  renderParams: { type: formItemType.requestParams, key: 'renderParams', name: '渲染参数', show: true },
  callback: { type: formItemType.stepCallBack, key: 'callback', name: '回调', required: true, show: false, showRule: showFormItemRuleMethod.isSelectOrFormInsert, params: { type: 'callback' } },
  callbackAction: { type: formItemType.stepCallBack, key: 'callbackAction', name: '回调动作', required: false, show: false, options: callBackActionsType, showRule: showFormItemRuleMethod.isSelectOrFormInsert, params: { type: 'callbackAction' } }
}