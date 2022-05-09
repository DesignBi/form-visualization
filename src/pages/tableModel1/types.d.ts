interface SearchSearchSelectOptionItem {
    label: string
    value: string
}

// 组件类型选择
export type SearchType = 'select' | 'datePicker' | 'input'

interface SearchSelectBasicField {
    // 搜索条件; 必传
    label: string
    // 查询key值; 必传
    key: string
    // 是否多选; 默认: false
    multiple: boolean
    // 占位符; 默认: 请选择{label}
    placeholder: string
    // 是否可以搜索; 默认: false
    filterable: boolean
    // 是否可以清空选项; 默认: false
    clearable: boolean
}

export interface SearchSelectField extends SearchSelectBasicField {
    options: SearchSearchSelectOptionItem[]
}

export interface SearchSelectDictField extends SearchSelectBasicField {
    dictValue: string
}