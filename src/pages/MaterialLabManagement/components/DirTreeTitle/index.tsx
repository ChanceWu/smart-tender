import {
  EditOutlined,
  ExclamationCircleFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React from 'react';
import styles from './index.less';

interface IProps {
  data: MaterialType.CategoryTree;
  isRoot: boolean;
  openModal: (modalTitle?: string, data?: MaterialType.CategoryTree, editing?: boolean) => void;
  onDel: () => void;
}

const DirTreeTitle: React.FC<IProps> = ({ data, isRoot, openModal, onDel }) => {
  return (
    <span className={styles.dirTreeTitle}>
      <span className={styles.title} title={data.name}>
        {data.name}
      </span>
      <span className={styles.btn}>
        {(!data.level || data.level < 2) && (
          <Button
            type="link"
            onClick={() => {
              console.log('first', data);
              openModal('新增子分类', { name: '', parentId: data.id });
            }}
          >
            新增子分类
          </Button>
        )}
        {!isRoot && (
          <Button type="link" onClick={() => openModal('编辑分类', data, true)}>
            修改
          </Button>
        )}
        {!isRoot && (
          <Popconfirm
            title="你确定要删除吗？"
            onConfirm={onDel}
            icon={<ExclamationCircleFilled style={{ color: 'red' }} />}
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        )}
      </span>
    </span>
  );
};

export default DirTreeTitle;
