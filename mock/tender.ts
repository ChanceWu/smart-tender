import { Request, Response } from 'express';

const getTenderDirList = (req: Request, res: Response) => {
  res.status(200).send({
    total: 5,
    page: 1,
    pageSize: 10,
    resultList: [
      { name: '概述', id: '1', isMaterial: false, parentId: '0' },
      { name: '素材一', id: '11', isMaterial: true, parentId: '1', file: '1' },
      { name: '项目总体要求', id: '2', isMaterial: false, parentId: '0' },
      {
        name: '是的冯绍峰是的方辅导费沙发斯蒂芬是辅导费沙发斯蒂芬孙菲菲师傅的说法',
        id: '22',
        isMaterial: false,
        parentId: '2',
      },
      { name: '素材二', id: '222', isMaterial: true, parentId: '22', file: '2' },
    ],
  });
};

export default {
  'GET /api/mock/tender/dirList': getTenderDirList,
};
