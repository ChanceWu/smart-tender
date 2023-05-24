import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory, useLocation, useModel } from 'umi';
import styles from './index.less';

const RightContent: React.FunctionComponent = () => {
  const { initialState } = useModel('@@initialState');
  const location = useLocation();
  const history = useHistory();
  const routerTo = (path: string) => {
    if (location.pathname.indexOf(path) === -1) history.push(path);
  };
  return (
    <div className={styles.rightContent}>
      <div>您好，{initialState?.currentUser?.staffName || ''}</div>
      <div className={styles.split}></div>
      {/* <SettingOutlined onClick={() => routerTo('/settings')} /> */}
      <div
        className={styles.logout}
        onClick={() => {
          window.location.href = 'https://portal.supcon.com/cas-web/logout';
        }}
      >
        退出
      </div>
    </div>
  );
};

export default RightContent;
