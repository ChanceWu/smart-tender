import type { MenuDataItem } from '@ant-design/pro-layout';
import type { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import React, { useEffect, useState } from 'react';
import ManageHeader from './ManageHeader';

export interface LayoutProps extends HeaderViewProps {
  matchMenuKeys?: string[];
  breadcrumb?: Record<string, MenuDataItem>;
}

const Header: React.FunctionComponent<LayoutProps> = (props) => {
  console.log(props);
  const { matchMenuKeys, breadcrumb } = props;
  const [info, setInfo] = useState<MenuDataItem>();

  useEffect(() => {
    if (breadcrumb && matchMenuKeys) {
      const currentPath = matchMenuKeys ? matchMenuKeys[matchMenuKeys?.length - 1] : '/';
      const menuInfo = breadcrumb[currentPath];
      setInfo(menuInfo);
    }
  }, [breadcrumb, matchMenuKeys]);

  if (info && info.header === '标书制作中心') {
    return <ManageHeader module="标书制作中心" {...props} />;
  }
  if (info && info.header === '数据采集中心') {
    return <ManageHeader module="数据采集中心" {...props} />;
  }
  if (info && info.header === false) {
    return <></>;
  }

  return <></>;
};

export default Header;
