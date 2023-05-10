import { EditOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.less';

interface IProps {
  data: TenderType.TenderDirTreeNode;
  isRoot: boolean;
  openModal: (modalTitle?: string, data?: TenderType.TenderDir, editing?: boolean) => void;
  onDel: () => void;
}

const DirTreeTitle: React.FC<IProps> = ({ data, isRoot, openModal, onDel }) => {
  return (
    <span className={styles.dirTreeTitle}>
      <span className={styles.title} title={data.name}>
        {data.name}
      </span>
      <span className={styles.btn}>
        {!data.isMaterial && (
          <PlusCircleOutlined
            title="新增"
            onClick={() =>
              openModal('新建子目录', { id: '', name: '', isMaterial: false, parentId: data.id })
            }
          />
        )}
        {!isRoot && !data.isMaterial && (
          <EditOutlined title="编辑" onClick={() => openModal('编辑目录', data, true)} />
        )}
        {!isRoot && <MinusCircleOutlined title="删除" onClick={onDel} />}
      </span>
    </span>
  );
};

export default DirTreeTitle;
