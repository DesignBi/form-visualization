import {FormItemConfig, OptionType, StepsConfig} from "./type";

/**
 * 表单配置转换，并初始化公共参数
 * @param config
 * @param options
 */
export function configTransform(config:any, options: string[]): FormItemConfig[] {
  const data: FormItemConfig[] = []
  options.forEach((name: string) => {
    data.push({
      showRule: undefined,
      ...config[name]
    })
  })
  return data
}

/**
 * 获取表单步骤
 * @param steps
 */
export function getStepOptions(steps: StepsConfig[]): OptionType[]{
  const options:OptionType[] = []
  steps.forEach((item) => {
    options.push({
      value: item.step.key || '',
      label: item.step.title || '',
    })
  })
  return options
}