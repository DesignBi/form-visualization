import { BtnProps } from "../BtnConfig";

enum FormatterType {
  dateTime = 'dateTime',
  mapText = 'mapText'
}

interface Options {
  label: string;
  value: string;
}

interface BtnShowRule {
  // 表格中控制按钮展示的key
  columnKey: string;
  // 表格中控制按钮展示的key对应的值， 就是说某个key的值是这个时，按钮展示
  columnValue: any;
}

interface TableColumn {
  fixed?: string;
  // 表格单元格渲染出现的类型
  type?: 'text' | 'image' | 'handle' | 'mapText' | 'rangeText' | 'serial' | 'slot';
  label: string;
  // 操作栏时可为空
  key?: string;
  row?: number | 'key';
  rowKey?: string;
  actions?: BtnProps[];
  width?: number;
  // 对内容的简单格式化， 详情请看 src/components/table/logic/useFormatter.ts
  formatter?: FormatterType;
  // 后续类型扩展时的配置参数的位置
  params: any;
}

interface TablePageItem {
  // 多个表格存在时需要这个name
  name?: '';
  // 搜索或者分页时触发的数据变化的table
  tableName?: '';
  // 表格页面组成的类型
  type: 'title' | 'search' | 'table';
  isSlot?: boolean;
  title?: string;
  actions?: BtnProps[];
  inputs?: FormItem[];
  tableHead?: TableColumn[];
}

interface TableConfig {
  // 请求表格数据的接口地址
  tableDataUrl: string;
  items: TablePageItem[];
}
