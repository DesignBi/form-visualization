import { ReactNode } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Empty, Modal } from "antd";
import { ArrowLeftOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { FormInstance } from "antd/es/form/hooks/useForm";
import { getNodeEditData, getName, getSlotParams, reset } from "../../store/modules/editNode";
import { setParams } from "../../store/modules/pageModule";
import Wrap from './nodeType/wrap';
import TabModule from './nodeType/tab';
import TabItemModule from './nodeType/tab-item';
import TableConfig from './nodeType/table';

const EditNode = (props: any) => {
  const dispatch = useDispatch();
  const deafultData: any = useSelector(getNodeEditData)
  const nodeName: any = useSelector(getName)
  const slotParams: any = useSelector(getSlotParams)
  const urlParams = new URLSearchParams(window.location.search);
  const type: string = urlParams.get('type') ?? 'default';
  let nodeFormInstance: FormInstance | null = null;
  const getFormInstance = (data: FormInstance) => {
    nodeFormInstance = data;
  }
  const submitData = async () => {
    const result = await nodeFormInstance?.validateFields()
    await Modal.confirm({
      title: '确认保存提交',
      icon: <ExclamationCircleOutlined/>,
      content: '该保存将会覆盖上次的结果',
      onOk() {
        dispatch(setParams({
          params: result,
          slotParams: slotParams
        }))
        dispatch(reset())
        props.history.goBack()
      },
      onCancel() {
      },
    })
  }
  if (!urlParams.has('type')) {
    props.history.goBack()
  }

  const editArea: { [l: string]: () => ReactNode } = {
    'wrap-module': () => <Wrap getFormInterface={ getFormInstance } defaultData={ deafultData }/>,
    'tab-module': () => <TabModule getFormInterface={ getFormInstance } defaultData={ deafultData }/>,
    'tab-module-item': () => <TabItemModule getFormInterface={ getFormInstance } defaultData={ deafultData }/>,
    'table': () => <TableConfig getFormInterface={ getFormInstance } defaultData={ deafultData }/>,
    'default': () => <Empty description={ false }/>
  }
  let editNode;
  if (typeof editArea[type] === 'function') {
    editNode = editArea[type]()
  } else {
    editNode = editArea['default']()
  }
  return <Card title={ <div style={ { fontSize: '20px' } }>
    <ArrowLeftOutlined onClick={ () => {
      props.history.goBack()
    }
    }/>
    <span style={ { marginLeft: '10px' } }>节点编辑 <span style={ { color: '#999' } }>{ nodeName }</span></span>
  </div>
  } extra={ <Button type={ "primary" } onClick={ submitData }>保存</Button> } className="page">
    { editNode }
  </Card>
};

export default EditNode
