import { Spin } from 'antd';
import React from 'react';
import styles from './index.less';

const Loading: React.FC = () => (
  <div className={styles.loading}>
    <Spin size="large" />
  </div>
);

export default Loading;
