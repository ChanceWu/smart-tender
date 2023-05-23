import SourceViewer, { SourceViewerProps } from '@/components/common/SourceViewer';
import { Modal, ModalProps } from 'antd';
import React from 'react';

interface PreviewModalProps extends SourceViewerProps {
  modalProps: ModalProps;
}
const PreviewModal: React.FC<PreviewModalProps> = ({ modalProps, ...restProps }) => {
  return (
    <Modal {...modalProps} destroyOnClose width={'50vw'} footer={null}>
      <SourceViewer {...restProps} />
    </Modal>
  );
};

export default PreviewModal;
