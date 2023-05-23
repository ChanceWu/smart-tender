import type { FormInstance, FormProps } from 'antd/lib/form';
import Form from 'antd/lib/form';
import type { ModalProps } from 'antd/lib/modal';
import { useState } from 'react';

interface Options<T> {
  modalProps?: ModalProps;
  formProps?: FormProps;
  onOk?: (values: T) => Promise<void> | void;
}

export interface CustomFormProps<VO> {
  form: FormInstance<VO>;
  formData: VO | null;
  setFormData: any;
}

export default <VO>(options: Options<VO>) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [formData, setFormData] = useState<VO | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [form] = Form.useForm<VO>();
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  function openModal(modalTitle?: string, data?: VO, editing?: boolean) {
    setVisible(true);
    if (modalTitle) setTitle(modalTitle);
    if (data) setFormData(data);
    if (editing !== undefined) setIsEditing(editing);
  }
  function closeModal() {
    setVisible(false);
    setIsEditing(false);
    form.resetFields();
    setFormData(null);
  }
  async function onModalOk() {
    if (!options.onOk) return;
    setConfirmLoading(true);
    try {
      await form.validateFields();
      const data = form.getFieldsValue();
      await options.onOk(data);
      closeModal();
    } catch (error) {
      console.log(error);
    }
    setConfirmLoading(false);
  }
  return {
    modalProps: {
      visible,
      open: visible,
      title,
      onOk: onModalOk,
      onCancel: closeModal,
      confirmLoading,
      maskClosable: false,
    },
    form,
    formData,
    setFormData,
    openModal,
    closeModal,
    isEditing,
  };
};
