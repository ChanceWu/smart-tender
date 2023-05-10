import React, { RefObject, useEffect, useMemo, useRef } from 'react';
import { Form, Input, Modal, Spin, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import DirTreeTitle from '../DirTreeTitle';
import styles from './index.less';
import useModal from '@/hooks/useModal';
import { useModel } from 'umi';
import { useMount, useRequest } from 'ahooks';
import { TenderApi } from '@/services';
import { getTreeFromList } from '@/utils/tender';
import useModalForm from '@/hooks/useModalForm';

type TenderDirTreeNode = TenderType.TenderDirTreeNode[];

const DirTree = () => {
  const { dirTree, dirList, setDirList, updateDir, delDir } = useModel('useTenderModel');
  const {
    openModal,
    modalProps,
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
    <div>
      <Spin spinning={loading}>
        <div>sss</div>
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
      <Modal {...modalProps}>
        <Form form={dirForm}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="parentId" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '目录名称不能为空' }]}
          >
            <Input placeholder="请输入目录名称" maxLength={15} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DirTree;
