// 公共类型
declare namespace API { }
declare namespace TenderType {
  export interface TenderDir {
    id: string;
    name: string;
    isMaterial: boolean;
    file?: string;
    parentId: string;
  }
  export interface TenderDirTreeNode {
    id: string;
    name: string;
    isMaterial: boolean;
    file?: string;
    parentId: string;
    children: TenderDirTreeNode[];
  }
  export interface MarginSet {
    left: string;
    right: string;
    top: string;
    bottom: string;
  }
  export interface TitleSet {
    id: string;
    level: string;
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
    align: string;
  }
  export interface PreFormat {
    margin: MarginSet;
    title: TitleSet[];
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
    fileIdList?: number[];
    /** 标书素材名称 */
    name?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeCode?: string;
  }
}
