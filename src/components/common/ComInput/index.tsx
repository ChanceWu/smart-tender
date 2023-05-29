import { Input, InputProps } from 'antd';
import React from 'react';

interface ComInputProps extends InputProps {
  value?: string;
  onChange?: (v: any) => void;
}
const ComInput: React.FC<ComInputProps> = ({ onChange, ...rest }) => {
  const changeHandle = (e: any) => {
    const val = e.target.value;
    const newVal = val.replace(/[^\u4E00-\u9FA5A-Za-z0-9\'\.\s]/g, '');
    // console.log('input', val, newVal);
    onChange?.(newVal);
  };
  return <Input {...rest} onChange={changeHandle} />;
};

export default ComInput;
