import usePagination from '@/hooks/usePagination';
import { TenderApi } from '@/services';
import { useMount, useRequest } from 'ahooks';
import { Button, Cascader, Form, Input, message, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
const { Search } = Input;

const MaterialList = () => {
  const { categoryTree, queryCategoryTree, materialList, queryMaterialList } =
    useModel('useMaterialModel');
  const { selectedDirId, addMaterial2DirList } = useModel('useTenderModel');
  const [activeKey, setActiveKey] = useState<number>();
  const [form] = Form.useForm();
  const { pagination } = usePagination();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<API.Pinyin_12[]>([]);

  const canBultAdd = useMemo(
    () => !!selectedDirId && !!selectedRowKeys.length,
    [selectedDirId, selectedRowKeys],
  );

  useMount(() => {
    queryCategoryTree();
    queryMaterialList({});
  });

  useEffect(() => {
    if (categoryTree?.[0]) setActiveKey(categoryTree[0].id);
  }, [categoryTree]);
  const tabList = useMemo(
    () =>
      categoryTree.map((v) => ({
        label: v.name,
        key: v.id! + '',
      })),
    [categoryTree],
  );
  const onSearch = () => {
    console.log(form.getFieldsValue());
    queryMaterialList(form.getFieldsValue());
  };
  const TypeOption = useMemo(() => {
    console.log(activeKey, categoryTree);
    return categoryTree.find((v) => v.id === activeKey)?.children ?? [];
  }, [activeKey, categoryTree]);

  const bultAdd = () => {
    if (!canBultAdd) {
      message.warn('请先在左侧目录树选择目录层级');
      return;
    }
    addMaterial2DirList(selectedRow);
    setSelectedRowKeys([]);
  };

  const columns: ColumnsType<API.Pinyin_12> = [
    {
      title: '素材名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '20%',
      render: (text) => (
        <Button
          type="link"
          onClick={() => {
            console.log(text);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: '素材分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
    {
      title: '素材状态',
      dataIndex: 'status',
      key: 'status',
      render: () => '公开',
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            if (!selectedDirId) {
              message.warn('请先在左侧目录树选择目录层级');
              return;
            }
            addMaterial2DirList([record]);
            setSelectedRowKeys((keys) => keys.filter((k) => k !== record.id));
          }}
        >
          添加素材
        </Button>
      ),
    },
  ];
  const onSelectChange = (newSelectedRowKeys: React.Key[], selectedRows: API.Pinyin_12[]) => {
    console.log('newSelectedRow changed: ', selectedRows);
    setSelectedRow(selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className={styles.materialListContainer}>
      <Tabs
        className={styles.tabs}
        activeKey={activeKey?.toString()}
        items={tabList}
        onChange={(k) => setActiveKey(k)}
      />
      <div className={styles.content}>
        <Form className={styles.search} form={form} layout="inline">
          <Form.Item>
            <Button type="primary" onClick={bultAdd}>
              批量添加
            </Button>
          </Form.Item>
          <Form.Item label="素材分类" name="type" getValueFromEvent={(v) => v[v.length - 1]}>
            <Cascader
              options={TypeOption}
              fieldNames={{ label: 'name', value: 'id' }}
              placeholder="请选择"
              style={{ width: 200 }}
              changeOnSelect
            />
          </Form.Item>
          <Form.Item name="keyword" style={{ marginLeft: 'auto' }}>
            <Search placeholder="请输入素材名称" onSearch={onSearch} enterButton />
          </Form.Item>
        </Form>
        <div>
          <Table
            rowKey={'id'}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={materialList}
            pagination={pagination}
          />
        </div>
      </div>
    </div>
  );
};

export default MaterialList;
