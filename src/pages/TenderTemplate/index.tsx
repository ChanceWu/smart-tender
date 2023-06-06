import ComInput from '@/components/common/ComInput';
import PreviewDrawer from '@/components/common/PreviewDrawer';
import usePagination from '@/hooks/usePagination';
import { queryTemplateList } from '@/services/tender';
import { useBoolean, useRequest } from 'ahooks';
import { Button, Form, Pagination, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import CardItem from './components/CardItem';
import styles from './index.less';

export interface SearchParamsType {
  nameSearch?: string;
  status?: string;
}

const TenderTemplate = () => {
  const [form] = Form.useForm();
  const { current, pageSize, pagination, setTotal } = usePagination();
  const [searchParams, setSearchParams] = useState<SearchParamsType>();

  const [preview, { setTrue: openPreview, setFalse: closePreview }] = useBoolean(false);
  const [curSource, setCurSource] = useState<API.Pinyin_16>();

  const tableRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState<number>(0);

  const { data: dataSource } = useRequest(
    async () => {
      const { code, data, msg } =
        await queryTemplateList(/*{ pageNumber: current, pageSize, req: searchParams }*/);
      if (code === 1) {
        setTotal(data?.totalSize || 0);
        return data?.data;
      } else {
        message.error(msg);
        return [];
      }
    },
    {
      refreshDeps: [current, pageSize, searchParams],
    },
  );

  const resizeUpdate = () => {
    if (tableRef.current) setOffsetTop(tableRef.current.offsetTop);
  };

  useEffect(() => {
    window.addEventListener('resize', resizeUpdate);
    return () => {
      window.removeEventListener('resize', resizeUpdate);
    };
  }, []);

  useEffect(() => {
    if (dataSource && tableRef.current) setOffsetTop(tableRef.current.offsetTop);
  }, [dataSource, tableRef]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Form
          form={form}
          layout="inline"
          onFinish={(values) => {
            setSearchParams(values);
          }}
          className={styles.form}
        >
          <Form.Item label="模板名称" name="nameSearch">
            <ComInput placeholder="请输入" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
          <Form.Item style={{ marginLeft: 'auto', marginRight: 16 }}>
            <Button className={styles.createBtn} type="primary" onClick={() => {}}>
              去新建投标文件
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className={styles.content}>
        <div
          ref={tableRef}
          style={{ height: `calc(100vh - 124px - ${offsetTop}px)`, overflowY: 'auto' }}
        >
          <div className={styles.cards}>
            {dataSource?.map((item) => (
              <CardItem
                data={item}
                previewHandle={() => {
                  setCurSource(item);
                  openPreview();
                }}
              />
            ))}
          </div>
        </div>
        <Pagination className={styles.pagination} size="small" {...pagination} />
      </div>
      <PreviewDrawer
        open={preview}
        onClose={closePreview}
        data={[{ key: curSource?.madeFileKey }]}
        type={'WORD'}
      />
    </div>
  );
};

export default TenderTemplate;
