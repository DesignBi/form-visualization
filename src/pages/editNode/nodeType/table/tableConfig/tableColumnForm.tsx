import { useEffect, useState } from "react";
import { Modal, Form, Select, Input, Space, Radio, Button } from "antd";
import { TableColumn } from "../tableConfig";
import OptionsConfig from '../../Options'
import BtnConfig from "../../BtnConfig";

interface Props {
  defaultData: TableColumn | null;
  show?: boolean;
  onSuccess: (data?: any) => void;
}

const FormNode = (props: Props) => {
  const [ formInterce ] = Form.useForm()
  const [ formModel, setFormModel ] = useState<TableColumn>(props.defaultData ?? {
    type: 'text',
    label: '',
    fixed: '',
    key: '',
    params: {}
  })
  useEffect(() => {
    setFormModel(props.defaultData ?? {
      type: 'text',
      label: '',
      fixed: '',
      key: '',
      params: {}
    })
  }, [ props.defaultData ])
  const [ type, setType ] = useState(props.defaultData?.type ?? 'text')
  const [ rangeTextDataType, setRangeTextDataType ] = useState(props.defaultData?.params?.type ?? '')
  const [ isHander, setIsHander ] = useState(false)
  const valueChange = (i: any, all: any) => {
    setType(all.type)
    if (all.type === 'handle') {
      setIsHander(true);
      formInterce.setFields([ {
        name: 'label',
        value: '操作'
      }, {
        name: 'key',
        value: ' '
      } ])
    }
    if (all.type === 'mapText') {
      setRangeTextDataType(all.params?.type || '')
    }
  }
  const onOk = async () => {
    const result = await formInterce.validateFields()
    props.onSuccess(result)
    formInterce.resetFields()
  }
  const onCancel = () => {
    formInterce.resetFields()
    props.onSuccess()
  }
  return <Form form={ formInterce } initialValues={ formModel } onValuesChange={ valueChange }>
    <Form.Item label="标题" name="label" rules={ [ { required: true, message: '请输入标题' } ] }>
      <Input disabled={ isHander } placeholder="请输入标题"/>
    </Form.Item>
    <Form.Item label="key" name="key" rules={ [ { required: true, message: '请输入数据对应的KEY' } ] }>
      <Input disabled={ isHander } placeholder="请输入数据对应的KEY"/>
    </Form.Item>
    <Form.Item label="定位" name="fixed">
      <Radio.Group>
        <Radio value="">不定位</Radio>
        <Radio value="left">左边</Radio>
        <Radio value="right">右边</Radio>
      </Radio.Group>
    </Form.Item>
    <Form.Item label="宽度" name="width">
      <Input type={ "number" } placeholder="请输入宽度"/>
    </Form.Item>
    <Form.Item required label="类型" name="type">
      <Select>
        <Select.Option value="text">文本</Select.Option>
        <Select.Option value="image">图片</Select.Option>
        <Select.Option value="slot">插槽</Select.Option>
        <Select.Option value="mapText">状态文本</Select.Option>
        <Select.Option value="rangeText">范围文本</Select.Option>
        <Select.Option value="serial">序号</Select.Option>
        <Select.Option value="handle">按钮</Select.Option>
      </Select>
    </Form.Item>
    {
      type === 'text' ? <Space>
        <Form.Item label="值的格式化处理" name={ [ 'params', 'formatter' ] }>
          <Select style={ { width: '200px' } } placeholder={ "请选择对数据的特殊处理" }>
            <Select.Option value="dateTime">时间</Select.Option>
          </Select>
        </Form.Item>
      </Space> : null
    }
    { type === 'rangeText' ? <Space>
      <Form.Item label="取值配置" name={ [ 'params', 'startKey' ] } rules={ [ { required: true, message: '请输入标题' } ] }>
        <Input placeholder="请输入开始的key"/>
      </Form.Item>
      <Form.Item name={ [ 'params', 'linkSymbol' ] } rules={ [ { required: true, message: '请输入标题' } ] }>
        <Input placeholder="请输入链接符默认~"/>
      </Form.Item>
      <Form.Item name={ [ 'params', 'endKey' ] } rules={ [ { required: true, message: '请输入标题' } ] }>
        <Input placeholder="请输入结束的key"/>
      </Form.Item>
    </Space> : null }
    { type === 'mapText' ? <>
      <Form.Item label="值的类型" name={ [ 'params', 'type' ] } rules={ [ { required: true, message: '请选择类型' } ] }>
        <Radio.Group>
          <Radio value='localData'>本地数据</Radio>
          <Radio value='dictionary'>字典数据</Radio>
        </Radio.Group>
      </Form.Item>
      {
        rangeTextDataType === 'dictionary' ?
            <Form.Item label="字典名称" name={ [ 'params', 'dictionaryName' ] }
                       rules={ [ { required: true, message: '请输入字典名称' } ] }>
              <Input placeholder="字典名称"/>
            </Form.Item>
            : null
      }
      {
        rangeTextDataType === 'localData' ?
            <OptionsConfig name={ [ 'params', 'localData' ] } ColSpan={ 1 }/>
            : null
      }
    </> : null }
    {
      type === 'handle' ? <BtnConfig name={ 'actions' } ColSpan={ 1 } deafultType={ 'text' }></BtnConfig> : null
    }
    <Form.Item>
      <Space>
        <Button onClick={ onCancel }>取消</Button>
        <Button onClick={ onOk } type={ "primary" }>保存</Button>
      </Space>
    </Form.Item>
  </Form>
}

const TableColumnForm = (props: Props) => {
  return <Modal
      destroyOnClose={ true }
      footer={ null }
      maskClosable={ false }
      title="表头配置"
      width="80vw"
      visible={ props.show }>
    <FormNode defaultData={ props.defaultData } onSuccess={ props.onSuccess }/>
  </Modal>
}

export default TableColumnForm;
