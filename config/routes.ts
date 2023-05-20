export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        name: 'login',
        component: './user/Login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
    ],
  },
  {
    path: '/tender-center',
    name: '标书制作中心',
    layout: false,
    flatMenu: true,
    header: '标书制作中心',
    component: '@/layouts/TenderLayout',
    routes: [
      {
        path: '/tender-center',
        redirect: '/tender-center/list',
      },
      {
        name: '我的标书',
        path: '/tender-center/list',
        header: '标书制作中心',
        component: './TenderList',
      },
      {
        name: '制作标书',
        path: '/tender-center/make',
        header: '标书制作中心',
        component: './TenderMake',
      },
    ],
  },
  {
    path: '/manage-center',
    name: '管理中心',
    header: '数据采集中心',
    component: '@/layouts/ManageLayout',
    flatMenu: true,
    layout: false,
    routes: [
      {
        path: '/manage-center',
        redirect: '/manage-center/materialLab',
      },
      {
        name: '标书管理',
        header: '数据采集中心',
        path: '/manage-center/tender',
        component: './TenderManagement',
      },
      // {
      //   name: '审核管理',
      //   path: '/manage-center/audit',
      //   component: './AuditManagement',
      // },
      {
        name: '素材管理',
        header: '数据采集中心',
        path: '/manage-center/material',
        component: './MaterialManagement',
      },
      {
        name: '素材库管理',
        header: '数据采集中心',
        path: '/manage-center/materialLab',
        component: './MaterialLabManagement',
      },
    ],
  },
  {
    path: '/',
    redirect: '/manage-center',
  },
  {
    component: '404',
  },
];
