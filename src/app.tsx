import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
// import { extend } from 'umi-request';
import { history } from 'umi';
import defaultSettings from '../config/defaultSettings';
import Loading from './components/common/Loading';
import { getMenusPermission } from './services/auth';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <Loading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  menuPermission?: string[];
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  console.log('getInitialState');
  const fetchUserInfo = async () => {
    try {
      const loginMsg: API.CurrentUser = JSON.parse(localStorage.getItem('loginMsg') || '');
      const personInfo: API.CurrentUser = JSON.parse(localStorage.getItem('personInfo') || '');
      return { ...loginMsg, staffName: personInfo.staffName, staffCode: personInfo.staffCode };
    } catch (error) {
      // location.href = `https://portal.supcon.com/cas-web/login?service=http%3A%2F%2Fsupportal.supcon.com%3A80%2Finter-api%2Fauth%2Fv1%2Fthird%2Fauthorize`;
      location.href = `${location.origin}/login/#/login?redirect_uri=${location.href}`;
      console.error(error);
    }
    return undefined;
  };
  const fetchMenusPermission = async () => {
    const { list = [] } = await getMenusPermission();
    return list.find((v) => v.code === 'ibr')?.children.map((v) => v.code);
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    const menuPermission = await fetchMenusPermission();
    return {
      fetchUserInfo,
      currentUser,
      menuPermission,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}
