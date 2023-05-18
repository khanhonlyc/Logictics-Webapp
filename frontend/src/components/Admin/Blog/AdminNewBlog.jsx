import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useState, useContext } from "react";
import { MainContext } from "../../../context/MainContext";
import { END_POINT } from "../../../utils/constant";

function AdminNewBlog({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [data, setData] = useState({
    title: "",
    description: "",
    content: "",
    categorys: "",
    picture: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const acceptAddNewBlog = async () => {
    setLoading(true);
    // setIsDisable(true);
    const submitFormData = new FormData();
    submitFormData.append("title", data.title);
    submitFormData.append("description", data.description);
    submitFormData.append("content", data.content);
    submitFormData.append("categorys", data.categorys);
    submitFormData.append("picture", data.picture);

    try {
      // make axios post request
      const response = await axios({
        method: "post",
        url: `${END_POINT}/admin/blog`,
        data: submitFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        alert("Đã thêm thành công ");
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
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center ">
        <div className="relative w-[700px] flex flex-col bg-white bg-opacity-100 p-6 rounded-xl gap-y-3 animate-modal_in">
          <span className="text-xl uppercase font-bold h-fit">
            Thêm blog mới
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
            onFinish={acceptAddNewBlog}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập các trường Blog mới </h1>
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
                value={data.title}
                onChange={(e) => {
                  setData({
                    ...data,
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
                value={data.description}
                onChange={(e) => {
                  setData({
                    ...data,
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
                value={data.content}
                onChange={(e) => {
                  setData({
                    ...data,
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
                value={data.categorys}
                onChange={(value) => {
                  setData({
                    ...data,
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
                value={data.picture}
                onChange={(e) => {
                  setData({
                    ...data,
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
                loading={loading}
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
                // className={
                //   !isDisable &&
                //   " bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg hover:opacity-80"
                // }
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

export default AdminNewBlog;
