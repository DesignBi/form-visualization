type  ModuleItem = {
  label?: string;
  canHaveChild: boolean;
  // 保证唯一行，但是我不会取检查它
  name: string;
  // slot 使用slot进行渲染， 必须有slotName配置项
  type: '' | 'wrap-module' | 'tab-module' | 'tab-module-item' | 'table' | 'form' | 'slot';
  // 每个组件的配置项
  params?: any;
  // 如果需要动态slot使用这个
  slotName?: string;
  // 子组件
  children?: ModuleItem[];
  // 当前组件的权限
  permissions?: [];
  // 组件内部的slot配置 比如table的search区域可以自定义搜索
  slotParam?: {
    // slot 的位置。会将该组件插入到模块的指定位置
    name: string;
    // 在全局的slots中寻找都寻找不到的话就不进行渲染
    slotName: string;
  }[];
}

interface Options {
  label: string;
  value: string;
}
