import usePagination from '@/hooks/usePagination';
import { TenderApi } from '@/services';
import { useMount, useRequest } from 'ahooks';
import { Button, Cascader, Form, Input, Space, Table, Tabs, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useMemo, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
const { Search } = Input;

const MaterialList = () => {
  const { kmsDirList, queryTenderKMSDirList, queryTenderKMSList, kmsList } =
    useModel('useTenderModel');
  const [activeKey, setActiveKey] = useState<string>();
  const [form] = Form.useForm();
  const { pagination } = usePagination();
  useMount(() => {
    queryTenderKMSDirList();
  });
  const tabList = useMemo(
    () =>
      kmsDirList.map((v) => ({
        label: v.name,
        key: v.id! + '',
      })),
    [kmsDirList],
  );
  const onSearch = () => {
    console.log(form.getFieldsValue());
    queryTenderKMSList(form.getFieldsValue());
  };
  const TypeOption = useMemo(
    () => kmsDirList.find((v) => v.id === activeKey)?.children ?? [],
    [activeKey, kmsDirList],
  );

  const columns: ColumnsType<TenderType.KMSList> = [
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
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '素材状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            console.log(record.id);
          }}
        >
          添加素材
        </Button>
      ),
    },
  ];
  return (
    <div className={styles.materialListContainer}>
      <Tabs activeKey={activeKey} items={tabList} onChange={(k) => setActiveKey(k)} />
      <div>
        <Form form={form} layout="inline">
          <Form.Item>
            <Button type="primary">批量添加</Button>
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
          <Table columns={columns} dataSource={kmsList} pagination={pagination} />
        </div>
      </div>
    </div>
  );
};

export default MaterialList;
