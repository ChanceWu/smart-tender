import useModalForm from '@/hooks/useModalForm';
import { useMount } from 'ahooks';
import { Tree } from 'antd';
import { DataNode } from 'antd/lib/tree';
import React, { useMemo } from 'react';
import { useModel } from 'umi';
import DirNameModal from './components/DirNameModal';
import DirTreeTitle from './components/DirTreeTitle';
import styles from './index.less';

function MaterialLabManagement() {
  const { materialTree, queryMaterialTree } = useModel('useMaterialModel');
  const {
    openModal,
    modalProps: dirNameModalProps,
    form: dirForm,
    formData: dirFormData,
  } = useModalForm<MaterialType.MaterialTree>({
    onOk: (d) => {
      console.log({ ...d });
      // if (d.id) {
      //   updateDir(d);
      // } else {
      //   setDirList([
      //     ...dirList,
      //     { name: d.name, id: Date.now().toString(), isMaterial: false, parentId: d.parentId },
      //   ]);
      // }
    },
  });
  useMount(() => {
    queryMaterialTree();
  });

  const treeData: DataNode[] = useMemo(() => {
    const dp = (d: MaterialType.MaterialTree[]): DataNode[] => {
      return d.map((v) => {
        let child: DataNode['children'] = [];
        if (v.children?.length) child = dp(v.children);
        return {
          title: (
            <DirTreeTitle
              data={v}
              isRoot={v.parentId === '0'}
              openModal={openModal}
              // onDel={() => delDir(v.id)}
            />
          ),
          key: v.id!,
          isLeaf: !v.children?.length,
          children: child,
        };
      });
    };
    return dp(materialTree);
  }, [materialTree, openModal]);

  return (
    <div>
      <div>素材库名称</div>
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
      <DirNameModal modalProps={dirNameModalProps} form={dirForm} />
    </div>
  );
}

export default MaterialLabManagement;
