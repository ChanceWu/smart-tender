import { Spin } from 'antd';
import React from 'react';
import styles from './index.less';

const Loading = () => {
  return (
    <div className={styles.example}>
      <Spin />
    </div>
  );
};

export default Loading;
