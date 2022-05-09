import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreRootState } from "../../store";
import { store } from "../../index";

export interface SlotParam {
  // slot 的位置。会将该组件插入到模块的指定位置
  name: string;
  // 在全局的slots中寻找都寻找不到的话就不进行渲染
  slotName: string;
}

export interface State {
  // 组件在module中的name
  name: string;
  // 这里有很多类型的数据，都不一样暂时使用any
  nodeData: any,
  // 组件内部slot
  slotParams: SlotParam[]
}

const defaultState: State = {
  name: '',
  nodeData: {},
  slotParams: []
}

let storeData: string | null | State = sessionStorage.getItem('nodeEditStore');
try {
  storeData = storeData ? JSON.parse(storeData) : defaultState
} catch (e) {
  storeData = null
}
sessionStorage.removeItem('nodeEditStore')
const initialState: State = storeData as State ?? defaultState;

export const nodeEditStore = createSlice<State, {
  setName: (state: State, action: PayloadAction<string>) => void;
  setDefaultData: (state: State, action: PayloadAction<any>) => void;
  setSlotParams: (state: State, action: PayloadAction<SlotParam[]>) => void;
  reset: (state: State) => void;
}, string>({
  name: 'nodeEditStore',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setDefaultData: (state, action) => {
      if (action.payload === null) {
        state.nodeData = null
        return
      }
      state.nodeData = { ...action.payload };
    },
    setSlotParams: (state, action) => {
      if (!action.payload) {
        state.slotParams = []
        return
      }
      state.slotParams = [ ...action.payload ];
    },
    reset: state => {
      state.slotParams = [];
      state.name = '';
      state.nodeData = null;
    }
  }
})
window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('nodeEditStore', JSON.stringify(store.getState().nodeEdit))
})
export const { setName, setDefaultData, setSlotParams, reset } = nodeEditStore.actions;
export const getName = (state: StoreRootState) => state.nodeEdit.name;
export const getNodeEditData = (state: StoreRootState) => state.nodeEdit.nodeData;
export const getSlotParams = (state: StoreRootState) => state.nodeEdit.slotParams;
export default nodeEditStore.reducer;
