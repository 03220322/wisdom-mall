import request from '@/utils/request';

// 确认购买
export const commitOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // buyNow cart
      delivery: 20, // 物流方式
      couponId: 0, // 优惠券
      isUsePoints: 0, // 是否使用积分
      ...obj,
    },
  });
};
// 提交订单
export const submitOrder = (mode, params) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 20, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...params,
  });
};

// 我的订单
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page, // 可以尝试分页
    },
  });
};
