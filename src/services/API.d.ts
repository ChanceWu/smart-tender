// 公共类型
declare namespace API {}
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
