// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: false,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/common/Loading',
  },
  targets: {
    ie: 11,
  },
  define: {
    'process.env': {
      // IBR_BACK_BASE_URL=http://10.10.168.177:8080
      IBR_BACK_BASE_URL: 'http://10.40.0.244:8080',
      PATH_PREFIX: '/inter-api/tender',
      ROUTE_PREFIX: '',
    },
  },
  // umi routes: https://umijs.org/docs/routing
  routes,
  access: {},
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // 如果不想要 configProvide 动态设置主题需要把这个设置为 default
    // 只有设置为 variable， 才能使用 configProvide 动态设置主色调
    // https://ant.design/docs/react/customize-theme-variable-cn
    'root-entry-name': 'variable',
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import request from '@/utils/request'",
      schemaPath: 'http://10.10.168.177:8080/v2/api-docs',
      projectName: 'smart-tender-api',
      mock: false,
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  cssModulesTypescriptLoader: {
    mode: 'emit',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
