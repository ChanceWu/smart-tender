import useModalForm from '@/hooks/useModalForm';
import { PlusOutlined } from '@ant-design/icons';
import { TreeProps, message } from 'antd';
import { Button, Modal, Spin, Tree } from 'antd';
import type { DataNode as DataNodeType } from 'antd/es/tree';
import { useEffect, useMemo } from 'react';
import { useHistory, useModel } from 'umi';
import CreateTenderModal from '../CreateTenderModal';
import DirNameModal from '../DirNameModal';
import DirTreeTitle from '../DirTreeTitle';
import PreFormat from '../PreFormat';
import styles from './index.less';
import { useUnmount } from 'ahooks';
import { getListFromTree, getTreeFromDragTree } from '@/utils/tender';

type TenderDirTreeNode = TenderType.TenderDirTreeNode[];
export type DataNode = DataNodeType & { data?: TenderType.TenderDirTreeNode; }

const DirTree = () => {
  const history = useHistory();
  const {
    dirTree,
    setDirList,
    addDir,
    updateDir,
    delDir,
    setPreFormat,
    createTender,
    setSelectedDirId,
  } = useModel('useTenderModel');
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
        addDir({ ...d, id: Date.now().toString(), sourceFlag: false });
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
  const {
    modalProps: createModalProps,
    openModal: openCreateModal,
    form: createForm,
  } = useModalForm<TenderType.CreateTender>({
    onOk: (d) => {
      createTender(d).then(({ code, msg }) => {
        if (code === 1) {
          message.success(msg);
          history.push('/tender-center/list');
        } else {
          message.error(msg);
        }
      });
    },
  });

  useEffect(() => {
    if (dirFormData) dirForm.setFieldsValue(dirFormData);
  }, [dirForm, dirFormData]);

  useUnmount(() => {
    setDirList([]);
  });

  const treeData: DataNode[] = useMemo(() => {
    console.log('first', dirTree)
    const dp = (d: TenderDirTreeNode): DataNode[] => {
      return d.map((v) => {
        let child: DataNode['children'] = [];
        if (v.children.length) child = dp(v.children);
        const { children: r, ...item } = v;
        return {
          title: <DirTreeTitle data={v} openModal={openModal} onDel={() => delDir(v.id)} />,
          key: v.id,
          isLeaf: !v.children.length,
          children: child,
          selectable: !v.sourceFlag,
          data: v,
        };
      });
    };
    return dp(dirTree);
  }, [delDir, dirTree, openModal]);

  const onSelect: TreeProps['onSelect'] = (selectedKeys) => {
    console.log('selected', selectedKeys);
    setSelectedDirId(selectedKeys[0] as string);
  };
  const onDrop: TreeProps['onDrop'] = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...treeData];
    console.log(data);

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    console.log(data);
    const newTree = getTreeFromDragTree(data);
    console.log(newTree);
    const newDirList = getListFromTree(newTree, 0);
    console.log(newDirList);
    setDirList(newDirList);
  };
  return (
    <div className={styles.dirTreeContainer}>
      <Spin spinning={dirNameModalProps.confirmLoading}>
        <div className={styles.header}>
          <div>投标书内容</div>
          <div>
            <Button onClick={() => openPreFormatModal('预设格式')} style={{ marginRight: 10 }}>
              预设格式
            </Button>
            <Button type="primary" onClick={() => {
              if (dirTree.length === 0) {
                message.warn('请先创建目录！');
                return;
              }
              openCreateModal('生成标书')
            }}>
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
                    sourceFlag: false,
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
              draggable
              // onDragEnter={onDragEnter}
              onDrop={onDrop}
            />
          )}
        </div>
      </Spin>
      <DirNameModal modalProps={dirNameModalProps} form={dirForm} />
      <Modal {...preFormatModalProps} width={'80vw'}>
        <PreFormat form={preFormatForm} />
      </Modal>
      <CreateTenderModal modalProps={createModalProps} form={createForm} />
    </div>
  );
};

export default DirTree;
