import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory, useLocation } from 'umi';
import styles from './index.less';

const RightContent: React.FunctionComponent = () => {
  const location = useLocation();
  const history = useHistory();
  const routerTo = (path: string) => {
    if (location.pathname.indexOf(path) === -1) history.push(path);
  };
  return (
    <div className={styles.rightContent}>
      <div>您好，admin</div>
      <div className={styles.split}></div>
      {/* <SettingOutlined onClick={() => routerTo('/settings')} /> */}
      <div>退出</div>
    </div>
  );
};

export default RightContent;
