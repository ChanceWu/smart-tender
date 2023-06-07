import { Request, Response } from 'express';

const TemplateList = {
    "code": 1,
    "msg": "操作成功!",
    "data": {
        "data": [
            {
                "id": 227,
                "name": "预设样式标书",
                "status": "SUCCESS",
                "statusName": null,
                "madeFileKey": "602addfa-602e-4db7-8d86-db1b38679874",
                "creatorId": 3418276614630400,
                "creator": "吴遣鹏",
                "creatorName": null,
                "createTime": "2023-06-05 16:17:45",
                "modifierId": 3418276614630400,
                "modifierName": null,
                "modifier": "吴遣鹏",
                "modifyTime": "2023-06-05T16:26:22"
            },
            {
                "id": 226,
                "name": "zzz测试自动化生成标书auto勿动",
                "status": "MAKING",
                "statusName": null,
                "madeFileKey": "",
                "creatorId": 3420309376329968,
                "creator": "张真真",
                "creatorName": null,
                "createTime": "2023-06-02 14:02:58",
                "modifierId": 3420309376329968,
                "modifierName": null,
                "modifier": "张真真",
                "modifyTime": "2023-06-02T14:02:58"
            },
            {
                "id": 221,
                "name": "zzz自动化生成标书1",
                "status": "SUCCESS",
                "statusName": null,
                "madeFileKey": "379023dd-114c-4bb3-9337-e64c58c6c119",
                "creatorId": 3420309376329968,
                "creator": "张真真",
                "creatorName": null,
                "createTime": "2023-06-01 13:36:06",
                "modifierId": 3420309376329968,
                "modifierName": null,
                "modifier": "张真真",
                "modifyTime": "2023-06-01T13:38:21"
            },
            {
                "id": 220,
                "name": "智能工厂投标文件11",
                "status": "SUCCESS",
                "statusName": null,
                "madeFileKey": "08d1ef31-874c-4318-97ec-68d4881509ff",
                "creatorId": 3434560061532400,
                "creator": "常向坤",
                "creatorName": null,
                "createTime": "2023-05-31 10:19:07",
                "modifierId": 3434560061532400,
                "modifierName": null,
                "modifier": "常向坤",
                "modifyTime": "2023-05-31T10:19:10"
            },
            {
                "id": 219,
                "name": "测试1111",
                "status": "SUCCESS",
                "statusName": null,
                "madeFileKey": "97a2d8e1-0564-41bd-ad05-36a1877f31ca",
                "creatorId": 3434560061532400,
                "creator": "常向坤",
                "creatorName": null,
                "createTime": "2023-05-31 10:12:45",
                "modifierId": 3434560061532400,
                "modifierName": null,
                "modifier": "常向坤",
                "modifyTime": "2023-05-31T10:13:00"
            },
            {
                "id": 218,
                "name": "测试11",
                "status": "SUCCESS",
                "statusName": null,
                "madeFileKey": "9e7bc35b-ce38-4fbb-9047-bf393e9e4d29",
                "creatorId": 3434560061532400,
                "creator": "常向坤",
                "creatorName": null,
                "createTime": "2023-05-31 09:29:00",
                "modifierId": 3434560061532400,
                "modifierName": null,
                "modifier": "常向坤",
                "modifyTime": "2023-05-31T09:29:16"
            },
            {
                "id": 217,
                "name": "1111",
                "status": "MAKING",
                "statusName": null,
                "madeFileKey": "",
                "creatorId": 3434560061532400,
                "creator": "常向坤",
                "creatorName": null,
                "createTime": "2023-05-31 09:21:45",
                "modifierId": 3434560061532400,
                "modifierName": null,
                "modifier": "常向坤",
                "modifyTime": "2023-05-31T09:21:45"
            },
            {
                "id": 216,
                "name": "sss",
                "status": "SUCCESS",
                "statusName": null,
                "madeFileKey": "cddbdb07-ccc5-4795-bff3-ff36cd5fbdda",
                "creatorId": 3418276614630400,
                "creator": "吴遣鹏",
                "creatorName": null,
                "createTime": "2023-05-31 09:20:38",
                "modifierId": 3418276614630400,
                "modifierName": null,
                "modifier": "吴遣鹏",
                "modifyTime": "2023-05-31T09:20:39"
            },
            {
                "id": 215,
                "name": "嘿嘿",
                "status": "SUCCESS",
                "statusName": null,
                "madeFileKey": "7d5b154b-fbb4-4ea8-8411-bd77328f5e3e",
                "creatorId": 3420309376329968,
                "creator": "张真真",
                "creatorName": null,
                "createTime": "2023-05-31 09:18:06",
                "modifierId": 3420309376329968,
                "modifierName": null,
                "modifier": "张真真",
                "modifyTime": "2023-05-31T09:18:07"
            },
            {
                "id": 214,
                "name": "智能工厂商务投标文件1",
                "status": "MAKING",
                "statusName": null,
                "madeFileKey": "",
                "creatorId": 3434560061532400,
                "creator": "常向坤",
                "creatorName": null,
                "createTime": "2023-05-31 09:17:41",
                "modifierId": 3434560061532400,
                "modifierName": null,
                "modifier": "常向坤",
                "modifyTime": "2023-05-31T09:17:41"
            }
        ],
        "pageNumber": 1,
        "pageSize": 10,
        "totalSize": 108,
        "totalPages": 11
    }
}

const getTemplateList = (req: Request, res: Response) => {
    res.status(200).send(TemplateList);
};

export default {
    'GET /api/mock/template': getTemplateList,
};
