import { notification } from 'antd';
import { extend, RequestOptionsInit } from 'umi-request';

/** 异常处理程序 */
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

const errorHandler = (error: any) => {
  const { response } = error;
  if (response && response.status !== 200) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '网络异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

const request = extend({
  prefix: process.env.PATH_PREFIX,
  timeout: 10000,
  errorHandler,
});
console.log('process.env.PATH_PREFIX', process.env.PATH_PREFIX);

request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  try {
    const loginMsg: API.CurrentUser = JSON.parse(localStorage.getItem('loginMsg') || '');
    const personInfo: API.CurrentUser = JSON.parse(localStorage.getItem('personInfo') || '');
    options.headers = {
      ...options.headers,
      // userName: 'wuqianpeng',
      // staffCode: '0120230934',
      // staffName: 'eee',
      // companyCode: 'tech',
      // companyName: 'eee',
      // userId: '1',
      Authorization: `Bearer ${loginMsg.ticket}`,
      supToken: `Bearer ${loginMsg.ticket}`,
      userName: encodeURI(loginMsg.username),
      staffCode: encodeURI(personInfo.staffCode) || '',
      staffName: encodeURI(personInfo.staffName) || '',
      companyCode: encodeURI(loginMsg.currentCompany.code),
      companyName: encodeURI(loginMsg.currentCompany.name),
      userId: encodeURI(loginMsg.userId + ''),
    };
    if (!url.includes('/file/')) {
      options.headers = { ...options.headers, 'Content-Type': 'application/json' };
    }
  } catch (error) {
    console.error(error);
  }
  return {
    url,
    options,
  };
});

request.interceptors.response.use(async (response: Response, options: RequestOptionsInit) => {
  if (response.status === 200) {
    if (response.url.includes('/file/download/')) {
      const contentDisposition = response.headers.get('Content-Disposition');
      if (contentDisposition) {
        const filename = contentDisposition
          .split(';')
          .find((part) => part.trim().startsWith('filename='))
          ?.split('=')[1]
          ?.replace(/["']/g, '')
          .trim();

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', decodeURI(filename || 'file'));
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  } else {
    if (response.status === 401) {
      location.href = `${location.origin}/login/#/login?redirect_uri=${location.href}`;
    }
  }
  return response;
});

export default request;
