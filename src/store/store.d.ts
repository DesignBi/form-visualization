import { State as PageModule } from './modules/pageModule'
import { State as EditNodeStore } from './modules/editNode'

interface StoreRootState {
  pageModule: PageModule,
  nodeEdit: EditNodeStore
}
