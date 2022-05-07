import  { useState } from "react";

import { FormInstance } from "antd/es/form/hooks/useForm";
import { Form, Space, Collapse, Input, Switch } from "antd";
import { useForm } from "antd/es/form/Form";
import BtnConfig from "../BtnConfig";
import TableConfig from './tableConfig/index'

const { Panel } = Collapse;

interface FormData {
  title: string;
  value: string;
  disable?: boolean;
}

interface Props {
  defaultData?: FormData,
  getFormInterface: (formInterface: FormInstance) => void
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const TableModule = (props: Props) => {
  // const [ formInterface ] = useForm()z
  // props.getFormInterface(formInterface)
  const [ wrapConfig ] = useState({
    dataUrl: '',
    showSearch: false
  })
  const [ showSearch, setShowSearch ] = useState(false)
  const wrapChange = (item: any, allModel: any) => {
    setShowSearch(allModel.showSearch)
  }
  return (<div className="card">
    <Collapse accordion defaultActiveKey={ [ '1' ] }>
      <Panel header="表格基础配置" key="1">
        <Form
            labelCol={ { span: 2 } }
            wrapperCol={ { span: 18 } }
            initialValues={ wrapConfig }
            onValuesChange={ wrapChange }
        >
          <Form.Item name="dataUrl" label="数据请求URL">
            <Input/>
          </Form.Item>
          <Form.Item name="showSearch" valuePropName="checked" label="搜索区域">
            <Switch/>
          </Form.Item>
        </Form>
      </Panel>
      { showSearch ? <Panel header="搜索区域" key="2">
        <p>{ text }</p>
      </Panel> : null }
      <Panel header="表格区域" key="3">
        <TableConfig/>
      </Panel>
    </Collapse>
  </div>)
}

export default TableModule;
