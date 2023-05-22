import type { RcFile } from 'antd/lib/upload';

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getQueryParams = (url: string): { [key: string]: string } => {
  const queryParams: { [key: string]: string } = {};
  const queryString = url.split('?')[1];
  if (queryString) {
    const pairs = queryString.split('&');
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      queryParams[key] = decodeURIComponent(value);
    });
  }
  return queryParams;
}

export const generatePath = (value: number, options: MaterialType.CategoryTree[]): number[] | undefined => {
  for (const option of options) {
    if (option.id === value) {
      return [value];
    }
    if (option.children) {
      const path = generatePath(value, option.children);
      if (path) {
        return [option.id!, ...path];
      }
    }
  }
  return;
}
