import { Drawer } from 'antd';
import React from 'react';
import type { SourceViewerProps } from '../SourceViewer';
import SourceViewer from '../SourceViewer';

interface IProps extends SourceViewerProps {
  open: boolean;
  onClose: () => void;
  modalTitle?: string;
}
const PreviewDrawer: React.FC<IProps> = ({ open, onClose, modalTitle = '预览', ...props }) => {
  return (
    <Drawer
      width={'50vw'}
      title={modalTitle}
      placement="right"
      onClose={onClose}
      open={open}
      destroyOnClose
    >
      <SourceViewer {...props} />
    </Drawer>
  );
};

export default PreviewDrawer;
