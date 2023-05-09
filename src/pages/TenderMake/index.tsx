import React from 'react';
import DirTree from './components/DirTree';
import MaterialList from './components/MaterialList';
import styles from './index.less';

const TenderMake = () => {
  return (
    <div className={styles.container}>
      <DirTree />
      <MaterialList />
    </div>
  );
};

export default TenderMake;
