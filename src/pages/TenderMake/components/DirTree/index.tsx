import React, { RefObject, useEffect, useMemo, useRef } from 'react';
import { Button, Form, Input, Modal, Spin, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import DirTreeTitle from '../DirTreeTitle';
import styles from './index.less';
import useModal from '@/hooks/useModal';
import { useModel } from 'umi';
import { useMount, useRequest } from 'ahooks';
import { TenderApi } from '@/services';
import { getTreeFromList } from '@/utils/tender';
import useModalForm from '@/hooks/useModalForm';
import DirNameModal from '../DirNameModal';
import PreFormat from '../PreFormat';

type TenderDirTreeNode = TenderType.TenderDirTreeNode[];

const DirTree = () => {
  const { dirTree, dirList, setDirList, updateDir, delDir, setPreFormat } =
    useModel('useTenderModel');
  const {
    openModal,
    modalProps: dirNameModalProps,
    form: dirForm,
    formData: dirFormData,
  } = useModalForm<TenderType.TenderDir>({
    onOk: (d) => {
      console.log({ ...d });
      if (d.id) {
        updateDir(d);
      } else {
        setDirList([
          ...dirList,
          { name: d.name, id: Date.now().toString(), isMaterial: false, parentId: d.parentId },
        ]);
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

  const { loading, run } = useRequest(() => TenderApi.queryTenderDirList(), {
    onSuccess: ({ resultList }) => {
      const list = [
        { name: '我的标书', id: '0', isMaterial: false, parentId: '-1' },
        ...resultList,
      ];
      setDirList(list);
    },
  });
  useMount(() => {
    run();
  });

  useEffect(() => {
    if (dirFormData) dirForm.setFieldsValue(dirFormData);
  }, [dirFormData]);

  const treeData: DataNode[] = useMemo(() => {
    const dp = (d: TenderDirTreeNode): DataNode[] => {
      return d.map((v) => {
        let child: DataNode['children'] = [];
        if (v.children.length) child = dp(v.children);
        return {
          title: (
            <DirTreeTitle
              data={v}
              isRoot={v.id === '0'}
              openModal={openModal}
              onDel={() => delDir(v.id)}
            />
          ),
          key: v.id,
          isLeaf: !v.children.length,
          children: child,
        };
      });
    };
    return dp(dirTree);
  }, [dirTree, openModal]);
  return (
    <div className={styles.dirTreeContainer}>
      <Spin spinning={loading}>
        <div className={styles.header}>
          <div>投标书内容</div>
          <div>
            <Button onClick={() => openPreFormatModal('预设格式')}>预设格式</Button>
            <Button type="primary">生成标书</Button>
          </div>
        </div>
        <div>
          {treeData.length && (
            <Tree
              className={styles.dirTree}
              multiple
              defaultExpandAll
              treeData={treeData}
              selectable={false}
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
