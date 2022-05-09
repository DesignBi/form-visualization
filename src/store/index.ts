import { configureStore } from '@reduxjs/toolkit';
import pageModule from "./modules/pageModule";
import nodeEdit from "./modules/editNode";
import { StoreRootState } from "./store";

export const store = configureStore<StoreRootState>({
  reducer: {
    pageModule,
    nodeEdit
  },
});
