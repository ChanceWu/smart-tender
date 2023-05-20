import Header from '@/components/layout/Header';
import type { BasicLayoutProps, MenuDataItem } from '@ant-design/pro-layout';
import { ProLayout } from '@ant-design/pro-layout';
import React from 'react';
import { Link } from 'umi';

const TenderLayout: React.FC<BasicLayoutProps> = (props) => {
  console.log('props', props);
  const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus.map(({ children, ...item }) => ({
      ...item,
      // icon: icon && IconMap[icon as string],
      children: children && loopMenuItem(children),
    }));
  return (
    <ProLayout
      logo={false}
      layout="top"
      headerRender={(p) => <Header {...p} />}
      // siderWidth={170}
      menuDataRender={() => loopMenuItem(props.route?.routes || [])}
      menuItemRender={(item, dom) => (
        <Link to={item.path ?? '/'}>
          <>{dom}</>
        </Link>
      )}
    >
      <div>{props.children}</div>
    </ProLayout>
  );
};

export default TenderLayout;
