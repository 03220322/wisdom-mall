// 利用本地存储，进行vuex持久化处理
const INFO_KEY = 'hm_shopping_info';
const HIS_KEY = 'hm_search_history';

// 获取个人信息
export const getInfo = () => {
  const result = localStorage.getItem(INFO_KEY);
  const userInfo = { token: '', userID: '' };
  return result ? JSON.parse(result) : userInfo;
};
// 保存个人信息
export const setInfo = obj => {
  return localStorage.setItem(INFO_KEY, JSON.stringify(obj));
};
// 清空个人信息
export const removeInfo = () => {
  return localStorage.removeItem(INFO_KEY);
};

// 获取搜索列表
export const getHistory = () => {
  const result = localStorage.getItem(HIS_KEY);
  return result ? JSON.parse(result) : [];
};
// 保存搜索列表
export const setHistory = key => {
  localStorage.setItem(HIS_KEY, JSON.stringify(key));
};
// 清空搜索列表
