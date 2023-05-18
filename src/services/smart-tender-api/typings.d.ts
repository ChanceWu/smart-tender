declare namespace API {
  type BaseResult_ = {
    code?: number;
    data?: Pinyin_3;
    msg?: string;
  };

  type BaseResult2 = {
    code?: number;
    data?: Pinyin_6;
    msg?: string;
  };

  type BaseResult3 = {
    code?: number;
    data?: Pinyin_8;
    msg?: string;
  };

  type BaseResult4 = {
    code?: number;
    data?: Pinyin_10;
    msg?: string;
  };

  type BaseResultBoolean_ = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type BaseResultListTreeNode_ = {
    code?: number;
    data?: TreeNode2[];
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

  type Pinyin__ = {
    /** 标书素材分类id */
    categoryId?: number;
    /** 标书素材文件id */
    fileIdList?: number[];
    /** 主键id */
    id?: number;
    /** 标书素材名称 */
    name?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeCode?: string;
  };

  type Pinyin_10 = true;

  type Pinyin_2 = {
    /** 分页查询页码 */
    pageNumber?: number;
    /** 分页查询单页个数 */
    pageSize?: number;
    /** 上传上传最大id */
    queryId?: number;
    req?: Pinyin_9;
  };

  type Pinyin_3 = {
    /** 分页查询数据集合 */
    data?: Pinyin_8[];
    /** 分页查询页码 */
    pageNumber?: number;
    /** 分页查询单页大小 */
    pageSize?: number;
    /** 分页查询结果总页 */
    totalPages?: number;
    /** 分页查询结果总数 */
    totalSize?: number;
  };

  type Pinyin_4 = {
    /** 标书名称 */
    name: string;
    /** 标书素材id */
    tenderSourceId?: number;
    tenderToc: TreeNode_;
    /** 是否创建目录 */
    tocCreateFlag: boolean;
  };

  type Pinyin_5 = {
    /** 标书素材分类id */
    categoryId?: number;
    /** 标书素材文件id */
    fileIdList?: number[];
    /** 标书素材名称 */
    name?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeCode?: string;
  };

  type Pinyin_6 = {
    /** 文件地址 */
    fileUrl?: string;
    /** 主键id */
    id?: number;
    /** 文件唯一标识 */
    key?: string;
    /** 文件名称 */
    name?: string;
    /** 文件后缀,文件地址 */
    postfix?: string;
  };

  type Pinyin_7 = {
    /** 主键id */
    id?: number;
    /** 分类名称 */
    name?: string;
    /** 父类id */
    parentId?: number;
  };

  type Pinyin_8 = {
    /** 分类id */
    categoryId?: number;
    /** 分类名称 */
    categoryName?: string;
    /** 文件详情对象 */
    fileDetailRespList?: Pinyin_6[];
    /** 主键id */
    id?: number;
    /** 修改人 */
    modifier?: string;
    /** 修改人id */
    modifierId?: number;
    /** 修改人名称 */
    modifierName?: string;
    /** 修改时间 */
    modifyTime?: string;
    /** 分类名称 */
    name?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeCode?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeName?: string;
  };

  type Pinyin_9 = {
    /** 素材分类id */
    categoryId?: number;
    /** 素材名称 */
    name?: string;
  };

  type TenderSourceCategoryCreateReq = {
    /** 分类名称 */
    name?: string;
    /** 父类id */
    parentId?: number;
  };

  type TreeNode_ = {
    children?: TreeNode_[];
    t?: Pinyin_4;
  };

  type TreeNode2 = {
    children?: TreeNode2[];
    t?: Pinyin_8;
  };
}
