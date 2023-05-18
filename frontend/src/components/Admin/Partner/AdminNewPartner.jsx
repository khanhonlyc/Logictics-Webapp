import { Button, Form, Input, Upload } from 'antd';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import { MainContext } from '../../../context/MainContext';
import React, { useState, useContext } from 'react';
import { END_POINT } from '../../../utils/constant';

export default function AdminNewPartner({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    name: '',
    logo: '',
  });
  const [staffList, setStaffList] = useState([]);
  const [dataInput, setDataInput] = useState('');
  const [file, setFile] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  let formData = new FormData();
  // const postNewPartnerAPI = async (newData) => {
  //   try {
  //     const result = await axios({
  //       url: `${END_POINT}/admin/partner`,
  //       method: 'post',
  //       data: newData,
  //       headers: 'Bearer',
  //     });
  //     console.log(result.status);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // // const onFinish = (values) => {
  // //   console.log('Success:', values);
  // //   setAddPartner(() => {
  // //     return { ...values };
  // //   });
  //   postNewPartnerAPI(addPartner);
  //   // console.log(addCommit);
  // };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    console.log('Upload event:', e?.fileList);

    return e?.fileList;
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  // const onFileChange = (e) => {
  //   if (e.target && e.target.files[0]) {
  //     // formData.append('file', e.target.files[0]);
  //     setAddPartner({ file: e.target.files[0] });
  //   }
  //   console.log(e.target.files[0]);
  // };
  const submitData = () => {
    // console.log(dataInput, file);
    // formData.append('name', dataInput);
    // formData.append('logo', file);
    // console.log(formData);
    console.log(data);
    axios
      .post(`${END_POINT}/admin/partner`, {
        data: data,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const acceptAddNewDepartment = async () => {
    setLoading(true);
    // setIsDisable(true);
    const submitFormData = new FormData();
    submitFormData.append('name', data.name);
    submitFormData.append('logo', data.logo);
    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: `${END_POINT}/admin/partner`,
        data: submitFormData,
        headers: { 'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${accessToken}`
      },
      });
      if (response.status === 200) {
        alert('đã them thành công ');
      }
      setLoading(false);
      setIsDisable(false);
      refetchData();
      onClose();
    } catch (error) {
      setIsDisable(false);
      alert(error.response.data.message);
      setLoading(false);
      console.log(error);
    }
    // try {
    //   await axios.post(`${END_POINT}/admin/department`, data, {
    //     headers: { authorization: `Bearer ${accessToken}` },
    //   });
    //   setLoading(false);
    //   setIsDisable(false);
    //   refetchData();
    //   onClose();
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async () => {
    // store the states in the form data
    const submitFormData = new FormData();
    submitFormData.append('name', data.name);
    submitFormData.append('logo', data.logo);
    for (const value of submitFormData.values()) {
      console.log(value);
    }
    try {
      // make axios post request
      const response = await axios({
        method: 'post',
        url: `${END_POINT}/admin/partner`,
        data: submitFormData,
      headers: { 'Content-Type': 'multipart/form-data',
            authorization: `Bearer ${accessToken}`
      },
      });
      if (response.status === 200) {
        alert('đã them thành công ');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const acceptAddNewPartner = async () => {
  //   setLoading(true);
  //   // setIsDisable(true);
  //   try {
  //     await axios.post(`${END_POINT}/admin/partner`, data, {
  //       headers: { authorization: `Bearer ${accessToken}` },
  //     });
  //     setLoading(false);
  //     setIsDisable(false);
  //     refetchData();
  //     onClose();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
        <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
          <span className="text-xl uppercase font-bold h-fit">
            Thêm đối tác mới
          </span>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={
              {
                // remember: true,
              }
            }
            onFinish={acceptAddNewDepartment}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập Partner mới </h1>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Mời nhập tên partner',
                },
              ]}
            >
              <Input
                value={data.name}
                onChange={(e) => {
                  setData({
                    ...data,
                    name: e.target.value,
                  });
                }}
              />
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
              // valuePropName="fileList"
              // getValueFromEvent={normFile}
            >
              {/* <Upload
                  name={'logo'}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>
                    Click to Upload new logo
                  </Button>
                </Upload> */}
              <input
                type="file"
                name="file"
                value={data.logo}
                onChange={(e) => {
                  setData({
                    ...data,
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
                loading={loading}
                // onClick={submitData}
                type="primary"
                htmlType="submit"
                className="  bg-gradient-to-r from-orange-500 to-yellow-400 px-8 py-2 rounded-lg hover:opacity-80"
              >
                Submit
              </Button>
              <Button
                disabled={isDisable}
                onClick={onClose}
                type="primary"
                htmlType=""
                className={
                  !isDisable &&
                  ' bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80'
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
