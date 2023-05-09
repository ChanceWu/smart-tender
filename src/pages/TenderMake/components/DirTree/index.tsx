import React, { useMemo } from 'react';
import { Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import DirTreeTitle from '../DirTreeTitle';
import styles from './index.less';

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
  // const treeData: DataNode[] = [
  //   {
  //     title: 'parent 0',
  //     key: '0-0',
  //     children: [
  //       { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
  //       { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
  //     ],
  //   },
  //   {
  //     title: 'parent 1',
  //     key: '0-1',
  //     children: [
  //       { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
  //       { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
  //     ],
  //   },
  // ];
  const treeData: DataNode[] = useMemo(() => {
    const dp = (d: TreeDataType): DataNode[] => {
      return d.map((v) => {
        let child: DataNode['children'] = [];
        if (v.children.length) child = dp(v.children);
        return {
          title: <DirTreeTitle title={v.name} isMaterial={v.isMaterial} isRoot={v.id === 'root'} />,
          key: v.id,
          isLeaf: !v.children.length,
          children: child,
        };
      });
    };
    return dp(data);
  }, []);
  return (
    <div>
      <div>sss</div>
      <div>
        <Tree
          className={styles.dirTree}
          multiple
          defaultExpandAll
          treeData={treeData}
          selectable={false}
        />
      </div>
    </div>
  );
};

export default DirTree;
