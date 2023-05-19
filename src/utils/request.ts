import { extend, RequestOptionsInit } from 'umi-request';

const request = extend({
  prefix: process.env.NODE_ENV === 'production' ? '/inter-api/tender' : '/inter-api/tender',
  timeout: 10000,
});
console.log('process.env.PATH_PREFIX', process)

request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
    try {
      const loginMsg: API.CurrentUser = JSON.parse(localStorage.getItem('loginMsg') || '');
      // {
      //   userName: loginMsg.username,
      //   // staffCode: '0120230934',
      //   // staffName: 'eee',
      //   companyCode: loginMsg.currentCompany.code,
      //   companyName: encodeURI(loginMsg.currentCompany.name),
      //   userId: loginMsg.userId,
      // }
      console.log('options', options)
      options.headers = {
        ...options.headers,
        // userName: 'wuqianpeng',
        // staffCode: '0120230934',
        // staffName: 'eee',
        // companyCode: 'tech',
        // companyName: 'eee',
        // userId: '1',
        Authorization: `Bearer ${loginMsg.ticket}`,
        userName: loginMsg.username,
        staffCode: '0120230934',
        staffName: 'eee',
        companyCode: loginMsg.currentCompany.code,
        companyName: encodeURI(loginMsg.currentCompany.name),
        userId: loginMsg.userId+'',
      };
      if (!url.includes('/file/')) {
        options.headers = { ...options.headers, 'Content-Type': 'application/json'}
      }
      console.log('intercepter');
    } catch (error) {
      console.error(error);
    }
    return {
      url,
      options,
    };
  })

export default request;