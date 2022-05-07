import { useEffect, useState } from "react";
import { Space, Button, Modal } from "antd";
import TableColumnForm from './tableColumnForm'
import TheadCard from "./theadCard";
import { TableColumn } from "../tableConfig";

const TableConfig = (props: any) => {
  const [ theadData, setTheadData ] = useState<TableColumn[]>([]);
  const [ editHeadIndex, setEditHeadIndex ] = useState<number>(-1);
  const [ editHeadData, setEditHeadData ] = useState<TableColumn | null>(null);
  const [ showTableColumnForm, setShowTableColumnForm ] = useState(false);
  const del = (index: number) => {
    const item = theadData[index];
    Modal.confirm({
      title: '确认删除表头: ' + item.label,
      onOk() {
        theadData.splice(index, 1)
        setTheadData([ ...theadData ])
      }
    })
  }
  const getTableColumnData = (data?: any) => {
    if (data) {
      if (editHeadIndex > -1) {
        theadData[editHeadIndex] = data
        setTheadData([ ...theadData ])
      } else {
        theadData.push(data)
        setTheadData([ ...theadData ])
      }
      setEditHeadIndex(-1);
    }
    setShowTableColumnForm(false);
  }
  const editThead = (data: TableColumn, index: number) => {
    setEditHeadData(data);
    setEditHeadIndex(index);
    setShowTableColumnForm(true);
  }
  return <div className="table-config-wrap">
    <div className="header" style={ { marginBottom: '10px' } }>
      <Space>
        <Button onClick={ () => {
          setEditHeadIndex(-1);
          setEditHeadData(null);
          setShowTableColumnForm(true);
        } } type={ "primary" }>添加表头</Button>
        <Button type={ "primary" }>添加动作</Button>
      </Space>
    </div>
    <Space wrap>
      {
        theadData.map((v, i) => (
            <TheadCard key={ v.key } data={ v } index={ i } onEdit={ editThead } onDelete={ del }/>
        ))
      }
    </Space>
    <TableColumnForm defaultData={ editHeadData } onSuccess={ getTableColumnData } show={ showTableColumnForm }/>
  </div>
}

export default TableConfig;
