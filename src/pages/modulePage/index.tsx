import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getTreeData,
  deleteItem as storeDeleteItem,
  insertNode,
  findItemByIndex, getActiveItem
} from "../../store/modules/pageModule";
import { setName, setDefaultData, setSlotParams } from "../../store/modules/editNode";
import { Card, Modal } from "antd";
import './style.less';
import WrapShelf from './components/wrapShelf'
import AddChild from './components/addChild'
import { QuestionCircleOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const allTypeOptions: Options[] = [
  {
    label: '画板',
    value: 'wrap-module'
  },
  {
    label: '分类Tab父集',
    value: 'tab-module'
  },
  {
    label: '分类Tab子集',
    value: 'tab-module-item'
  },
  {
    label: '表格',
    value: 'table'
  },
  {
    label: '表单',
    value: 'form'
  },
  {
    label: '插槽',
    value: 'slot'
  }
]

const Index = (props: any) => {
  const treeData = useSelector(getTreeData)
  const dispatch = useDispatch();
  const [ typeOptions, setTypeOptions ] = useState<Options[]>([])
  const [ showInsert, setShowInsert ] = useState<boolean>(false)
  /**
   * 显示新建的弹窗，并计算可供与选择的组件类型
   * */
  const insert = (name: string) => {
    // 获取到当前用户要添加子组件的配置项
    const item: ModuleItem = findItemByIndex(treeData, name)
    if (!item) return
    dispatch(getActiveItem(name))
    if (item.type === 'tab-module') {
      setTypeOptions([ {
        label: '分类Tab子集',
        value: 'tab-module-item'
      } ])
    } else {
      setTypeOptions(allTypeOptions.filter((v) => {
        return v.value !== 'wrap-module' && v.value !== 'tab-module-item'
      }) as Options[])
    }
    setShowInsert(true);
  }
  /**
   * 完成弹窗，如果有data说明用户正确录入表单并提交
   * */
  const closeInsetWindow = (data?: ModuleItem) => {
    setShowInsert(false);
    if (!data) {
      return
    }
    dispatch(insertNode(data))
  }
  /**
   * 删除某个节点，同时删除下面的子节点
   * */
  const deleteItem = (name: string) => {
    dispatch(storeDeleteItem(name, (item: ModuleItem) => {
      return new Promise((s, r) => {
        Modal.confirm({
          title: '确认删除' + item.label,
          icon: <ExclamationCircleOutlined/>,
          content: '将会删除该节点以及下属的子节点',
          onOk() {
            s(true)
          },
          onCancel() {
            r(false)
          },
        })
      })
    }))
  }

  const configNode = (index: string) => {
    const item = findItemByIndex(treeData, index)
    if (!item) return
    dispatch(setName(item.name))
    dispatch(setDefaultData(item.params && Object.keys(item.params).length ? item.params : null))
    dispatch(setSlotParams(item.slotParam || []))
    props.history.push('/edit-node?type=' + item.type)
  }
  return (
      <>
        <div className="module-page">
          <Card title="请确认页面结构" bordered={ false }
                extra={ <QuestionCircleOutlined style={ { fontSize: '18px', cursor: 'pointer' } }/> }>
            <div className="wrap">
              { treeData?.length ? <WrapShelf moduleIndex={ '0' }
                                              data={ treeData }
                                              onConfig={ configNode }
                                              onDelete={ deleteItem }
                                              onInsert={ insert }/> : null }
            </div>
          </Card>
        </div>
        <AddChild selectOptions={ typeOptions } show={ showInsert } onCancel={ closeInsetWindow }></AddChild>
      </>
  )
}

export default Index
