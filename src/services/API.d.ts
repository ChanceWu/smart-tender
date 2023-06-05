// 公共类型
declare namespace API {
  export interface CurrentUser {
    currentCompany: {
      code: string;
      id: number;
      name: string;
    };
    expire: number;
    loginType: string;
    status: string;
    tenantId: string;
    uniqueLogin: boolean;
    userId: number;
    userType: number;
    username: string;
    ticket: string;
    staffCode: string;
    staffName: string;
  }
  export interface FindUserOperateResult {
    list: string[];
  }
  export interface MenusPermissionItem {
    code: string;
    children: MenusPermissionItem[];
  }
  export interface GetMenusPermission {
    list: MenusPermissionItem[];
  }
}
declare namespace TenderType {
  export interface TenderDir {
    id: string;
    name: string;
    sourceFlag: boolean;
    tenderSourceDto?: API.Pinyin_13[];
    parentId: string;
    level?: number;
  }
  export interface TenderDirTreeNode {
    id: string;
    name: string;
    sourceFlag: boolean;
    tenderSourceDto?: API.Pinyin_13[];
    parentId: string;
    level: number;
    children: TenderDirTreeNode[];
  }
  export interface MarginSet {
    left?: string;
    right?: string;
    top?: string;
    bottom?: string;
  }
  export interface HeaderSet {
    id: number;
    level?: string;
    fontFamily?: string;
    fontSize?: string;
    alignment?: string;
    lineHeight?: string;
  }
  export interface PreStyle {
    margin?: MarginSet;
    header?: HeaderSet[];
  }
  export interface KMSDirList {
    name?: string;
    id?: number;
    parentId?: number;
    children?: KMSDirList[];
  }
  export interface KMSList {
    name: string;
    type: string;
    status: 'public' | 'private';
    id: string;
    path: string;
  }
  export interface KMSListQueryParams {
    type?: string;
    keyword?: string;
  }
  export interface TenderItem {
    name: string;
    id: number;
    status: string;
    createTime: string;
    creator: string;
    creatorId: string;
    fileKey: string;
  }
  export interface TenderQueryParams {
    name?: string;
    status?: string;
    createTimeStart?: string;
    createTimeEnd?: string;
  }
  export interface CreateTender {
    name: string;
  }
}

declare namespace MaterialType {
  export interface CategoryTree {
    name?: string;
    id?: number;
    parentId?: number;
    level?: number;
    children?: CategoryTree[];
  }

  export interface MaterialInfo {
    /** 标书素材分类id */
    categoryId?: number;
    /** 标书素材分类名称 */
    categoryName?: string;
    /** 标书素材文件id */
    fileIdList?: API.Pinyin_11[];
    /** 标书素材名称 */
    name?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeCode?: string;
    id?: number;
  }
}
