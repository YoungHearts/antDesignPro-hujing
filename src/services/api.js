import { stringify } from 'qs';
import request from '../utils/request';
const URL='http://192.168.1.200:8090'
export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(sele,params,pageSize=10) {//列表请求
  return request(`/system/${sele}/searchList?searchStr=${params.values}&currentPage=${params.page}&pageSize=${pageSize}`);
  // return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(sele,id) {
  id='123123123';
  return request(`${URL}/system/${sele}/delete`, {
    method: 'POST',
    body: stringify({id}),
  });
}


export async function addRule(sele,params) {
  return request(`${URL}/system/${sele}/add`, {
    method: 'POST',
    body: params,
  });
}
export async function updateRule(sele,params) {
  return request(`${URL}/system/${sele}/update`, {
    method: 'POST',
    body: params,
  });
}
// export async function addRule(params) {
//   return request('/api/rule', {
//     method: 'POST',
//     body: {
//       ...params,
//       method: 'post',
//     },
//   });
// }

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
