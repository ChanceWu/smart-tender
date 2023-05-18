import useModalForm from '@/hooks/useModalForm';
import usePagination from '@/hooks/usePagination';
import { useMount } from 'ahooks';
import { Button, Cascader, Divider, Form, Input, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useMemo, useState } from 'react';
import { useModel } from 'umi';
import MaterialDetailModal from './components/MaterialDetailModal';
import styles from './index.less';

function MaterialManagement() {
  const {
    categoryTree,
    queryCategoryTree,
    materialList,
    queryMaterialList,
    addMaterial,
    editMaterial,
  } = useModel('useMaterialModel');
  const [activeKey, setActiveKey] = useState<string>('1');
  const [form] = Form.useForm();
  const { pagination } = usePagination();
  const {
    openModal,
    modalProps,
    form: detailForm,
  } = useModalForm<MaterialType.MaterialInfo>({
    onOk: (d) => {
      console.log({ ...d });
      if (d.id) {
        editMaterial(d);
      } else {
        addMaterial(d);
      }
    },
  });

  useMount(() => {
    queryCategoryTree();
  });
  const tabList = useMemo(
    () =>
      categoryTree.map((v) => ({
        label: v.name,
        key: v.id! + '',
      })),
    [categoryTree],
  );
  const TypeOption = useMemo(
    () => categoryTree.find((v) => v.id === Number(activeKey))?.children ?? [],
    [activeKey, categoryTree],
  );

  const columns: ColumnsType<API.Pinyin_7> = [
    {
      title: '素材分类',
      dataIndex: 'categoryName',
      key: 'categoryName',
    },
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
      title: '上传人',
      dataIndex: 'modifier',
      key: 'modifier',
      render: (value, record) => `${value}(${record.modifierId})`,
    },
    {
      title: '上传时间',
      dataIndex: 'modifierTime',
      key: 'modifierTime',
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => {
              console.log(record.id);
            }}
          >
            预览
          </Button>
          <Button
            type="link"
            onClick={() => {
              console.log(record.id);
            }}
          >
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => {
              console.log(record.id);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <Tabs
        className={styles.tabs}
        activeKey={activeKey}
        items={tabList}
        onChange={(k) => setActiveKey(k)}
      />
      <div className={styles.content}>
        <Form
          form={form}
          layout="inline"
          onFinish={(values) => {
            queryMaterialList(values);
          }}
        >
          <Form.Item
            label="素材分类"
            name={['req', 'categoryId']}
            getValueFromEvent={(v) => v[v.length - 1]}
          >
            <Cascader
              options={TypeOption}
              fieldNames={{ label: 'name', value: 'id' }}
              placeholder="请选择"
              style={{ width: 200 }}
              changeOnSelect
            />
          </Form.Item>
          <Form.Item label="素材名称" name={['req', 'name']}>
            <Input placeholder="请输入素材名称" />
          </Form.Item>
          <Form.Item style={{ marginLeft: 'auto' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
                queryMaterialList({});
              }}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
        <div>
          <Button className={styles.createBtn} type="primary" onClick={() => openModal('新增素材')}>
            新增素材
          </Button>
          <Table columns={columns} dataSource={materialList} pagination={pagination} bordered />
        </div>
      </div>
      <MaterialDetailModal modalProps={modalProps} form={detailForm} typeOption={TypeOption} />
    </div>
  );
}

export default MaterialManagement;
