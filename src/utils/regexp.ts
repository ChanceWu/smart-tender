import type { RuleObject } from 'antd/lib/form';

export const validateName = (_: RuleObject, value: any) => {
  const pattern = /^[a-zA-Z\u4e00-\u9fa5]+$/; // 匹配中英文的正则表达式
  if (!pattern.test(value)) {
    return Promise.reject('只能输入中英文');
  }
  return Promise.resolve();
};
