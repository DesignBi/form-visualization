import {
    SearchSelectField,
    SearchSelectDictField,
    SearchSearchSelectOptionItem
} from "../../../types";

// 创建选择器数据
export function createSearchSelectField(): SearchSelectField {
    return {
        label: '',
        key: '',
        multiple: false,
        placeholder: '请选择',
        filterable: false,
        clearable: false,
        options: []
    }
}

// 创建字典选择器数据
export function createSearchSelectDictField(): SearchSelectDictField {
    return {
        label: '',
        key: '',
        multiple: false,
        placeholder: '请选择',
        filterable: false,
        clearable: false,
        dictValue: ''
    }
}

// 搜索类型的常量
export const SearchTypeConstant: Array<SearchSearchSelectOptionItem> = [
    {
        label: '选择器',
        value: 'select'
    }, {
        label: '时间选择器',
        value: 'datePicker'
    }, {
        label: '输入框',
        value: 'input'
    },
]