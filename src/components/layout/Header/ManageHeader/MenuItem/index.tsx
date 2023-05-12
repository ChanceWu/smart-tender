import React from 'react';
import styles from './index.less';

interface IProp {
  active?: boolean;
  title?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const HeaderMenu: React.FunctionComponent<IProp> = ({ active, title, onClick }: IProp) => {
  return (
    <div className={active ? styles.menuActiveWrap : styles.menuItemWrap} onClick={onClick}>
      {title}
    </div>
  );
};

export default HeaderMenu;
