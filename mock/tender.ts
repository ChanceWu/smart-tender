import { Request, Response } from 'express';
interface TenderItem {
  id: number;
  name: string; // 目录名称/素材名称
  parentId: number;
  level: number; // 目录层级
  isMaterial: boolean; // true：素材  false：目录
  file?: string[]; // 素材下载地址
}
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
    t: {
      id: 1,
      name: '标书模板库',
      parentId: 0,
    },
    children: [
      {
        t: {
          id: 29,
          name: '啊',
          parentId: 1,
        },
        children: [],
      },
    ],
  },
  {
    t: {
      id: 2,
      name: '标书产品库',
      parentId: 0,
    },
    children: [],
  },
  {
    t: {
      id: 3,
      name: '标书商务库',
      parentId: 0,
    },
    children: [],
  },
  {
    t: {
      id: 4,
      name: '标书素材库',
      parentId: 0,
    },
    children: [],
  },
  {
    t: {
      id: 19,
      name: '1string',
      parentId: 0,
    },
    children: [
      {
        t: {
          id: 21,
          name: '19string',
          parentId: 19,
        },
        children: [],
      },
      {
        t: {
          id: 22,
          name: '191string',
          parentId: 19,
        },
        children: [],
      },
      {
        t: {
          id: 23,
          name: '192string',
          parentId: 19,
        },
        children: [
          {
            t: {
              id: 16,
              name: 'string',
              parentId: 23,
            },
            children: [
              {
                t: {
                  id: 17,
                  name: '16string',
                  parentId: 16,
                },
                children: [
                  {
                    t: {
                      id: 18,
                      name: '17string',
                      parentId: 17,
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    t: {
      id: 20,
      name: '2string',
      parentId: 0,
    },
    children: [],
  },
  {
    t: {
      id: 25,
      name: 'AAA',
      parentId: 0,
    },
    children: [],
  },
  {
    t: {
      id: 26,
      name: 'BBB',
      parentId: 0,
    },
    children: [],
  },
  {
    t: {
      id: 27,
      name: 'CCC',
      parentId: 0,
    },
    children: [],
  },
  {
    t: {
      id: 28,
      name: 'DDDDDD',
      parentId: 0,
    },
    children: [],
  },
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
        categoryId: 1,
        categoryName: 'aaa',
        id: 1,
        modifier: '111',
        modifierId: 11,
        modifierName: 'zhangsan',
        name: 'aa',
        typeCode: 'WORD',
        fileDetailRespList: [{ fileUrl: '/download?file=docx/d1.docx', name: 'dsfsdfsd' }],
      },
      {
        categoryId: 1,
        categoryName: 'aaa',
        id: 2,
        modifier: '111',
        modifierId: 11,
        modifierName: 'zhangsan',
        name: 'aa',
        typeCode: 'PIC',
        fileDetailRespList: [
          { fileUrl: '/download?file=docx/001.jpg', name: 'ssssss' },
          {
            fileUrl: '/download?file=docx/002.jpg',
            name: '发射点发射点发射点的发射点发射点发射点',
          },
          {
            fileUrl: '/download?file=docx/031.png',
            name: '十分士大夫士大夫士大夫但是',
          },
        ],
      },
    ],
  });
};

export default {
  'GET /api/mock/tender/dirList': getTenderDirList,
  'GET /api/mock/tender/kmsDirList': getTenderKMSDirList,
  'GET /api/mock/tender/kmsList': getTenderKMSList,
  'GET /api/mock/material/list': getMaterialList,
};
