import useModalForm from '@/hooks/useModalForm';
import { PlusOutlined } from '@ant-design/icons';
import type { TreeProps } from 'antd';
import { Button, Modal, Spin, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import { useEffect, useMemo } from 'react';
import { useModel } from 'umi';
import DirNameModal from '../DirNameModal';
import DirTreeTitle from '../DirTreeTitle';
import PreFormat from '../PreFormat';
import styles from './index.less';

type TenderDirTreeNode = TenderType.TenderDirTreeNode[];

const DirTree = () => {
  const { dirTree, addDir, updateDir, delDir, setPreFormat, createTender, setSelectedDirId } =
    useModel('useTenderModel');
  const {
    openModal,
    modalProps: dirNameModalProps,
    form: dirForm,
    formData: dirFormData,
  } = useModalForm<TenderType.TenderDir>({
    onOk: (d) => {
      console.log('tender dir ', d);
      if (d.id) {
        updateDir(d);
      } else {
        addDir({ ...d, id: Date.now().toString(), isMaterial: false });
      }
    },
  });
  const {
    modalProps: preFormatModalProps,
    openModal: openPreFormatModal,
    form: preFormatForm,
  } = useModalForm<TenderType.PreFormat>({
    onOk: (d) => {
      setPreFormat(d);
    },
  });

  useEffect(() => {
    if (dirFormData) dirForm.setFieldsValue(dirFormData);
  }, [dirForm, dirFormData]);

  const treeData: DataNode[] = useMemo(() => {
    const dp = (d: TenderDirTreeNode): DataNode[] => {
      return d.map((v) => {
        let child: DataNode['children'] = [];
        if (v.children.length) child = dp(v.children);
        return {
          title: <DirTreeTitle data={v} openModal={openModal} onDel={() => delDir(v.id)} />,
          key: v.id,
          isLeaf: !v.children.length,
          children: child,
          selectable: !v.isMaterial,
        };
      });
    };
    return dp(dirTree);
  }, [delDir, dirTree, openModal]);

  const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
    console.log('selected', selectedKeys);
    setSelectedDirId(selectedKeys[0] as string);
  };
  return (
    <div className={styles.dirTreeContainer}>
      <Spin spinning={dirNameModalProps.confirmLoading}>
        <div className={styles.header}>
          <div>投标书内容</div>
          <div>
            <Button onClick={() => openPreFormatModal('预设格式')}>预设格式</Button>
            <Button type="primary" onClick={createTender}>
              生成标书
            </Button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.contentHeader}>
            <div>我的标书</div>
            <div>
              <PlusOutlined
                title="新增子目录"
                onClick={() =>
                  openModal('新建子目录', {
                    id: '',
                    name: '',
                    isMaterial: false,
                    parentId: '0',
                    level: 1,
                  })
                }
              />
            </div>
          </div>
          {!dirNameModalProps.confirmLoading && treeData.length > 0 && (
            <Tree
              className={styles.dirTree}
              defaultExpandAll
              blockNode
              treeData={[...treeData]}
              onSelect={onSelect}
            />
          )}
        </div>
      </Spin>
      <DirNameModal modalProps={dirNameModalProps} form={dirForm} />
      <Modal {...preFormatModalProps} width={'80vw'}>
        <PreFormat form={preFormatForm} />
      </Modal>
    </div>
  );
};

export default DirTree;
