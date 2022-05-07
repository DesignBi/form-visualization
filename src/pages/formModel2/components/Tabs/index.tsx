import React, {useState} from "react";
import { Tabs, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const {TabPane} = Tabs;
const { confirm } = Modal;
type actionType = 'add' | 'remove'
interface TabActionType {
  add: (params: any) => void;
  remove: (params: any) => void;
}
const tabAction: TabActionType = {
  add: ({props}) => {
    props.onAdd()
  },
  remove: ({props, targetKey}) => {
    confirm({
      title: '删除后将会清空当前表单，是否确认？',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        props.onRemove(+targetKey)
      },
      onCancel() {}
    });
  }
}
function KmjsTabs(props: any) {
  const onTabEdit = (targetKey: any, action: actionType) => {
    tabAction[action]({props, targetKey});
  };
  const onChange = (index: string) => {
    props.onChange(+index)
  }
  return (
    <Tabs
      activeKey={props.activeKey + ''}
      defaultActiveKey="0"
      type="editable-card"
      onEdit={(targetKey, action) => onTabEdit(targetKey, action)}
      onChange={(e) => onChange(e)}>
      {
        props.stepsConfig.map((item: any, i: number) => {
          return <TabPane tab={item.step.title || '请填写步骤'} key={i} closable>{ props.children }</TabPane>
        })
      }
    </Tabs>
  )
}
export default KmjsTabs