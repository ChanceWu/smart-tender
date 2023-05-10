import React, { RefObject, useMemo, useRef } from 'react';
import { Form, Input, Modal, Spin, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import DirTreeTitle from '../DirTreeTitle';
import styles from './index.less';
import useModal from '@/hooks/useModal';
import { useModel } from 'umi';
import { useMount, useRequest } from 'ahooks';
import { TenderApi } from '@/services';
import { getTreeFromList } from '@/utils/tender';

interface DataType {
  id: string;
  name: string;
  isMaterial: boolean;
  file?: string;
  children: DataType[];
}
type TreeDataType = DataType[];
const data: DataType[] = [
  {
    name: '我的标书',
    id: 'root',
    isMaterial: false,
    children: [
      {
        name: '概述',
        id: '0',
        isMaterial: false,
        children: [{ name: '素材一', id: '00', isMaterial: true, file: '1', children: [] }],
      },
      {
        name: '项目总体要求',
        id: '1',
        isMaterial: false,
        children: [
          {
            name: '是的冯绍峰是的方辅导费沙发斯蒂芬是辅导费沙发斯蒂芬孙菲菲师傅的说法',
            id: '11',
            isMaterial: false,
            children: [{ name: '素材二', id: '111', isMaterial: true, file: '1', children: [] }],
          },
        ],
      },
    ],
  },
];

const DirTree = () => {
  const { dirTree, setDirList, setDirTree } = useModel('useTenderModel');
  const treeRef = useRef(null);
  const [form] = Form.useForm();
  const { openModal, modalProps } = useModal({});

  const { loading, run } = useRequest(() => TenderApi.queryTenderDirList(), {
    onSuccess: ({ resultList }) => {
      const list = [
        { name: '我的标书', id: '0', isMaterial: false, parentId: '-1' },
        ...resultList,
      ];
      setDirList(list);
      setDirTree(getTreeFromList(list));
      // if (treeRef.current) treeRef.current?.onExpandAll?.(true);
    },
  });
  useMount(() => {
    run();
  });

  const treeData: DataNode[] = useMemo(() => {
    const dp = (d: TreeDataType): DataNode[] => {
      return d.map((v) => {
        let child: DataNode['children'] = [];
        if (v.children.length) child = dp(v.children);
        return {
          title: (
            <DirTreeTitle
              title={v.name}
              isMaterial={v.isMaterial}
              isRoot={v.id === '-1'}
              onAdd={() => openModal('新建子目录')}
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
          <Tree
            ref={treeRef}
            className={styles.dirTree}
            multiple
            defaultExpandAll
            treeData={treeData}
            selectable={false}
          />
        </div>
      </Spin>
      <Modal {...modalProps}>
        <Form form={form}>
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
