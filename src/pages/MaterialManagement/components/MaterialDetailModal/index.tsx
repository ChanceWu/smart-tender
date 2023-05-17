import { uploadUsingPOST } from '@/services/smart-tender-api/fileController';
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
} from 'antd';
import React, { useState } from 'react';

interface IProps {
  modalProps: ModalProps;
  form: FormInstance<MaterialType.MaterialInfo>;
  typeOption: MaterialType.CategoryTree[];
}

const MaterialDetailModal: React.FC<IProps> = ({ modalProps, form, typeOption }) => {
  const [typeCode, setTypeCode] = useState<'WORD' | 'PIC'>('WORD');
  return (
    <Modal {...modalProps} width={500}>
      <Form
        form={form}
        initialValues={{ typeCode: 'WORD' }}
        onValuesChange={(newVal) => {
          if (newVal.typeCode) setTypeCode(newVal.typeCode);
        }}
      >
        <Form.Item
          label="素材名称"
          name="name"
          rules={[{ required: true, message: '素材名称不能为空' }, { validator: validateName }]}
        >
          <Input placeholder="请输入" maxLength={30} />
        </Form.Item>
        <Form.Item
          label="素材分类"
          name="categoryId"
          rules={[{ required: true, message: '素材分类不能为空' }]}
          getValueFromEvent={(v) => v[v.length - 1]}
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
        <Form.Item
          name="fileIdList"
          label={typeCode === 'PIC' ? '上传图片' : '上传附件'}
          valuePropName="fileList"
          rules={[{ required: true, message: '附件不能为空' }]}
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
            listType={typeCode === 'PIC' ? 'picture-card' : 'text'}
            beforeUpload={() => false}
            multiple
          >
            {typeCode === 'PIC' ? '点击上传' : <Button icon={<UploadOutlined />}>上传文件</Button>}
          </Upload>
        </Form.Item>
        {/* <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: '目录名称不能为空' }]}
        >
          <Input placeholder="请输入目录名称" maxLength={15} />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default MaterialDetailModal;
