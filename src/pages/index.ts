import { lazy } from "react";

const Home = lazy(() => import('./home/home'));
const Test = lazy(() => import('./test/test'));
const FormModel1 = lazy(() => import('./formModel1'));
const TableModel1 = lazy(() => import('./tableModel1'));
const ModulePage = lazy(() => import('./modulePage'));
const EditPage = lazy(() => import('./editNode'));
const FormModel2 = lazy(() => import('./formModel2'));
export {
  Home,
  Test,
  FormModel1,
  TableModel1,
  ModulePage,
  EditPage,
  FormModel2
}
