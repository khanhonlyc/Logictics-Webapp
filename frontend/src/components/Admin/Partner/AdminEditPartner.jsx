import { Button, Form, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { END_POINT } from '../../../utils/constant';
import React, { useContext, useState } from 'react';
import { MainContext } from '../../../context/MainContext';
export default function AdminEditPartner({ onClose, data, refetchData }) {
  const [dataEdit, setDataEdit] = useState(data);
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);

  console.log('data là', dataEdit);
  const acceptEditDepartment = async () => {
    setLoading(true);
    let formEditData = new FormData();
    formEditData.append('name', dataEdit.name);
    formEditData.append('logo', dataEdit.logo);

    try {
      const response = await axios({
        method: 'put',
        url: `${END_POINT}/admin/partner/${data._id}`,
        data: formEditData,
        headers: { 'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${accessToken}`
      },
      });
      if (response.status === 200) {
        alert('đã them thành công ');
      }
      setLoading(false);
      // setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
        <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={acceptEditDepartment}
            initialValues={dataEdit}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập chỉnh sửa partner </h1>

            <Form.Item label="Name" name="name">
              <Input value={dataEdit.name} disabled />
            </Form.Item>

            <Form.Item
              name={'file'}
              label={'file'}
              rules={[
                {
                  required: true,
                  message: 'upload hình mới',
                },
              ]}
            >
              <input
                type="file"
                name="file"
                value={dataEdit.logo}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    logo: e.target.files[0],
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 13,
                span: 16,
              }}
            >
              <Button
                type="primary"
                loading={loading}
                htmlType="submit"
                className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
              >
                Submit
              </Button>
              <Button
                onClick={onClose}
                disabled={isDisable}
                type="primary"
                htmlType=""
                className={
                  !isDisable &&
                  'bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80'
                }
              >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
