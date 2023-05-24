import usePagination from '@/hooks/usePagination';
import { TenderApi } from '@/services';
import { useBoolean, useMount, useRequest } from 'ahooks';
import { Button, Cascader, Form, Input, message, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useMemo, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import PreviewDrawer from '@/components/common/PreviewDrawer';
const { Search } = Input;

const MaterialList = () => {
  const {
    categoryTree,
    queryCategoryTree,
    materialList,
    queryMaterialList,
    tabActiveKey,
    setTabActiveKey,
    addMaterial,
    editMaterial,
    delMaterial,
    pagination,
    resetPagination,
  } = useModel('useMakeModel');
  const { selectedDirId, addMaterial2DirList } = useModel('useTenderModel');
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<API.Pinyin_12[]>([]);
  const [preview, { setTrue: openPreview, setFalse: closePreview }] = useBoolean(false);
  const [curSource, setCurSource] = useState<API.Pinyin_13>();

  const canBultAdd = useMemo(
    () => !!selectedDirId && !!selectedRowKeys.length,
    [selectedDirId, selectedRowKeys],
  );

  useMount(() => {
    queryCategoryTree();
  });

  useEffect(() => {
    if (tabActiveKey) {
      queryMaterialList({});
    }
  }, [tabActiveKey]);

  const tabList = useMemo(
    () =>
      categoryTree.map((v) => ({
        label: v.name,
        key: v.id! + '',
      })),
    [categoryTree],
  );
  const TypeOption = useMemo(
    () => categoryTree.find((v) => v.id === Number(tabActiveKey))?.children ?? [],
    [tabActiveKey, categoryTree],
  );

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
      render: (text, record) => (
        <a
          type="link"
          onClick={() => {
            setCurSource(record);
            openPreview();
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: '素材分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
      ellipsis: true,
      width: '20%',
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
        activeKey={tabActiveKey + ''}
        items={tabList}
        onChange={(k) => {
          setTabActiveKey(Number(k));
          resetPagination();
          form.resetFields();
        }}
      />
      <div className={styles.content}>
        <Form
          className={styles.search}
          form={form}
          layout="inline"
          onFinish={(values) => {
            queryMaterialList(values);
          }}
        >
          <Form.Item>
            <Button type="primary" onClick={bultAdd}>
              批量添加
            </Button>
          </Form.Item>
          <Form.Item label="素材分类" name="categoryId">
            <Cascader
              options={TypeOption}
              fieldNames={{ label: 'name', value: 'id' }}
              placeholder="请选择"
              style={{ width: 200 }}
              changeOnSelect
            />
          </Form.Item>
          <Form.Item name="name" style={{ marginLeft: 'auto' }}>
            <Search placeholder="请输入素材名称" onSearch={() => form.submit()} enterButton />
          </Form.Item>
        </Form>
        <div>
          <Table
            rowKey={'id'}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={materialList}
            pagination={{ ...pagination }}
            scroll={{ y: 'calc(100vh - 300px)' }}
          />
        </div>
      </div>
      <PreviewDrawer
        open={preview}
        onClose={closePreview}
        data={curSource?.fileDetailRespList}
        title={curSource?.name}
        type={curSource?.typeCode}
      />
    </div>
  );
};

export default MaterialList;
