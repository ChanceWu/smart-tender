import ComInput from '@/components/common/ComInput';
import usePagination from '@/hooks/usePagination';
import { pageUsingPOST } from '@/services/smart-tender-api/tenderController';
import { ExclamationCircleFilled, ExclamationCircleOutlined } from '@ant-design/icons';
import { useBoolean, useRequest } from 'ahooks';
import { Badge, Button, Form, Modal, Pagination, Popconfirm, Select, Table, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';
import { queryTemplateList } from '@/services/tender';
import PreviewDrawer from '@/components/common/PreviewDrawer';

export const SelectOption = [
  // { label: '素材审批中', value: 'UNDER_APPROVAL' },
  // { label: '取消制作', value: 'CANCEL' },
  { label: '创建失败', value: 'FAIL' },
  { label: '创建成功', value: 'SUCCESS' },
  { label: '创建中', value: 'MAKING' },
];
export const BadgeEnum = {
  // UNDER_APPROVAL: { text: '素材审批中', color: 'blue' },
  // CANCEL: { text: '取消制作', color: 'grey' },
  FAIL: { text: '创建失败', color: 'red' },
  SUCCESS: { text: '创建成功', color: 'green' },
  MAKING: { text: '创建中', color: 'cyan' },
};

export interface SearchParamsType {
  nameSearch?: string;
  status?: string;
}

const TenderTemplateManagement = () => {
  const { downloadSource, reCreateTender } = useModel('useTenderModel');
  const [form] = Form.useForm();
  const { current, pageSize, pagination, setTotal, setCurrentPage } = usePagination();
  const [searchParams, setSearchParams] = useState<SearchParamsType>();

  const [preview, { setTrue: openPreview, setFalse: closePreview }] = useBoolean(false);
  const [curSource, setCurSource] = useState<API.Pinyin_16>();

  const tableRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState<number>(0);

  const { data: dataSource } = useRequest(
    async () => {
      const { code, data, msg } =
        await queryTemplateList(/*{ pageNumber: current, pageSize, req: searchParams }*/);
      if (code === 1) {
        setTotal(data?.totalSize || 0);
        return data?.data;
      } else {
        message.error(msg);
        return [];
      }
    },
    {
      refreshDeps: [current, pageSize, searchParams],
    },
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
    if (dataSource && tableRef.current) setOffsetTop(tableRef.current.offsetTop);
  }, [dataSource, tableRef]);

  const openDownloadConfirm = (key: string) => {
    Modal.confirm({
      title: '是否确认下载该标书（word格式）?',
      icon: <ExclamationCircleOutlined />,
      okText: '确认下载',
      onOk() {
        downloadSource(key);
      },
    });
  };
  const openReCreateConfirm = (id: number) => {
    Modal.confirm({
      title: '是否确认重新生成该标书?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        reCreateTender(id);
      },
    });
  };

  const columns: ColumnsType<API.Pinyin_16> = [
    {
      title: '标书模板名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '20%',
    },
    {
      title: '模板说明',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: '20%',
    },
    // {
    //   title: '制作人',
    //   dataIndex: 'creator',
    //   key: 'creator',
    //   ellipsis: true,
    //   width: '20%',
    //   render: (value, record) => `${value}(${record.creatorId})`,
    // },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '标书状态',
      dataIndex: 'status',
      key: 'status',
      render: (v) => {
        const { text, color } = BadgeEnum[v];
        return <Badge color={color} text={text} />;
      },
    },
    {
      title: '操作',
      key: 'option',
      dataIndex: 'option',
      render: (_, record) => (
        <span className={styles.groupBtn}>
          <a>编辑</a>
          <Popconfirm
            title="你确定要删除吗？"
            onConfirm={() => {
              console.log('del');
            }}
            icon={<ExclamationCircleFilled style={{ color: 'red' }} />}
          >
            <a>删除</a>
          </Popconfirm>
          <a
            onClick={() => {
              setCurSource(record);
              openPreview();
            }}
          >
            内容预览
          </a>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Form
          form={form}
          layout="inline"
          onFinish={(values) => {
            setSearchParams(values);
          }}
          className={styles.form}
        >
          <Form.Item label="标书状态" name="status">
            <Select options={SelectOption} placeholder="请选择" style={{ width: 200 }} allowClear />
          </Form.Item>
          <Form.Item label="标书名称" name="nameSearch">
            <ComInput placeholder="请输入" style={{ width: 200 }} />
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
                setCurrentPage(1);
                setSearchParams(undefined);
              }}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.content}>
        <Button className={styles.createBtn} type="primary" onClick={() => {}}>
          新增模板
        </Button>
        <Table
          rowKey="id"
          ref={tableRef}
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          scroll={{ y: `calc(100vh - 170px - ${offsetTop}px)` }}
          style={{ height: `calc(100vh - 124px - ${offsetTop}px)` }}
          size="middle"
        />
        <Pagination className={styles.pagination} size="small" {...pagination} />
      </div>
      {/* <MaterialDetailModal
        modalProps={modalProps}
        form={detailForm}
        formData={detailFormData}
        typeOption={TypeOption}
      /> */}
      <PreviewDrawer
        open={preview}
        onClose={closePreview}
        data={[{ key: curSource?.madeFileKey }]}
        type={'WORD'}
      />
    </div>
  );
};

export default TenderTemplateManagement;
