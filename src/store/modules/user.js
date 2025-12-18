import { getInfo, setInfo } from '@/utils/storage';
export default {
  namespaced: true,
  state() {
    return {
      userInfo: getInfo(), // 从本地获取个人信息
    };
  },
  mutations: {
    SetUserInfo(state, obj) {
      state.userInfo = obj;
      setInfo(obj); // 把个人信息保存到本地
    },
  },
  actions: {
    logout(context) {
      // 清除token 和 购物车列表
      context.commit('SetUserInfo', {});
      context.commit('cart/setCartAction', [], { root: true }); // 跨模块调用要加root true
    },
  },
  getters: {},
};
