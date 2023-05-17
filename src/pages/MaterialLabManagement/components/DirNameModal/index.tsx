import type { FormInstance, ModalProps } from 'antd';
import { Form, Input, Modal } from 'antd';
import React from 'react';

interface IProps {
  modalProps: ModalProps;
  form: FormInstance<MaterialType.CategoryTree>;
}

const DirNameModal: React.FC<IProps> = ({ modalProps, form }) => {
  return (
    <Modal {...modalProps}>
      <Form form={form}>
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="parentId" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="分类名称"
          name="name"
          rules={[{ required: true, message: '分类名称不能为空' }]}
        >
          <Input placeholder="请输入分类名称" maxLength={15} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DirNameModal;
