import type { ModalProps } from 'antd';
import { useState } from 'react';

interface UseModalResult {
  openModal: (name: string) => void;
  modalProps: ModalProps;
}

function useModal(): UseModalResult {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState<string>('');

  const openModal = (name: string) => {
    setVisible(true);
    setTitle(name);
  };

  const onOk = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return {
    modalProps: {
      visible,
      title,
      onOk,
      onCancel: closeModal,
    },
    openModal,
  };
}

export default useModal;
