import {configTransform} from "./configTransform";
import {baseFormConfig, baseFormDefConfig, baseFormStepActionConfig} from "./baseFormConfig";
// 右侧表单配置项
// 表单定义
export const formDefConfig = configTransform(baseFormDefConfig, ['name', 'description', 'step_type', 'instance_title', 'title'])
// 表单步骤动作
export const formStepActionConfig = configTransform(baseFormStepActionConfig, ['name', 'title', 'type', 'value', 'selectMode', 'requestParams', 'renderParams', 'callback', 'callbackAction'])
// 编号
export const serialNumberConfig = configTransform(baseFormConfig, [
  'title', 'key', 'key_mapping', 'required', 'useDefault', 'defaultValue', 'unit', 'sort', 'tip', 'incrementDefSn', 'isHide', 'table_hide', 'gridWidth', 'rely_on'
])
//单行文本
export const textConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'maxLength', 'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
//下拉框
export const selectConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'sourceType', 'option', 'businessSn', 'dictionaryName',
  'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth',
])
//多行文本
export const textareaConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'maxLength', 'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
//开关
export const switchConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'switchDefaultValue', 'sourceType', 'option', 'businessSn', 'dictionaryName',
  'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'
])
//tab栏 表单步骤
export const tabsConfig = configTransform(baseFormConfig, [
  'title', 'key', 'key_mapping', 'formType', 'componentName', 'tableMinCount', 'isEdit', 'business_query_mapping_sn',
  'business_submit', 'business_sn_mapping', 'business_add_mapping_sn', 'business_update_mapping_sn',
  'bpm_submit', 'bpm_submit_mapping_sn', 'tipConfig', 'tableBtn'
])
// 单选框
export const radioConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'sourceType', 'option', 'businessSn', 'dictionaryName',
  'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth', 'requestParams'])
// 多选下拉框
export const multipleConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'sourceType', 'option', 'businessSn', 'dictionaryName',
  'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth',
])
// 数字类型
export const numberConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'isGridTotal', 'useDefault', 'defaultValue', 'sourceType', 'option', 'businessSn', 'dictionaryName',
  'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth', 'min', 'max', 'beforePoint', 'afterPoint',
])
// 日期类型
export const dateConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'dateDefaultValue', 'dateFormat', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 证件有效期
export const expiredDateConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 日期范围
export const dateRangeConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'dateRangeDefaultValue', 'unit', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 手机号
export const phoneConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 身份证号
export const idCardConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 邮箱
export const emailConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'useDefault', 'defaultValue', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 文件上传
export const fileConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 图片上传
export const imageConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 视频上传
export const videoConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 文件列表上传
export const filesUploadConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'limit_count', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])
// 图片列表上传
export const imagesUploadConfig = configTransform(baseFormConfig, [
  'title', 'key', 'required', 'limit_count', 'sort', 'tip', 'isHide', 'table_hide', 'gridWidth'])