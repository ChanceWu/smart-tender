import ProForm, { ProFormInstance } from '@ant-design/pro-form';
import ProTable, {
  ActionType,
  EditableFormInstance,
  EditableProTable,
  ProColumns,
} from '@ant-design/pro-table';
import { Button, Form, FormInstance, Input, Row } from 'antd';
import { ColumnType, ColumnsType } from 'antd/lib/table';
import React, { useRef, useState } from 'react';

interface FormValues {
  name: string;
  age: number;
  address: string;
}
interface IProps {
  form: FormInstance<TenderType.PreFormat>;
}
const PreFormat: React.FC<IProps> = ({ form }) => {
  const [dataSource, setDataSource] = useState<TenderType.PreFormat>({
    margin: { left: '10', right: '10', top: '10', bottom: '10' },
    title: [
      {
        id: '1',
        level: '一级标题',
        fontFamily: '黑体',
        fontSize: '10',
        lineHeight: '10',
        align: 'left',
      },
    ],
  });
  const formRef = useRef<ProFormInstance<any>>();
  const actionRef = useRef<ActionType>();
  const editableFormRef = useRef<EditableFormInstance>();

  const onFinish = async (values: FormValues) => {
    console.log('Received values of form:', values);
  };

  const columns: ProColumns<TenderType.TitleSet>[] = [
    {
      title: '内容级别',
      dataIndex: 'level',
      key: 'level',
      valueType: 'select',
      valueEnum: {
        Heading1: { text: '一级标题' },
        Heading2: { text: '二级标题' },
        Heading3: { text: '三级标题' },
        Heading4: { text: '四级标题' },
        Heading5: { text: '五级标题' },
        Heading6: { text: '六级标题' },
      },
    },
    {
      title: '字体',
      dataIndex: 'fontFamily',
      key: 'fontFamily',
    },
    {
      title: '字体大小',
      dataIndex: 'fontSize',
      key: 'fontSize',
    },
    {
      title: '行距',
      dataIndex: 'lineHeight',
      key: 'lineHeight',
    },
    {
      title: '对齐方式',
      dataIndex: 'align',
      key: 'align',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, row) => [
        <Button
          type="link"
          key="delete"
          onClick={() => {
            const tableDataSource = formRef.current?.getFieldValue(
              'title',
            ) as TenderType.TitleSet[];
            formRef.current?.setFieldsValue({
              table: tableDataSource.filter((item) => item.id !== row?.id),
            });
          }}
        >
          删除
        </Button>,
      ],
    },
  ];
  return (
    <div>
      <ProForm<TenderType.PreFormat>
        formRef={formRef}
        initialValues={dataSource}
        validateTrigger="onBlur"
        form={form}
      >
        <Form.Item label="页边距（cm）" name="margin">
          <Form.Item
            labelCol={{ md: 12, xl: 6 }}
            wrapperCol={{ md: 12, xl: 6 }}
            label="上边距"
            name={['margin', 'top']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ md: 12, xl: 6 }}
            wrapperCol={{ md: 12, xl: 6 }}
            label="左边距"
            name={['margin', 'left']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ md: 12, xl: 6 }}
            wrapperCol={{ md: 12, xl: 6 }}
            label="下边距"
            name={['margin', 'bottom']}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ md: 12, xl: 6 }}
            wrapperCol={{ md: 12, xl: 6 }}
            label="右边距"
            name={['margin', 'right']}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        <EditableProTable<TenderType.TitleSet>
          rowKey="id"
          scroll={{
            x: true,
          }}
          editableFormRef={editableFormRef}
          controlled
          actionRef={actionRef}
          formItemProps={{
            label: '标题字段设置',
            rules: [
              {
                validator: async (_, value) => {
                  if (value.length < 1) {
                    throw new Error('请至少添加一个题库');
                  }

                  if (value.length > 5) {
                    throw new Error('最多可以设置五个题库');
                  }
                },
              },
            ],
          }}
          maxLength={10}
          name="title"
          columns={columns}
          recordCreatorProps={{
            record: (index) => {
              return {
                id: Date.now().toString(),
                level: '',
                fontFamily: '',
                fontSize: '',
                lineHeight: '',
                align: '',
              };
            },
          }}
          editable={{
            type: 'multiple',
            // editableKeys,
            // onChange: setEditableRowKeys,
          }}
        />
      </ProForm>
    </div>
  );
};

export default PreFormat;
