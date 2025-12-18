import request from '@/utils/request';

export const getAddressList = () => {
  return request.get('/address/list');
};

export const addAddress = formData => {
  return request.post('/address/add', {
    form: {
      name: formData.name,
      phone: formData.phone, // 手机号
      region: formData.region, // 省市区数组（对象包含value/label）
      detail: formData.detail,
    },
  });
};
