import React from 'react';
import styles from './index.less';
import tenderImg from '/public/icons/tender.svg';
import materialImg from '/public/icons/material.svg';
import materialLabImg from '/public/icons/materialLab.svg';

const IconMap = {
  tender: tenderImg,
  material: materialImg,
  materialLab: materialLabImg,
};

const MenuIcon = (icon: string) => {
  return <img className={styles.menuImg} src={IconMap[icon]} />;
};

export default MenuIcon;
