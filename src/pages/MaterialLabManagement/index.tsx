import useModalForm from '@/hooks/useModalForm';
import { useMount } from 'ahooks';
import { Tree } from 'antd';
import type { DataNode } from 'antd/lib/tree';
import { useEffect, useMemo } from 'react';
import { useModel } from 'umi';
import DirNameModal from './components/DirNameModal';
import DirTreeTitle from './components/DirTreeTitle';
import styles from './index.less';

function MaterialLabManagement() {
  const { categoryTree, queryCategoryTree, delCategory, addCategory, editCategory } =
    useModel('useMaterialModel');
  const {
    openModal,
    modalProps: dirNameModalProps,
    form: categoryForm,
    formData: categoryFormData,
  } = useModalForm<MaterialType.CategoryTree>({
    onOk: (d) => {
      console.log({ ...d });
      if (d.id) {
        editCategory(d);
      } else {
        addCategory(d);
      }
    },
  });
  useMount(() => {
    queryCategoryTree();
  });

  useEffect(() => {
    if (categoryFormData) categoryForm.setFieldsValue(categoryFormData);
  }, [categoryForm, categoryFormData]);

  const treeData: DataNode[] = useMemo(() => {
    const dp = (d: MaterialType.CategoryTree[]): DataNode[] => {
      return d.map((v) => {
        let child: DataNode['children'] = [];
        if (v.children?.length) child = dp(v.children);
        return {
          title: (
            <DirTreeTitle
              data={v}
              isRoot={v.parentId === 0}
              openModal={openModal}
              onDel={() => delCategory(v.id!)}
            />
          ),
          key: v.id!,
          isLeaf: !v.children?.length,
          children: child,
        };
      });
    };
    return dp(categoryTree);
  }, [categoryTree, delCategory, openModal]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>素材库名称</div>
      <div className={styles.content}>
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
      <DirNameModal modalProps={dirNameModalProps} form={categoryForm} />
    </div>
  );
}

export default MaterialLabManagement;
