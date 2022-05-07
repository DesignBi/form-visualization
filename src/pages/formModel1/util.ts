import {
  FormInput,
  FormItem,
  FormItemOptions,
  InputType,
  Option,
  OptionsItem,
  ParentConfigForm,
  Req,
  // validRules
} from "./type";
import moment from "moment";
import { submit } from './api'

/**
 * 处理Options
 * @param ops 用户加入的options
 * @param type 根据不同的表单类型处理成不同的数据
 * */
const buildOptions = (ops: Option[], type: InputType.radio | InputType.checkbox | InputType.select): FormInput[] | OptionsItem[] => {
  return ops.map((v) => {
    if (type === InputType.select) {
      return {
        label: v.label,
        value: v.value
      } as OptionsItem
    } else {
      return {
        label: v.label,
        defaultValue: v.value
      } as FormInput
    }
  })
}
/**
 * 处理每个表单项。根据不同的状态修改不同的值
 * @param item 表单项
 * @return {FormItem} 处理后的值
 * */
const buildTypeData: {
  [l: string]: (item: FormItemOptions, data: FormItem) => FormItem
} = {
  [InputType.select as string]: (item: FormItemOptions, data: FormItem): FormItem => {
    // 如果使用字典就删除options
    // 不使用的话就以options为准
    if (item.showDictionary) {
      data.dictionaryName = item.dictionary
    } else {
      data.options = item.options && buildOptions(item.options, InputType.select) as OptionsItem[];
    }
    return data;
  },
  [InputType.radio as string]: (item: FormItemOptions, data: FormItem): FormItem => {
    console.log('radio, checkox')
    data.input = item.options && buildOptions(item.options, InputType.checkbox) as FormInput[]
    return data;
  },
  [InputType.checkbox as string]: (item: FormItemOptions, data: FormItem): FormItem => {
    console.log('radio, checkox')
    data.input = item.options && buildOptions(item.options, InputType.checkbox) as FormInput[]
    return data;
  },
  [InputType.date]: (item: FormItemOptions, data: FormItem): FormItem => {
    data.dataConfig = {
      dateBefore: Number(item.dateBefore) || 0,
      dateAfter: Number(item.dateAfter) || 0,
      canPlay: item.dateCanPlay === 'Y',
      dateRanger: [ moment(item.dateRanger?.[0]).format('YYYY-MM-DD'), moment(item.dateRanger?.[1]).format('YYYY-MM-DD') ].join(',')
    }
    return data;
  }
}

/**
 * 修正数据格式，并发送给后端
 * @param parentConfig 全局配置
 * @param ops 表单项的配置文件
 * */
export const buildPostData = async (parentConfig: ParentConfigForm, ops: FormItemOptions[]): Promise<boolean> => {
  const data: Req = {
    parentConfig: {
      labelWidth: parentConfig.labelWidth + 'px',
      inline: parentConfig.layout === 'row',
      labelPosition: 'left',
      dictionary: []
    },
    itemData: []
  };
  data.itemData = ops.map(v => {
    const item: FormItem = {
      type: v.inputType,
      label: v.label,
      defaultValue: v.defaultValue,
      key: v.key,
      placeholder: v.placeholder,
      validNames: v.validValue
    }
    if (typeof buildTypeData[v.inputType] === 'function') buildTypeData[v.inputType](v, item);
    if (v.showDictionary && v.dictionary) {
      data.parentConfig.dictionary?.push(v.dictionary)
    }
    return item;
  })
  const res = await submit(data);
  return Promise.resolve(res && res.code === 0)
}
