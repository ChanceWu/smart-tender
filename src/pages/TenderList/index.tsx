import ComInput from '@/components/common/ComInput';
import PreviewDrawer from '@/components/common/PreviewDrawer';
import usePagination from '@/hooks/usePagination';
import { myPageUsingPOST } from '@/services/smart-tender-api/tenderController';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useBoolean, useRequest } from 'ahooks';
import { Badge, Button, DatePicker, Form, Modal, Pagination, Select, Table, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useModel } from 'umi';
import { BadgeEnum, SearchParamsType, SelectOption } from '../TenderManagement';
import styles from './index.less';

const { RangePicker } = DatePicker;

const TenderList = () => {
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
      const { createTime, ...rest } = searchParams || {};
      const req: API.Pinyin_14 = rest;
      if (createTime) {
        req.createStartTime = moment(createTime[0]).format('YYYY-MM-DD 00:00:00');
        req.createEndTime = moment(createTime[1]).format('YYYY-MM-DD 23:59:59');
      }
      const { code, data, msg } = await myPageUsingPOST({ pageNumber: current, pageSize, req });
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
      pollingInterval: 3000,
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
      title: '标书名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: '20%',
    },
    {
      title: '制作时间',
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
          {record.status === 'SUCCESS' && (
            <a
              onClick={() => {
                openDownloadConfirm(record.madeFileKey!);
              }}
            >
              下载
            </a>
          )}
          {record.status === 'SUCCESS' && (
            <a
              onClick={() => {
                setCurSource(record);
                openPreview();
              }}
            >
              预览
            </a>
          )}
          {record.status === 'MAKING' && (
            <a
              onClick={() => {
                openReCreateConfirm(record.id!);
              }}
            >
              重新生成
            </a>
          )}
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
          className={styles.form}
          onFinish={(values) => {
            setSearchParams(values);
          }}
        >
          <Form.Item label="制作时间" name="makeTime">
            <RangePicker placeholder={['开始时间', '结束时间']} />
          </Form.Item>
          <Form.Item label="标书状态" name="status">
            <Select options={SelectOption} placeholder="请选择" allowClear style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label="标书名称" name="nameSearch">
            <ComInput placeholder="请输入" style={{ width: 200 }} />
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
        <Table
          ref={tableRef}
          rowKey="id"
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

export default TenderList;
