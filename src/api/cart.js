import request from '@/utils/request';

// 加入购物车
// goodsId:商品ID，goodsNum：商品数量，goodsSkuId：商品类型
export const getAddCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId,
  });
};

export const getCartList = () => {
  return request.get('/cart/list');
};

export const updataCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId,
  });
};

export const delCart = cartIds => {
  // 后端期望接收一个名为 cartIds 的数组参数，这里将其包装为对象发送
  return request.post('/cart/clear', { cartIds });
};
