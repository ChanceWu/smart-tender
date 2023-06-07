import PreviewDrawer from '@/components/common/PreviewDrawer';
import { useBoolean, useMount } from 'ahooks';
import { Button, Cascader, Form, Input, Pagination, Table, Tabs, message } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
const { Search } = Input;

const MaterialList = () => {
  const {
    categoryTree,
    queryCategoryTree,
    materialList,
    queryMaterialList,
    tabActiveKey,
    setTabActiveKey,
    pagination,
    resetPagination,
  } = useModel('useMakeModel');
  const { selectedDirId, addMaterial2DirList } = useModel('useTenderModel');
  const [form] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRow, setSelectedRow] = useState<API.Pinyin_12[]>([]);
  const [preview, { setTrue: openPreview, setFalse: closePreview }] = useBoolean(false);
  const [curSource, setCurSource] = useState<API.Pinyin_13>();

  const tableRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState<number>(0);

  const canBultAdd = useMemo(
    () => !!selectedDirId && !!selectedRowKeys.length,
    [selectedDirId, selectedRowKeys],
  );

  const resizeUpdate = () => {
    if (tableRef.current) setOffsetTop(tableRef.current.offsetTop);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeUpdate);
    return () => {
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);

  useEffect(() => {
    if (materialList && tableRef.current) setOffsetTop(tableRef.current.offsetTop);
  }, [materialList, tableRef]);

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
      dataIndex: 'categoryNameList',
      key: 'categoryNameList',
      ellipsis: true,
      width: '20%',
      render: (v) => v.join('/'),
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
        <a
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
        </a>
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
            ref={tableRef}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={materialList}
            pagination={false}
            scroll={{ y: `calc(100vh - 150px - ${offsetTop}px)` }}
            style={{ height: `calc(100vh - 104px - ${offsetTop}px)` }}
            size="middle"
          />
          <Pagination className={styles.pagination} size="small" {...pagination} />
        </div>
      </div>
      <PreviewDrawer
        open={preview}
        onClose={closePreview}
        data={curSource?.fileDetailRespList}
        title={curSource?.name}
        type={curSource?.typeCode}
        addHandle={() => {
          if (!selectedDirId) {
            message.warn('请先在左侧目录树选择目录层级');
            return;
          }
          if (curSource) {
            addMaterial2DirList([curSource]);
            setSelectedRowKeys((keys) => keys.filter((k) => k !== curSource.id));
            closePreview();
          }
        }}
      />
    </div>
  );
};

export default MaterialList;
