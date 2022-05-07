import {Modal} from 'antd';
import {ReactElement} from "react";

export interface TableDialogProps {
    show: boolean
    onOk: () => void
    onCancel: () => void
    children: ReactElement
}

export default function TableDialog(props: TableDialogProps) {
    return <Modal
        closable={false}
        keyboard={false}
        maskClosable={false}
        centered
        visible={props.show}
        onOk={() => props.onOk()}
        onCancel={() => props.onCancel()}
        width="1000px"
    >
        <div className="table_dialog_container">
            {props.children}
        </div>
    </Modal>
}