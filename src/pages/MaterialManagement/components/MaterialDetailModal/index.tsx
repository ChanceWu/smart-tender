import ComInput from '@/components/common/ComInput';
import { uploadUsingPOST } from '@/services/smart-tender-api/fileController';
import { generatePath } from '@/utils/common';
import { validateName } from '@/utils/regexp';
import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Form,
  FormInstance,
  Input,
  Modal,
  ModalProps,
  Radio,
  Upload,
  UploadProps,
  message,
} from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useCallback, useEffect, useState } from 'react';

interface IProps {
  modalProps: ModalProps;
  form: FormInstance<MaterialType.MaterialInfo>;
  formData: MaterialType.MaterialInfo | null;
  typeOption: MaterialType.CategoryTree[];
}

const beforeUploadImage = (file: RcFile) => {
  const isJpgOrPng = ['image/jpg', 'image/jpeg', 'image/png'].includes(file.type);
  if (!isJpgOrPng) {
    message.error('支持扩展名：jpg/jpeg/png文件');
  }
  const isLt10M = file.size / 1024 / 1024 < 10;
  if (!isLt10M) {
    message.error('图片大小不超过10M');
  }
  return isJpgOrPng && isLt10M;
};
const beforeUploadFile = (file: RcFile) => {
  const isLt10M = file.size / 1024 / 1024 < 100;
  if (!isLt10M) {
    message.error('文件大小不超过100M');
  }
  return isLt10M;
};

const MaterialDetailModal: React.FC<IProps> = ({ modalProps, form, formData, typeOption }) => {
  const [typeCode, setTypeCode] = useState<string>('WORD');
  console.log(typeCode);
  useEffect(() => {
    if (modalProps.open === false) setTypeCode('WORD');
  }, [modalProps.open]);
  useEffect(() => {
    if (formData) {
      const categoryId: any = generatePath(formData.categoryId!, typeOption);
      if (categoryId) {
        form.setFieldsValue({ ...formData, categoryId });
      } else {
        form.setFieldsValue(formData);
      }
      if (formData.typeCode) setTypeCode(formData.typeCode);
    }
  }, [form, formData]);
  const customUpload: UploadProps['customRequest'] = useCallback(
    async (option) => {
      console.log(option.file);
      //   const form = new FormData();
      //   form.append('file', file.file);
      //   // form 对象 就是我们上传接口需要的参数
      //  // 调用api接口进行请求 , uploadFile 是走我们封装的 请求的 , 请求头 token 都包含
      const { data, code, msg } = await uploadUsingPOST({}, option.file as File);
      // 拿到调取接口返回的数据
      if (code === 1) {
        option.onSuccess(data);
        // const fileIds = form.getFieldValue('fileIdList');
        // console.log('fileIds', fileIds)
        // form.setFieldValue('fileIdList', [...fileIds, data?.id!]);
      } else {
        message.error(msg);
      }
      // option.onSuccess = (...v) => {}
    },
    [form],
  );
  return (
    <Modal {...modalProps} width={500} destroyOnClose>
      <Form
        form={form}
        initialValues={{ typeCode: 'WORD' }}
        onValuesChange={(newVal) => {
          if (newVal.typeCode) {
            setTypeCode(newVal.typeCode);
            form.setFieldValue('fileIdList', []);
          }
        }}
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="素材名称"
          name="name"
          rules={[{ required: true, message: '素材名称不能为空' }, { validator: validateName }]}
        >
          <ComInput placeholder="请输入" maxLength={30} />
        </Form.Item>
        <Form.Item
          label="素材分类"
          name="categoryId"
          rules={[{ required: true, message: '素材分类不能为空' }]}
          // getValueFromEvent={(v) => v[v.length - 1]}
        >
          <Cascader
            options={typeOption}
            fieldNames={{ label: 'name', value: 'id' }}
            placeholder="请选择"
            changeOnSelect
          />
        </Form.Item>
        <Form.Item
          label="素材类型"
          name="typeCode"
          rules={[{ required: true, message: '素材类型不能为空' }]}
        >
          <Radio.Group>
            <Radio value="WORD">文件</Radio>
            <Radio value="PIC">图片</Radio>
          </Radio.Group>
        </Form.Item>
        {typeCode === 'PIC' && (
          <Form.Item
            name="fileIdList"
            label="上传图片"
            valuePropName="fileList"
            rules={[{ required: true, message: '附件不能为空' }]}
            extra="支持扩展名：jpg/jpeg/png文件，大小不超过10M"
            getValueFromEvent={(e: any) => {
              console.log('Upload event:', e);
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload
              name="logo"
              action="/file/upload"
              listType="picture-card"
              accept=".jpg,.jpeg,.png"
              beforeUpload={beforeUploadImage}
              customRequest={customUpload}
              // multiple
              maxCount={10}
              showUploadList={{ showPreviewIcon: false }}
            >
              {'点击上传'}
            </Upload>
          </Form.Item>
        )}
        {typeCode === 'WORD' && (
          <Form.Item
            name="fileIdList"
            label="上传附件"
            valuePropName="fileList"
            rules={[{ required: true, message: '附件不能为空' }]}
            extra="支持扩展名：.docx文件，大小不超过100M"
            getValueFromEvent={(e: any) => {
              console.log('Upload event:', e);
              if (Array.isArray(e)) {
                return e;
              }
              return e?.fileList;
            }}
          >
            <Upload
              name="logo"
              action="/file/upload"
              listType="text"
              accept=".docx"
              beforeUpload={beforeUploadFile}
              customRequest={customUpload}
              // previewFile={previewHandle}
              // multiple
            >
              <Button icon={<UploadOutlined />}>上传文件</Button>
            </Upload>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default MaterialDetailModal;
