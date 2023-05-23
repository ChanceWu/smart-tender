// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

/** 下载 GET /inter-api/tender/file/download/${param0} */
export async function createUsingGET(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.createUsingGETParams,
  options?: { [key: string]: any },
) {
  const { key: param0, ...queryParams } = params;
  return request<any>(`/inter-api/tender/file/download/${param0}`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 上传 POST /inter-api/tender/file/upload */
export async function uploadUsingPOST(body: {}, file?: File, options?: { [key: string]: any }) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      formData.append(
        ele,
        typeof item === 'object' && !(item instanceof File) ? JSON.stringify(item) : item,
      );
    }
  });

  return request<API.BaseResult3>('/inter-api/tender/file/upload', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
