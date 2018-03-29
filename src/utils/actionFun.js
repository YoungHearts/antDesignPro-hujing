import { queryRule, removeRule, addRule,updateRule } from '../services/api';
import { PAGE_SIZE } from "../services/constants";
const actionFun=function(sele){
  return(
    {
      *search({ payload }, { call, put }) {
          const response = yield call(queryRule,sele, payload,PAGE_SIZE);
          yield put({
            type: 'save',
            payload: {...response,page:payload.page},
          });
        },
        *create({ payload, callback }, { call, put,select  }) {
          yield call(addRule,sele, payload);
          const page = yield select(state => state.win.page);
          yield put({ type: "search", payload: { page,values:''} });
        },
        *remove({ payload}, { call, put,select }) {
          yield call(removeRule,sele, payload);
          const page = yield select(state => state.win.page);
          yield put({ type: "search", payload: { page,values:''} });
        },
        *patch({ payload}, { call, put,select }) {
          console.log(payload);
          yield call(updateRule,sele, payload);
          const page = yield select(state => state.win.page);
          yield put({ type: "search", payload: { page,values:''} });
        },
  }
  )
}
export default actionFun