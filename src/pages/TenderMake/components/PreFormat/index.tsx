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
    header: [
        { id: 1, level: 'Heading1', font: '黑体', fontSize: '26', align: 'left', spacing: '720' }
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
      valueType: 'select',
      valueEnum: {
        'Calibri': { text: 'Calibri' },
        '黑体': { text: '黑体' },
        '宋体': { text: '宋体' },
        '仿宋': { text: '仿宋' },
        '微软雅黑': { text: '微软雅黑' },
        '楷体': { text: '楷体' },
      },
    },
    {
      title: '字体大小',
      dataIndex: 'fontSize',
      key: 'fontSize',
      valueType: 'select',
      valueEnum: {
        '42': { text: '初号' },
        '26': { text: '一号' },
        '24': { text: '小一' },
        '22': { text: '二号' },
        '18': { text: '小二' },
        '16': { text: '三号' },
        '15': { text: '小三' },
        '14': { text: '四号' },
        '12': { text: '小四' },
        '11': { text: '五号' },
        '9': { text: '小五' },
        '8': { text: '六号' },
        '7': { text: '小六' },
        '6': { text: '七号' },
        '5': { text: '八号' },
      },
    },
    {
      title: '行距',
      dataIndex: 'lineHeight',
      key: 'lineHeight',
      valueType: 'select',
      valueEnum: {
        '240': { text: '1.0' },
        '360': { text: '1.5' },
        '480': { text: '2.0' },
        '600': { text: '2.5' },
        '720': { text: '3.0' },
      },
    },
    {
      title: '对齐方式',
      dataIndex: 'alignment',
      key: 'alignment',
      valueType: 'select',
      valueEnum: {
        left: { text: '左对齐' },
        right: { text: '右对齐' },
        center: { text: '居中对齐' },
        both: { text: '两端对齐' },
        distribute: { text: '分散对齐' },
      },
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
            ) as TenderType.HeaderSet[];
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
        <Form.Item label="页边距（cm）">
          <ProForm.Group>
            <Form.Item label="上边距" name={['margin', 'top']}>
              <Input />
            </Form.Item>
            <Form.Item label="左边距" name={['margin', 'left']}>
              <Input />
            </Form.Item>
            <Form.Item label="下边距" name={['margin', 'bottom']}>
              <Input />
            </Form.Item>
            <Form.Item label="右边距" name={['margin', 'right']}>
              <Input />
            </Form.Item>
          </ProForm.Group>
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
