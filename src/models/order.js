import { queryRule, removeRule, addRule } from '../services/api';
import { PAGE_SIZE } from "../services/constants";
import actionFun from "../utils/actionFun"

export default {
  namespace: 'order',

  state: {
    list: [],
    total: null,
    page: null
  },

  effects: actionFun('order'),
  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload.datas,
        total: action.payload.total,
        page: action.payload.page,
      };
    },
  },
};
