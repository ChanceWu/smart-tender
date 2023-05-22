import { request } from 'umi';
import type { PaginationResult } from './types';

export async function getAuthorize(ticket: string) {
  return request<any>(`/inner/authorize`, {
    method: 'get',
    params: {
      ticket,
    },
    // withCredentials: true
  });
}

// 标书制作 目录列表
// export async function queryTenderDirList() {
//   return request<PaginationResult<TenderType.TenderDir>>(
//     `/usercenter/inter-api/rbac/v1/userPermission/findUserOperate`,
//     {
//       method: 'get',
//       headers: {
//         Authorization: 'Bearer 1486f884-a2ea-4a87-aec1-eb5018bee0b8',
//       },
//       params: {
//         menuInfoCode: 'ShiftLog_5.0.0.00_shiftLogInfo_handoverOperation',
//       },
//     },
//   );
// }
export async function queryTenderDirList() {
  return request<PaginationResult<TenderType.TenderDir>>(`/api/mock/tender/dirList`, {
    method: 'get',
  });
}

// 标书制作 KMS目录列表
export async function queryTenderKMSDirList() {
  return request<PaginationResult<TenderType.KMSDirList>>(`/api/mock/tender/kmsDirList`, {
    method: 'get',
  });
}

// 标书制作 KMS素材列表
export async function queryTenderKMSList(params: TenderType.KMSListQueryParams) {
  return request<PaginationResult<TenderType.KMSList>>(`/api/mock/tender/kmsList`, {
    method: 'get',
    params,
  });
}

// 标书制作 生成标书
export async function createTender(data: TenderType.TenderDirTreeNode[]) {
  return request<PaginationResult<TenderType.TenderDir>>(`/inner/docx-merger`, {
    method: 'post',
    data,
  });
}

// 标书列表
export async function queryTenderList(params: TenderType.TenderQueryParams) {
  return request<PaginationResult<TenderType.TenderItem>>(`/api/mock/tender/List`, {
    method: 'get',
    params,
  });
}
