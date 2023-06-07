import ComInput from '@/components/common/ComInput';
import PreviewDrawer from '@/components/common/PreviewDrawer';
import useModalForm from '@/hooks/useModalForm';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Button, Cascader, Divider, Form, Pagination, Popconfirm, Table, Tabs } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from 'umi';
import MaterialDetailModal from './components/MaterialDetailModal';
import styles from './index.less';

function MaterialManagement() {
  const {
    categoryTree,
    materialList,
    tabActiveKey,
    setTabActiveKey,
    queryMaterialList,
    addMaterial,
    editMaterial,
    delMaterial,
    pagination,
    resetPagination,
  } = useModel('useMaterialModel');
  const [form] = Form.useForm();
  // const { current, pageSize, setTotal, pagination } = usePagination();
  const [preview, { setTrue: openPreview, setFalse: closePreview }] = useBoolean(false);
  const [curSource, setCurSource] = useState<API.Pinyin_13>();

  const tableRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState<number>(0);

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

  const {
    openModal,
    modalProps,
    form: detailForm,
    formData: detailFormData,
  } = useModalForm<MaterialType.MaterialInfo>({
    onOk: (d) => {
      console.log({ ...d });
      const categoryIdList = (d.categoryId || []) as number[];
      d.categoryId = categoryIdList[categoryIdList.length - 1];
      if (d.id) {
        editMaterial(d);
      } else {
        addMaterial(d);
      }
    },
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

  const columns: ColumnsType<API.Pinyin_13> = [
    {
      title: '素材分类',
      dataIndex: 'categoryNameList',
      key: 'categoryNameList',
      ellipsis: true,
      width: '20%',
      render: (v) => v.join('/'),
    },
    {
      title: '素材名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '20%',
    },
    {
      title: '上传人',
      dataIndex: 'modifier',
      key: 'modifier',
      render: (value, record) => `${value}(${record.modifierId})`,
    },
    {
      title: '上传时间',
      dataIndex: 'modifyTime',
      key: 'modifyTime',
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setCurSource(record);
              openPreview();
            }}
          >
            预览
          </a>
          <Divider type="vertical" />
          <a
            onClick={() =>
              openModal('编辑素材', {
                categoryId: record.categoryId,
                categoryName: record.categoryName,
                fileIdList: record.fileDetailRespList?.map((v) => ({
                  ...v,
                  // url: 'picture',
                })) as any,
                name: record.name,
                typeCode: record.typeCode,
                id: record.id,
              })
            }
          >
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="你确定要删除吗？"
            onConfirm={() => delMaterial({ id: record.id })}
            icon={<ExclamationCircleFilled style={{ color: 'red' }} />}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  return (
    <div className={styles.container}>
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
          form={form}
          layout="inline"
          onFinish={(values) => {
            queryMaterialList(values);
          }}
        >
          <Form.Item
            label="素材分类"
            name="categoryId"
            // getValueFromEvent={(v) => { console.log(v, v[v.length - 1]);return v[v.length - 1]}}
          >
            <Cascader
              options={TypeOption}
              fieldNames={{ label: 'name', value: 'id', children: 'children' }}
              placeholder="请选择"
              style={{ width: 200 }}
              changeOnSelect
            />
          </Form.Item>
          <Form.Item label="素材名称" name="name">
            <ComInput placeholder="请输入素材名称" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item style={{ marginLeft: 'auto', marginRight: 16 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="button"
              onClick={() => {
                form.resetFields();
                resetPagination();
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
          <Table
            rowKey="id"
            ref={tableRef}
            columns={columns}
            dataSource={materialList}
            pagination={false}
            bordered
            scroll={{ y: `calc(100vh - 170px - ${offsetTop}px)` }}
            style={{ height: `calc(100vh - 124px - ${offsetTop}px)` }}
            size="middle"
          />
          <Pagination className={styles.pagination} size="small" {...pagination} />
        </div>
      </div>
      <MaterialDetailModal
        modalProps={modalProps}
        form={detailForm}
        formData={detailFormData}
        typeOption={TypeOption}
      />
      <PreviewDrawer
        open={preview}
        onClose={closePreview}
        data={curSource?.fileDetailRespList}
        title={curSource?.name}
        type={curSource?.typeCode}
      />
    </div>
  );
}

export default MaterialManagement;
