import Header from '@/components/layout/Header';
import { BasicLayoutProps, MenuDataItem, ProLayout } from '@ant-design/pro-layout';
import React from 'react';
import { Link } from 'umi';

const ManageLayout: React.FC<BasicLayoutProps> = (props) => {
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
      layout="mix"
      headerRender={(p) => {
        console.log(p);
        return <Header {...p} />;
      }}
      siderWidth={170}
      menuDataRender={() => loopMenuItem(props.route?.routes || [])}
      menuItemRender={(item, dom) => (
        <Link to={item.path ?? '/'}>
          <>{dom}</>
        </Link>
      )}
      // {...settings}
    >
      <div>{props.children}</div>
    </ProLayout>
  );
};

export default ManageLayout;
