declare namespace API {
  type BaseResult_ = {
    code?: number;
    data?: Pinyin_2;
    msg?: string;
  };

  type BaseResultBoolean_ = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type BaseResultList_ = {
    code?: number;
    data?: Pinyin_2[];
    msg?: string;
  };

  type BaseResultListTreeNode_ = {
    code?: number;
    data?: TreeNode_[];
    msg?: string;
  };

  type BaseResultPageResult_ = {
    code?: number;
    data?: PageResult_;
    msg?: string;
  };

  type BaseResultString_ = {
    code?: number;
    data?: string;
    msg?: string;
  };

  type createUsingGETParams = {
    /** key */
    key: string;
  };

  type Id_ = {
    /** 主键id */
    id?: number;
  };

  type PageResult_ = {
    data?: Pinyin_2[];
    pageNumber?: number;
    pageSize?: number;
    totalElements?: number;
    totalPages?: number;
  };

  type Pinyin__ = {
    /** 主键id */
    id?: number;
    /** 分类名称 */
    name?: string;
    /** 父类id */
    parentId?: number;
  };

  type Pinyin_2 = {
    /** 主键id */
    id?: number;
    /** 分类名称 */
    name?: string;
    /** 父类id */
    parentId?: number;
  };

  type tenderCategoryCreateReq = {
    /** 分类名称 */
    name?: string;
    /** 父类id */
    parentId?: number;
  };

  type TreeNode_ = {
    children?: TreeNode_[];
    t?: Pinyin_2;
  };
}
