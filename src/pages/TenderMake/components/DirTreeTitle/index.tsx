import {
  DeleteOutlined,
  ExclamationCircleFilled,
  FormOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { Popconfirm } from 'antd';
import React from 'react';
import styles from './index.less';

interface IProps {
  data: TenderType.TenderDirTreeNode;
  openModal: (modalTitle?: string, data?: TenderType.TenderDir, editing?: boolean) => void;
  onDel: () => void;
}

const DirTreeTitle: React.FC<IProps> = ({ data, openModal, onDel }) => {
  return (
    <span className={styles.dirTreeTitle}>
      <span className={styles.title} title={data.name}>
        {data.name}
      </span>
      <span className={styles.btn}>
        {data.level < 6 && !data.sourceFlag && (
          <PlusCircleOutlined
            title="新增子目录"
            onClick={() =>
              openModal('新建子目录', {
                id: '',
                name: '',
                sourceFlag: false,
                parentId: data.id,
                level: data.level + 1,
              })
            }
          />
        )}
        {!data.sourceFlag && (
          <FormOutlined title="编辑" onClick={() => openModal('编辑目录', data, true)} />
        )}
        <Popconfirm
          title="该操作会连同子层级一起删除，你确定要删除吗？"
          onConfirm={onDel}
          icon={<ExclamationCircleFilled style={{ color: 'red' }} />}
        >
          <DeleteOutlined title="删除" />
        </Popconfirm>
      </span>
    </span>
  );
};

export default DirTreeTitle;
