declare namespace API {
  type BaseResult_ = {
    code?: number;
    data?: Pinyin_5;
    msg?: string;
  };

  type BaseResult2 = {
    code?: number;
    data?: Pinyin_6;
    msg?: string;
  };

  type BaseResult3 = {
    code?: number;
    data?: Pinyin_11;
    msg?: string;
  };

  type BaseResult4 = {
    code?: number;
    data?: Pinyin_13;
    msg?: string;
  };

  type BaseResultBoolean_ = {
    code?: number;
    data?: boolean;
    msg?: string;
  };

  type BaseResultListTreeNodeTenderSourceCategoryDetailResp_ = {
    code?: number;
    data?: TreeNodeTenderSourceCategoryDetailResp_[];
    msg?: string;
  };

  type BaseResultTenderSourceCategoryDetailResp_ = {
    code?: number;
    data?: tenderSourceCategoryDetailResp;
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

  type Pinyin_10 = {
    /** 制作时间结束时间 */
    createEndTime?: string;
    /** 制作时间开始时间 */
    createStartTime?: string;
    /** 标书名称 精准 */
    name?: string;
    /** 标书名称 模糊 */
    nameSearch?: string;
    /** 标书状态 */
    status?: string;
  };

  type Pinyin_11 = {
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

  type Pinyin_12 = {
    /** 主键id */
    id?: number;
    /** 分类名称 */
    name?: string;
    /** 父类id */
    parentId?: number;
    file?: string;
  };

  type Pinyin_13 = {
    /** 分类id */
    categoryId?: number;
    /** 分类名称 */
    categoryName?: string;
    /** 文件详情对象 */
    fileDetailRespList?: Pinyin_11[];
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
    /** 素材名称 */
    name?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeCode?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeName?: string;
  };

  type Pinyin_14 = {
    /** 制作时间结束时间 */
    createEndTime?: string;
    /** 制作时间开始时间 */
    createStartTime?: string;
    /** 创建人名称 精准 */
    creator?: string;
    /** 创建人名称 模糊 */
    creatorSearch?: string;
    /** 标书名称 精准 */
    name?: string;
    /** 标书名称 模糊 */
    nameSearch?: string;
    /** 标书状态 */
    status?: string;
  };

  type Pinyin_15 = {
    /** 素材分类id */
    categoryId?: number;
    /** 素材名称 */
    name?: string;
  };

  type Pinyin_16 = {
    /** 创建时间 */
    createTime?: string;
    /** 创建人名称 */
    creator?: string;
    /** 创建人id */
    creatorId?: number;
    /** 创建人域账号 */
    creatorName?: string;
    /** 标书id */
    id?: number;
    /** 标书文件地址Key */
    madeFileKey?: string;
    /** 修改人名称 */
    modifier?: string;
    /** 修改人id */
    modifierId?: number;
    /** 修改人域账号 */
    modifierName?: string;
    /** 修改时间 */
    modifyTime?: string;
    /** 标书名称 */
    name?: string;
    /** 标书状态 */
    status?: string;
    /** 标书状态名称 */
    statusName?: string;
  };

  type Pinyin_2 = {
    /** 分页查询页码 */
    pageNumber?: number;
    /** 分页查询单页个数 */
    pageSize?: number;
    /** 上传上传最大id */
    queryId?: number;
    req?: Pinyin_10;
  };

  type Pinyin_3 = {
    /** 分页查询页码 */
    pageNumber?: number;
    /** 分页查询单页个数 */
    pageSize?: number;
    /** 上传上传最大id */
    queryId?: number;
    req?: Pinyin_14;
  };

  type Pinyin_4 = {
    /** 分页查询页码 */
    pageNumber?: number;
    /** 分页查询单页个数 */
    pageSize?: number;
    /** 上传上传最大id */
    queryId?: number;
    req?: Pinyin_15;
  };

  type Pinyin_5 = {
    /** 分页查询数据集合 */
    data?: Pinyin_13[];
    /** 分页查询页码 */
    pageNumber?: number;
    /** 分页查询单页大小 */
    pageSize?: number;
    /** 分页查询结果总页 */
    totalPages?: number;
    /** 分页查询结果总数 */
    totalSize?: number;
  };

  type Pinyin_6 = {
    /** 分页查询数据集合 */
    data?: Pinyin_16[];
    /** 分页查询页码 */
    pageNumber?: number;
    /** 分页查询单页大小 */
    pageSize?: number;
    /** 分页查询结果总页 */
    totalPages?: number;
    /** 分页查询结果总数 */
    totalSize?: number;
  };

  type Pinyin_7 = {
    /** 标书名称 */
    name: string;
    /** 标书目录 */
    tenderToc: TreeNodeTenderTocCreateDto_[];
  };

  type Pinyin_8 = {
    /** 标书素材分类id */
    categoryId?: number;
    /** 标书素材文件id */
    fileIdList?: number[];
    /** 标书素材名称 */
    name?: string;
    /** 文件类型 WORD:文档 PIC：图片 */
    typeCode?: string;
  };

  type Pinyin_9 = {
    /** 文件地址 */
    fileKey?: string;
    /** 标书id不能为空 */
    id: number;
    /** 状态 */
    status: string;
  };

  type TenderSourceCategoryCreateReq = {
    /** 分类名称 */
    name?: string;
    /** 父类id */
    parentId?: number;
  };

  type tenderSourceCategoryDetailResp = {
    /** 主键id */
    id?: number;
    /** 分类名称 */
    name?: string;
    /** 父类id */
    parentId?: number;
  };

  type TenderTocCreateDto = {
    /** 是否为素材 */
    sourceFlag: boolean;
    /** 标书素材对象 */
    tenderSourceId?: number;
    /** 标书目录名称 */
    tocName?: string;
  };

  type TreeNodeTenderSourceCategoryDetailResp_ = {
    children?: TreeNodeTenderSourceCategoryDetailResp_[];
    t?: tenderSourceCategoryDetailResp;
  };

  type TreeNodeTenderTocCreateDto_ = {
    children?: TreeNodeTenderTocCreateDto_[];
    t?: TenderTocCreateDto;
  };
}
