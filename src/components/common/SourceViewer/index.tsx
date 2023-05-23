import { Pagination } from 'antd';
import React, { useMemo, useState } from 'react';
import FileViewer from 'react-file-viewer';
import styles from './index.less';
import { useModel } from 'umi';

export interface SourceViewerProps {
  type?: string;
  data?: API.Pinyin_6[];
  title?: string;
}

enum SOURCE_TYPE {
  'WORD' = 'docx',
  'PIC' = 'jpg',
}

const SourceViewer: React.FC<SourceViewerProps> = ({ type = 'WORD', data = [], title }) => {
  const { initialState } = useModel('@@initialState')
  const [index, setIndex] = useState<number>(1);
  const total = useMemo(() => data.length, [data]);
  const curItem = useMemo(() => data[index - 1], [data, index]);
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className={styles.box}>
      <div title={title} className={styles.header}>{title}</div>
      {!loading && (
        <FileViewer
          fileType={SOURCE_TYPE[type]}
          filePath={`/inter-api/tender/file/download/${curItem.key}`}
          // filePath={`/download?file=docx/a.docx`}
          token={initialState?.currentUser?.ticket || ''}
          errorComponent={<div>无法预览</div>}
        />
      )}
      <div className={styles.footer}>
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
