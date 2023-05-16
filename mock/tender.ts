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

const KMSDirList = [
  {
    name: '标书模板库',
    id: '1',
    isMaterial: false,
    parentId: '0',
    children: [
      {
        name: '分类一',
        id: '11',
        isMaterial: false,
        parentId: '1',
        children: [
          { name: '分类1.1', id: '111', isMaterial: false, parentId: '11' },
          { name: '分类1.2', id: '112', isMaterial: false, parentId: '11' },
        ],
      },
      { name: '分类二', id: '12', isMaterial: false, parentId: '1', children: [] },
    ],
  },
  {
    name: '标书产品库',
    id: '2',
    isMaterial: false,
    parentId: '0',
    children: [{ name: '分类一', id: '21', isMaterial: false, parentId: '2' }],
  },
  { name: '标书商务库', id: '3', isMaterial: false, parentId: '0', children: [] },
  { name: '标书封面库', id: '4', isMaterial: false, parentId: '0', children: [] },
  { name: '标书工业库', id: '5', isMaterial: false, parentId: '0', children: [] },
  { name: '标书制造库', id: '6', isMaterial: false, parentId: '0', children: [] },
];
const getTenderKMSDirList = (req: Request, res: Response) => {
  res.status(200).send({
    total: 6,
    page: 1,
    pageSize: 10,
    resultList: KMSDirList,
  });
};

const KMSList = [
  { name: 'a', type: '1/11/111', status: 'public', id: '1', path: '' },
  { name: 'b', type: '1/11/111', status: 'public', id: '2', path: '' },
  { name: 'c', type: '1/11/112', status: 'public', id: '3', path: '' },
  { name: 'd', type: '1/11', status: 'public', id: '4', path: '' },
  { name: 'e', type: '1/11', status: 'public', id: '5', path: '' },
  { name: 'f', type: '1/11', status: 'public', id: '6', path: '' },
  { name: 'g', type: '1/11', status: 'public', id: '7', path: '' },
  { name: 'h', type: '1/11', status: 'public', id: '8', path: '' },
  { name: 'i', type: '1/11', status: 'public', id: '9', path: '' },
  { name: 'j', type: '1/11', status: 'public', id: '10', path: '' },
  { name: 'k', type: '1/11', status: 'public', id: '11', path: '' },
];
const getTenderKMSList = (req: Request, res: Response) => {
  const type = req.query.type as string;
  res.status(200).send({
    total: 6,
    page: 1,
    pageSize: 10,
    resultList: KMSList.filter((v) => v.type.split('/').includes(type)),
  });
};

const getMaterialList = (req: Request, res: Response) => {
  res.status(200).send({
    total: 6,
    page: 1,
    pageSize: 10,
    resultList: [
      {
        name: '标书模板库',
        id: '1',
        parentId: '0',
        children: [
          {
            name: '分类一',
            id: '11',
            parentId: '1',
            children: [
              { name: '分类1.1', id: '111', parentId: '11', children: [] },
              { name: '分类1.2', id: '112', parentId: '11', children: [] },
            ],
          },
          { name: '分类二', id: '12', parentId: '1', children: [] },
        ],
      },
      {
        name: '标书产品库',
        id: '2',
        parentId: '0',
        children: [{ name: '分类一', id: '21', parentId: '2', children: [] }],
      },
      { name: '标书商务库', id: '3', parentId: '0', children: [] },
      { name: '标书封面库', id: '4', parentId: '0', children: [] },
      { name: '标书工业库', id: '5', parentId: '0', children: [] },
      { name: '标书制造库', id: '6', parentId: '0', children: [] },
    ],
  });
};

export default {
  'GET /api/mock/tender/dirList': getTenderDirList,
  'GET /api/mock/tender/kmsDirList': getTenderKMSDirList,
  'GET /api/mock/tender/kmsList': getTenderKMSList,
  'GET /api/mock/material/list': getMaterialList,
};
