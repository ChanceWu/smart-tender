// https://umijs.org/config/
import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/VxIBR/',
  base: '/VxIBR/',
  define: {
    // IBR_BACK_BASE_URL=http://10.10.168.177:8080
    IBR_BACK_BASE_URL: 'http://10.40.0.244:8080',
    PATH_PREFIX: '/inter-api/tender',
  },
});
