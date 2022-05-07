import TableDialog from "../common/dialog";
import {Form, Radio, Input} from 'antd';
import {SearchTypeConstant} from "./select";
import {useState} from "react";
import {SearchSearchSelectOptionItem, SearchType} from "../../types";

// 组件接受一个弹窗是否展示
export interface TableSearchDialogProps {
    showModel: boolean
}

const FormItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
}


export default function TableSearchDialog(props: TableSearchDialogProps) {
    // 表单
    const [form] = Form.useForm();

    // 点击确认
    function onOk() {
        console.log('onOk', form.getFieldsValue())
    }

    // 点击取消
    function onCancel() {
        console.log('onCancel')
    }

    // 需要响应式的状态
    const [collect, setType] = useState<string>('select')
    // 设置默认值
    form.setFields([
        {name: 'collect', value: 'select'},
        {name: 'multiple', value: false},
        {name: 'filterable', value: false},
        {name: 'type', value: 'select'},
        {name: 'clearable', value: false}
    ])
    // 当前表单的值
    let currentFormValues = {}
    // component
    // const componentMap: {
    //     [key: string]: {
    //         typeGather: Array<SearchSearchSelectOptionItem>
    //         element: JSX.Element
    //     };
    // } = {
    //     select: {
    //         typeGather: [],
    //         element: <>
    //             <Form.Item label="是否多选" name="multiple">
    //                 <Radio.Group>
    //                     <Radio value={true} key='1'>是</Radio>
    //                     <Radio value={false} key='0'>否</Radio>
    //                 </Radio.Group>
    //             </Form.Item>
    //             <Form.Item label="占位符" name="placeholder">
    //                 <Input placeholder="占位符"/>
    //             </Form.Item>
    //             <Form.Item label="是否可以搜索" name="filterable">
    //                 <Radio.Group>
    //                     <Radio value={true} key='1'>是</Radio>
    //                     <Radio value={false} key='0'>否</Radio>
    //                 </Radio.Group>
    //             </Form.Item>
    //             <Form.Item label="是否可以清空选项" name="clearable">
    //                 <Radio.Group>
    //                     <Radio value={true} key='1'>是</Radio>
    //                     <Radio value={false} key='0'>否</Radio>
    //                 </Radio.Group>
    //             </Form.Item>
    //         </>
    //     },
    //     datePicker: {
    //         typeGather: [],
    //         element: <div></div>
    //     },
    //     input: {
    //         typeGather: [],
    //         element: <div></div>
    //     }
    // }

    return <TableDialog
        show={props.showModel}
        onOk={() => {
            onOk()
        }}
        onCancel={() => {
            onCancel()
        }}
    >
        <Form
            {...FormItemLayout}
            name="basic"
            form={form}
            onValuesChange={(changedFields, allFields) => {
                currentFormValues = allFields
            }}
        >
            <Form.Item label="类型选择" name="collect">
                <Radio.Group>
                    {SearchTypeConstant.map(item => {
                        return <Radio value={item.value} key={item.value}>{item.label}</Radio>
                    })}
                </Radio.Group>
            </Form.Item>
            <Form.Item label="搜索字段" name="label">
                <Input placeholder="搜索字段"/>
            </Form.Item>
            <Form.Item label="查询关键字" name="key">
                <Input placeholder="查询关键字"/>
            </Form.Item>
            {/*{componentMap[collect]}*/}
        </Form>
    </TableDialog>
}