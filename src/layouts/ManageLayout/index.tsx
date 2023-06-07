import Header from '@/components/layout/Header';
import type { BasicLayoutProps, MenuDataItem } from '@ant-design/pro-layout';
import { ProLayout } from '@ant-design/pro-layout';
import React from 'react';
import { Link, useModel } from 'umi';
import MenuIcon from './components/MenuIcon';
import { useMount } from 'ahooks';

const ManageLayout: React.FC<BasicLayoutProps> = (props) => {
  console.log('props', props);
  const { queryCategoryTree } = useModel('useMaterialModel');
  useMount(() => {
    queryCategoryTree();
  });
  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus.map(({ children, icon, ...item }) => ({
      ...item,
      icon: icon && MenuIcon(icon as string),
      children: children && loopMenuItem(children),
    }));
  return (
    <ProLayout
      logo={false}
      layout="mix"
      location={props.location}
      headerRender={(p) => <Header {...p} />}
      siderWidth={170}
      collapsed={false}
      menu={{ defaultOpenAll: true, ignoreFlatMenu: true }}
      menuDataRender={() => loopMenuItem(props.route?.routes || [])}
      menuItemRender={(item, dom) => {
        if (item.isUrl || item.children) return dom;
        return (
          <Link to={item.path ?? '/'}>
            <>
              {item.icon}
              {item.name}
            </>
          </Link>
        );
      }}
    >
      <div>{props.children}</div>
    </ProLayout>
  );
};

export default ManageLayout;
