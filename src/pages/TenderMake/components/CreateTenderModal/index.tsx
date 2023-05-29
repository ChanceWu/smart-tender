import ComInput from '@/components/common/ComInput';
import { validateName } from '@/utils/regexp';
import type { FormInstance, ModalProps } from 'antd';
import { Alert, Form, Modal } from 'antd';
import React from 'react';

interface IProps {
  modalProps: ModalProps;
  form: FormInstance<TenderType.CreateTender>;
}

const CreateTenderModal: React.FC<IProps> = ({ modalProps, form }) => {
  return (
    <Modal {...modalProps}>
      <Form form={form}>
        <Form.Item>
          <Alert message="标书生成后，可在我的标书中进行下载" type="info" showIcon />
        </Form.Item>
        <Form.Item
          label="我的标书名称"
          name="name"
          rules={[{ required: true, message: '标书名称不能为空' }]}
        >
          <ComInput placeholder="请输入标书名称" maxLength={30} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateTenderModal;
