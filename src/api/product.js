import request from '@/utils/request';

export const getProList = paraobj => {
  const { categoryId, goodsName, page } = paraobj;
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page,
    },
  });
};

// 获取商品细节
export const getProDetail = goodsId => {
  return request.get('/goods/detail', {
    params: {
      goodsId,
    },
  });
};

// 获取商品评价
export const getComment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit,
    },
  });
};
