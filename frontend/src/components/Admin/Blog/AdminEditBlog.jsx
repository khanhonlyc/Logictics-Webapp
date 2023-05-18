import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
export default function AdminEditBlog({ onClose, data, refetchData }) {
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);

  const acceptEditDepartment = async () => {
    setLoading(true);
    let formEditData = new FormData();
    formEditData.append("title", dataEdit.title);
    formEditData.append("description", dataEdit.description);
    formEditData.append("content", dataEdit.content);
    formEditData.append("categorys", dataEdit.categorys);
    formEditData.append("picture", dataEdit.picture);

    try {
      const response = await axios({
        method: "put",
        url: `${END_POINT}/admin/blog/${data._id}`,
        data: formEditData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        alert("đã sửa thành công ");
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
            <h1 className="uppercase"> Vui lòng nhập chỉnh sửa blog </h1>

            <Form.Item
              label="Tiêu đề"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Mời nhập tiêu đề blog",
                },
              ]}
            >
              <Input
                value={dataEdit.title}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    title: e.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Mời nhập mô tả blog",
                },
              ]}
            >
              <Input
                value={dataEdit.description}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    description: e.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Nội dung"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Mời nhập nội dung blog",
                },
              ]}
            >
              <Input
                value={dataEdit.content}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    content: e.target.value,
                  });
                }}
              />
            </Form.Item>

            <Form.Item
              label="Thể loại"
              name="categorys"
              rules={[
                {
                  required: true,
                  message: "Mời chọn thể loại blog",
                },
              ]}
            >
              <Select
                value={dataEdit.categorys}
                onChange={(value) => {
                  setDataEdit({
                    ...dataEdit,
                    categorys: value,
                  });
                }}
                options={[
                  {
                    value: "Industry news",
                    label: "Industry news",
                  },
                  {
                    value: "Event",
                    label: "Event",
                  },
                  {
                    value: "J-Magazine",
                    label: "J-Magazine",
                  },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Ảnh"
              name="file"
              rules={[
                {
                  required: true,
                  message: "Vui lòng upload hình mới",
                },
              ]}
            >
              <Input
                type="file"
                name="file"
                value={dataEdit.picture}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    picture: e.target.files[0],
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
                  "bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80"
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
