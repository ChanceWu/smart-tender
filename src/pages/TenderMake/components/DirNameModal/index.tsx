import ComInput from '@/components/common/ComInput';
import { validateName } from '@/utils/regexp';
import type { FormInstance, ModalProps } from 'antd';
import { Form, Input, Modal } from 'antd';
import React from 'react';

interface IProps {
  modalProps: ModalProps;
  form: FormInstance<TenderType.TenderDir>;
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
        <Form.Item name="level" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '目录名称不能为空' }, { validator: validateName }]}
        >
          <ComInput placeholder="请输入目录名称" maxLength={15} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DirNameModal;
