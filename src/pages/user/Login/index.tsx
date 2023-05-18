import React, { useEffect } from 'react';

const Login: React.FC = () => {
  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const ticket = urlParams.get('ticket');
    const ticket = localStorage.getItem('ticket');
    console.log('ticket', ticket);
    if (ticket) {
      window.location.href = '/'; // 重定向到首页
    }
  }, []);

  return <></>;
};

export default Login;
