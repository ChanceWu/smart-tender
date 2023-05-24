import ComInput from '@/components/common/ComInput';
import usePagination from '@/hooks/usePagination';
import { pageUsingPOST } from '@/services/smart-tender-api/tenderController';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useRequest } from 'ahooks';
import { Badge, Button, DatePicker, Form, Modal, Select, Table, message } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import moment, { Moment } from 'moment';
import { useState } from 'react';
import { useModel } from 'umi';
import styles from './index.less';

const { RangePicker } = DatePicker;
export const SelectOption = [
  { label: '素材审批中', value: 'UNDER_APPROVAL' },
  { label: '取消制作', value: 'CANCEL' },
  { label: '制作失败', value: 'FAIL' },
  { label: '制作成功', value: 'SUCCESS' },
  { label: '生成中', value: 'MAKING' },
];
export const BadgeEnum = {
  UNDER_APPROVAL: { text: '素材审批中', color: 'blue' },
  CANCEL: { text: '取消制作', color: 'grey' },
  FAIL: { text: '制作失败', color: 'red' },
  SUCCESS: { text: '制作成功', color: 'green' },
  MAKING: { text: '生成中', color: 'cyan' },
};

export interface SearchParamsType {
  createTime?: Moment[];
  creatorSearch?: string;
  nameSearch?: string;
  status?: string;
}

const TenderManagement = () => {
  const { downloadSource } = useModel('useTenderModel');
  const [form] = Form.useForm();
  const { current, pageSize, pagination, setTotal, setCurrentPage } = usePagination({
    pageSize: 5,
  });
  const [searchParams, setSearchParams] = useState<SearchParamsType>();

  const { data: dataSource } = useRequest(
    async () => {
      const { createTime, ...rest } = searchParams || {};
      const req: API.Pinyin_14 = rest;
      if (createTime) {
        req.createStartTime = moment(createTime[0]).format('YYYY-MM-DD 00:00:00');
        req.createEndTime = moment(createTime[1]).format('YYYY-MM-DD 23:59:59');
      }
      const { code, data, msg } = await pageUsingPOST({ pageNumber: current, pageSize, req });
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
        // downloadSource(key);
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
      title: '制作人',
      dataIndex: 'creator',
      key: 'creator',
      render: (value, record) => `${value}(${record.creatorId})`,
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
          {record.status === 'SUCCESS' /* && record.madeFileKey*/ && (
            <a
              onClick={() => {
                openDownloadConfirm(record.madeFileKey || '0a6e8368-556e-49d7-9b4d-d96d8c110b24');
              }}
            >
              下载
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
          onFinish={(values) => {
            setSearchParams(values);
          }}
        >
          <Form.Item
            label="制作时间"
            name="createTime"
            // getValueFromEvent={(v) => { console.log(v, v[v.length - 1]);return v[v.length - 1]}}
          >
            <RangePicker placeholder={['开始时间', '结束时间']} />
          </Form.Item>
          <Form.Item
            label="标书状态"
            name="status"
            // getValueFromEvent={(v) => { console.log(v, v[v.length - 1]);return v[v.length - 1]}}
          >
            <Select options={SelectOption} placeholder="请选择" style={{ width: 200 }} allowClear />
          </Form.Item>
          <Form.Item label="制作人" name="creatorSearch">
            <ComInput placeholder="请输入" />
          </Form.Item>
          <Form.Item label="标书名称" name="nameSearch">
            <ComInput placeholder="请输入" />
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
        <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={pagination} />
      </div>
      {/* <MaterialDetailModal
        modalProps={modalProps}
        form={detailForm}
        formData={detailFormData}
        typeOption={TypeOption}
      /> */}
      {/* <PreviewDrawer
        open={preview}
        onClose={closePreview}
        data={curSource?.fileDetailRespList}
        type={curSource?.typeCode}
      /> */}
    </div>
  );
};

export default TenderManagement;
