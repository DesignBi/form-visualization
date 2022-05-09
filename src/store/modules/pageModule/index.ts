import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StoreRootState } from "../../store";
import { store } from "../../index";
import { SlotParam } from "../editNode";

export interface State {
  data: ModuleItem[],
  activeItemIndex: string
}

/**
 * 根据层级的index来寻找对于的item
 * */
export const findItemByIndex = (treeData: ModuleItem[], index: string) => {
  let ck: ModuleItem[] = treeData;
  const indexs = index.split('-').slice(1)
  let item: ModuleItem = {
    label: '',
    name: '',
    type: '',
    canHaveChild: false
  };
  indexs.forEach((v, i) => {
    if (i === indexs.length - 1) {
      ck = [ ck[Number(v)] ]
      item = ck[0]
    } else {
      ck = ck[Number(v)].children || []
    }
  })
  return item;
}
const defaultState = {
  data: [
    {
      label: '画板',
      type: 'wrap-module',
      name: 'wrap-module',
      canHaveChild: true
    }
  ],
  activeItemIndex: ''
}
let storeData: string | null | State = sessionStorage.getItem('pageModule');
try {
  storeData = storeData ? JSON.parse(storeData) : defaultState
} catch (e) {
  storeData = null
}
sessionStorage.removeItem('pageModule')
const initialState: State = storeData as State ?? defaultState;
export const pageModule = createSlice<State, {
  setTreeData: (state: State, action: PayloadAction<ModuleItem[]>) => void;
  getActiveItem: (state: State, action: PayloadAction<string>) => void;
  insertNode: (state: State, action: PayloadAction<ModuleItem>) => void
  delNode: (state: State, action: PayloadAction<string>) => void
  setParams: (state: State, action: PayloadAction<{ params: any, slotParams: SlotParam[] }>) => void
}, string>({
  name: 'pageModule',
  initialState,
  reducers: {
    setTreeData: (state, action) => {
      state.data = [ ...action.payload ]
    },
    getActiveItem: (state, action) => {
      state.activeItemIndex = action.payload
    },
    insertNode: (state, action) => {
      if (!state.activeItemIndex) return
      const item = findItemByIndex(state.data, state.activeItemIndex)
      if (!item) return;
      // 先判断当前用户选中的节点又没有子组件
      if (!Array.isArray(item.children)) {
        item.children = []
      }
      item.children.push(action.payload)
      state.activeItemIndex = ''
    },
    delNode: (state, action) => {
      const name = action.payload;
      const treeData = state.data;
      const index = name.substr(name.lastIndexOf('-')).replace('-', '')
      const itemParent: ModuleItem = findItemByIndex(treeData, name.substring(0, name.length - 2))
      itemParent.children?.splice(Number(index), 1)
      if (itemParent.children?.length === 0) {
        Reflect.deleteProperty(itemParent, 'children')
      }
      state.activeItemIndex = ''
    },
    setParams: (state, actions) => {
      if (!state.activeItemIndex) return
      const item: ModuleItem = findItemByIndex(state.data, state.activeItemIndex)
      if (!item) return;
      item.params = actions.payload.params
      item.slotParam = actions.payload.slotParams
    }
  }
});
export const { setTreeData, getActiveItem, insertNode, delNode, setParams } = pageModule.actions;
export const getTreeData = (state: StoreRootState) => {
  return state.pageModule.data;
}
export const getActiveIndex = (state: StoreRootState) => {
  return state.pageModule.activeItemIndex;
}
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('pageModule', JSON.stringify(store.getState().pageModule))
})
export const deleteItem = (index: string, callBack: (item: ModuleItem) => Promise<any>) => (dispatch: any, getState: () => StoreRootState) => {
  const treeData = getTreeData(getState());
  const item = findItemByIndex(treeData, index);
  if (!item) return;
  callBack(item).then(res => {
    dispatch(delNode(index))
  })
}
export default pageModule.reducer;
