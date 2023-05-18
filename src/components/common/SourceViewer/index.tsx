import React from 'react';
import FileViewer from 'react-file-viewer';

const SourceViewer = () => {
  const type = 'docx'; // 'pdf';
  const path = 'http://localhost:3003/download/docx/d1.docx'; // '/新员工常见问题汇总.pdf'
  return (
    <div>
      <FileViewer fileType={type} filePath={path} errorComponent={<div>无法预览</div>} />
    </div>
  );
};

export default SourceViewer;
