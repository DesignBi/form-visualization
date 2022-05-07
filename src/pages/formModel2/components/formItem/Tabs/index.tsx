import React, {useState} from "react";
import { Tabs, Form, Input, Select } from 'antd';
const {TabPane} = Tabs;
const { Option } = Select;
type actionType = 'add' | 'remove'
type formType = 'grid' | 'form'
interface TabActionType {
  add: (tabList: tabData[], setTabList: any) => void;
  remove: (tabList: tabData[], setTabList: any) => void;
}
const tabAction: TabActionType = {
  add: (tabList, setTabList) => {
    tabList.push({
      key: '',
      formType: 'form',
      name: `tab`
    })
    setTabList([...tabList])
  },
  remove: (tabList, setTabList) => {
    console.log('remove')
  },
}
interface tabData {
  key: string,
  formType:formType,
  name: string
}
function KmjsTabs() {
  const [ tabList, setTabList ] = useState<tabData[]>([]);
  const activeKey = '0'
  const onTabEdit = (targetKey: any, action: actionType) => {
    tabAction[action](tabList, setTabList);
  };
  return (
    <div className="tabs-warp" id="kmjs-tabs-warp">
      <Tabs activeKey={activeKey} defaultActiveKey="0" type="editable-card" onEdit={(targetKey, action) => onTabEdit(targetKey, action)}>
        {
          tabList.map((item, i) => {
            return <TabPane tab={item.name} key={i}></TabPane>
          })
        }
      </Tabs>
    </div>
  )
}
export default KmjsTabs