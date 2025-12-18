// 登录界面的请求接口
import request from '@/utils/request';

export const getPicData = () => {
  return request.get('/captcha/image');
};

export const getMesCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile,
    },
  });
};

export const getLogin = (smsCode, mobile) => {
  return request.post('/passport/login', {
    form: {
      smsCode,
      mobile,
      isParty: false,
      partyData: {},
    },
  });
};
