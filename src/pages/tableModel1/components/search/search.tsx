import React, {useState} from "react";
import {Row, Col} from 'antd'
import {PlusSquareOutlined} from '@ant-design/icons'
import TableSearchDialog from "./searchDialog";

export default function TableSearch() {
    // 弹窗展示与否
    const [showModel, changeShowModel] = useState(true)
    // 搜索列表
    // const [searchList, setSearchList] = useState([])

    // 增加搜索条件
    function addSearch() {
        changeShowModel(true)
    }
    // 保存搜索的数据
    // function saveSearchData() {
    // }

    return <div>
        <Row>
            <Col span={6}>
                <PlusSquareOutlined style={{fontSize: '20px'}} onClick={() => {
                    addSearch()
                }}/>
            </Col>
        </Row>
        <TableSearchDialog showModel={showModel}></TableSearchDialog>
    </div>
}
