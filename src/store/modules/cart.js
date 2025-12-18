import { getCartList, updataCart, delCart } from '@/api/cart';

export default {
  namespaced: true,
  state() {
    return {
      cartList: [],
    };
  },
  mutations: {
    setCartAction(state, newList) {
      state.cartList = newList;
    },
    toggleCheck(state, id) {
      const goods = state.cartList.find(item => item.goods_id === id);
      // 用find返回的是对象，用filter返回的是数组，这里注意区分二者的用法
      goods.isChecked = !goods.isChecked;
    },
    AllChecked(state, checkedAll) {
      state.cartList.forEach(item => {
        item.isChecked = checkedAll;
      });
    },
    changeCount(state, { goodsId, value }) {
      const obj = state.cartList.find(item => item.goods_id === goodsId);
      obj.goods_num = value;
    },
  },
  actions: {
    // 调用接口获取购物车数据
    async getCartAction(context) {
      const {
        data: { list },
      } = await getCartList();
      list.forEach(item => {
        // 后台返回的数据，不包括复选框的状态，所以额外增加一个字段
        item.isChecked = true;
      });
      // console.log(list)

      context.commit('setCartAction', list);
    },
    // 数字框修改数量
    async changeCountAction(context, obj) {
      const { goodsId, value, skuId } = obj;

      // 在调用更新接口的同时，用mutation重新渲染界面
      context.commit('changeCount', {
        goodsId,
        value,
      });
      await updataCart(goodsId, value, skuId); // 提交后端修改数据
    },
    // 删除购物车中的商品
    async delCartAction(context) {
      const selCartList = context.getters.SelGoods;
      const cartIds = selCartList.map(item => item.id);
      await delCart(cartIds);
      context.dispatch('getCartAction');
      // console.log(res)
    },
  },
  getters: {
    // 获取商品数量
    cartTotal(state) {
      return state.cartList.reduce((sum, item, index) => sum + item.goods_num, 0);
    },
    // 获取被选中的商品
    SelGoods(state) {
      return state.cartList.filter(item => item.isChecked);
    },
    // 根据筛选出的被选中的商品计算数量
    SelCount(state, getters) {
      return getters.SelGoods.reduce((sum, item, index) => sum + item.goods_num, 0);
    },
    // 根据筛选出的被选中的商品计算总价
    SelPrice(state, getters) {
      return getters.SelGoods.reduce((sum, item, index) => {
        return sum + item.goods_num * item.goods.goods_price_min;
      }, 0);
    },

    isAllChecked(state) {
      return state.cartList.every(item => item.isChecked);
    },
  },
};
