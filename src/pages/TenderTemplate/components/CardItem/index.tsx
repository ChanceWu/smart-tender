import { ProfileOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React from 'react';
import styles from './index.less';

interface CardItemProps {
  data: API.Pinyin_16;
  previewHandle: () => void;
}
const CardItem: React.FC<CardItemProps> = ({ data, previewHandle }) => {
  return (
    <Card
      className={styles.cardItem}
      actions={[<span>使用</span>, <span onClick={previewHandle}>模板预览</span>]}
    >
      <Meta avatar={<ProfileOutlined />} title={data.name} description={data.name} />
    </Card>
  );
};

export default CardItem;
