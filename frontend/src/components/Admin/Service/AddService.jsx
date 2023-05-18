import { Button, Form, Input } from "antd";
import axios from "axios";

import { END_POINT } from "../../../utils/constant";
import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";

export default function AdminAddService({ onClose, refetchData }) {
  const [data, setData] = useState({
    name: "",
    sub_detail: "",
    target: "",
    tip: "",
  });

  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);
  const acceptAddNewDepartment = async () => {
    setLoading(true);
    try {
      await axios.post(`${END_POINT}/admin/service`, data, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      setIsDisable(false);
      refetchData();
      onClose();
      alert("thêm mới thành công");
    } catch (error) {
      setIsDisable(false);
      alert(error);
      setLoading(false);
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
            initialValues={
              {
                // remember: true,
              }
            }
            onFinish={acceptAddNewDepartment}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập dịch vụ mới </h1>
            <Form.Item
              label="Tên dịch vụ"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Mời nhập tiêu đề",
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
              label="Chi tiết"
              name="sub_detail"
              rules={[
                {
                  required: true,
                  message: "Mời nhập chi tiết",
                },
              ]}
            >
              <Input
                value={data.sub_detail}
                onChange={(e) => {
                  setData({
                    ...data,
                    sub_detail: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Target"
              name="target"
              rules={[
                {
                  required: true,
                  message: "Mời nhập chi tiết",
                },
              ]}
            >
              <Input
                value={data.target}
                onChange={(e) => {
                  setData({
                    ...data,
                    target: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item
              label="Tip"
              name="tip"
              rules={[
                {
                  required: false,
                  message: "Mời nhập chi tiết",
                },
              ]}
            >
              <Input
                value={data.tip}
                onChange={(e) => {
                  setData({
                    ...data,
                    tip: e.target.value,
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
                Xác nhận
              </Button>
              <Button
                disabled={isDisable}
                onClick={onClose}
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
