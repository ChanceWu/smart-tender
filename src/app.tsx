import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { RequestMethod, RunTimeLayoutConfig, RequestOptionsInit } from 'umi';
// import { extend } from 'umi-request';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import Header from './components/layout/Header';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  console.log('getInitialState');
  const fetchUserInfo = async () => {
    try {
      const loginMsg: API.CurrentUser = JSON.parse(localStorage.getItem('loginMsg') || '');
      return loginMsg;
      // {
      //   userName: loginMsg.username,
      //   // staffCode: '0120230934',
      //   // staffName: 'eee',
      //   companyCode: loginMsg.currentCompany.code,
      //   companyName: encodeURI(loginMsg.currentCompany.name),
      //   userId: loginMsg.userId,
      // }
    } catch (error) {
      location.href = 'https://portal.supcon.com/cas-web/login?service=http://localhost:8000';
      console.error(error);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
// export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
//   return {
//     headerRender: (props) => <Header {...props} />,
//     disableContentMargin: false,
//     siderWidth: 200,
//     // waterMarkProps: {
//     //   content: initialState?.currentUser?.name,
//     // },
//     onPageChange: () => {
//       const { location } = history;
//       // 如果没有登录，重定向到 login
//       if (!initialState?.currentUser && location.pathname !== loginPath) {
//         history.push(loginPath);
//       }
//     },
//     menuHeaderRender: undefined,
//     // 自定义 403 页面
//     // unAccessible: <div>unAccessible</div>,
//     // 增加一个 loading 的状态
//     // childrenRender: (children, props) => {
//     //   // if (initialState?.loading) return <PageLoading />;
//     //   return (
//     //     <>
//     //       {children}
//     //       {!props.location?.pathname?.includes('/login') && (
//     //         <SettingDrawer
//     //           disableUrlParams
//     //           enableDarkTheme
//     //           settings={initialState?.settings}
//     //           onSettingChange={(settings) => {
//     //             setInitialState((preInitialState) => ({
//     //               ...preInitialState,
//     //               settings,
//     //             }));
//     //           }}
//     //         />
//     //       )}
//     //     </>
//     //   );
//     // },
//     ...initialState?.settings,
//   };
// };

// export const request: RequestMethod = {
//   requestInterceptors: [
//     async (url: string, options: RequestOptionsInit) => {
//       try {
//         const loginMsg: API.CurrentUser = JSON.parse(localStorage.getItem('loginMsg') || '');
//         // {
//         //   userName: loginMsg.username,
//         //   // staffCode: '0120230934',
//         //   // staffName: 'eee',
//         //   companyCode: loginMsg.currentCompany.code,
//         //   companyName: encodeURI(loginMsg.currentCompany.name),
//         //   userId: loginMsg.userId,
//         // }
//         console.log('options', options)
//         options.headers = {
//           ...options.headers,
//           // userName: 'wuqianpeng',
//           // staffCode: '0120230934',
//           // staffName: 'eee',
//           // companyCode: 'tech',
//           // companyName: 'eee',
//           // userId: '1',
//           userName: loginMsg.username,
//           staffCode: '0120230934',
//           staffName: 'eee',
//           companyCode: loginMsg.currentCompany.code,
//           companyName: encodeURI(loginMsg.currentCompany.name),
//           userId: loginMsg.userId,
//         };
//         console.log('intercepter');
//       } catch (error) {
//         console.error(error);
//       }
//       return {
//         url,
//         options,
//       };
//     },
//   ],
//   responseInterceptors: [],
// };

// export const request = extend({
//   prefix: '/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// request.interceptors.request.use((url, options) => {
//   // const token = localStorage.getItem('token');
//   // if (token) {
//   //   // 在请求头中添加自定义字段
//   //   options.headers['Authorization'] = `Bearer ${token}`;
//   // }
//   options.headers = {
//     ...options.headers,
//     userName: 'wuqianpeng',
//     staffCode: '0120230934',
//     staffName: 'eee',
//     companyCode: 'tech',
//     companyName: 'eee',
//     userId: '1',
//   };
//   console.log('intercepter');
//   return {
//     url,
//     options,
//   };
// });
