import {FormItemConfig,ShowRule} from './type'
/**
 * 是否展示组件操作
 */
export const showFormItemRuleMethod = {
  dictionaryName: ({ tabFormData, key, val, show}: ShowRule): boolean => {
    return key === 'sourceType' && val === 'dictionary'
  },
  businessSn: ({ tabFormData, key, val, show}: ShowRule): boolean => {
    return key === 'sourceType' && val === 'business'
  },
  option: ({ tabFormData, key, val, show}: ShowRule): boolean => {
    return key === 'sourceType' && val === 'option'
  },
  businessSubmit({ tabFormData, key, val, show}: ShowRule): boolean {
    if(key === 'business_submit') return val
    return show
  },
  bpmSubmit({ tabFormData, key, val, show}: ShowRule): boolean {
    if(key === 'bpm_submit') return val
    return show
  },
  componentName({ tabFormData, key, val, show}: ShowRule): boolean {
    if(key === 'formType') return val === 'custom'
    return show
  },
  formTypeGrid({ key, val, show}: ShowRule): boolean {
    if(key === 'formType') return val === 'grid'
    return show
  },
  isGrid({ tabFormData, key, val, show}: ShowRule): boolean {//表单类型为表格
    if (tabFormData.formType === 'grid') return true
    return show
  },
  isSelectOrFormInsert({ key, val, show}: ShowRule): boolean {//动作类型为选择器或表单新增
    console.log(key, val)
    if (key === 'type') return val === 'select' || val === 'formInsert'
    return show
  },
}