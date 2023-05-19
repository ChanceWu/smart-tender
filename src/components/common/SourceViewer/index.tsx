import { Pagination } from 'antd';
import React, { useMemo, useState } from 'react';
import FileViewer from 'react-file-viewer';
import styles from './index.less';

export interface SourceViewerProps {
  type?: string;
  data?: API.Pinyin_6[];
}

enum SOURCE_TYPE {
  'WORD' = 'docx',
  'PIC' = 'jpg',
}

const SourceViewer: React.FC<SourceViewerProps> = ({ type = 'WORD', data = [] }) => {
  const [index, setIndex] = useState<number>(1);
  const total = useMemo(() => data.length, [data]);
  const curItem = useMemo(() => data[index - 1], [data, index]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className={styles.box}>
      <div>{curItem.name}</div>
      {!loading && (
        <FileViewer
          fileType={SOURCE_TYPE[type]}
          filePath={curItem.fileUrl}
          errorComponent={<div>无法预览</div>}
        />
      )}
      <div>
        <Pagination
          simple
          defaultCurrent={1}
          total={total}
          pageSize={1}
          onChange={(p) => {
            setIndex(p);
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 10);
          }}
        />
      </div>
    </div>
  );
};

export default SourceViewer;
