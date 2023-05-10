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
}
