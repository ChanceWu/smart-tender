import { EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

interface IProps {
  title: string;
  isMaterial: boolean;
  isRoot: boolean;
}

const DirTreeTitle: React.FC<IProps> = ({ title, isMaterial, isRoot }) => {
  return (
    <span className={styles.dirTreeTitle}>
      <span className={styles.title} title={title}>
        {title}
      </span>
      <span className={styles.btn}>
        {!isMaterial && <PlusCircleOutlined title="新增" />}
        {!isRoot && !isMaterial && <EditOutlined title="编辑" />}
        {!isRoot && <MinusCircleOutlined title="删除" />}
      </span>
    </span>
  );
};

export default DirTreeTitle;
