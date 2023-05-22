// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/ibr/',
  base: '/ibr/',
  define: {
    'process.env': {
      // IBR_BACK_BASE_URL=http://10.10.168.177:8080
      IBR_BACK_BASE_URL: 'http://10.40.0.244:8080',
      PATH_PREFIX: '/inter-api/tender',
      ROUTE_PREFIX: '/ibr',
    },
  },
});
