import { Input, InputProps } from 'antd';
import React from 'react'

interface ComInputProps extends InputProps {
    value?: string;
    onChange?: (v: any) => void;
}
const ComInput:React.FC<ComInputProps> = ({ onChange, ...rest}) => {
    const changeHandle = (e: any) => {
        const val = e.target.value;
        onChange?.(val.replace(/[^\u4E00-\u9FA5A-Za-z]/g, ''));
    }
  return (
    <Input onChange={changeHandle} {...rest} />
  )
}

export default ComInput