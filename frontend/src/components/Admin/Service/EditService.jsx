import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import React from "react";
import { END_POINT } from "../../../utils/constant";
import { useState } from "react";
import { useContext } from "react";
import { MainContext } from "../../../context/MainContext";

export default function AdminEditService({ onClose, data, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  console.log(dataEdit);
  const acceptEditDepartment = async () => {
    setLoading(true);
    try {
      await axios.put(`${END_POINT}/admin/service/${data._id}`, dataEdit, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      setIsDisable(false);
      refetchData();
      onClose();
      alert("chỉnh sửa thành công");
    } catch (error) {
      setIsDisable(false);
      alert(error);
      setLoading(false);
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const initialValues = {
    name: dataEdit.name,
    detail: dataEdit.sub_detail,
    target: dataEdit.target,
    tip: dataEdit.tip,
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
            initialValues={initialValues}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui Lòng nhập chỉnh sửa commit </h1>

            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  message: "Mời nhập chi tiết ",
                },
              ]}
            >
              <Input
                value={dataEdit.name}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    name: e.target.value,
                  })
                }
              />
            </Form.Item>

            <Form.Item
              label="Detail"
              name="detail"
              rules={[
                {
                  message: "Mời nhập chi tiết ",
                },
              ]}
            >
              <Input
                value={dataEdit.sub_detail}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    sub_detail: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Target"
              name="target"
              rules={[
                {
                  message: "Mời nhập chi tiết ",
                },
              ]}
            >
              <Input
                value={dataEdit.target}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    target: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Tip"
              name="tip"
              rules={[
                {
                  message: "Mời nhập chi tiết ",
                },
              ]}
            >
              <Input
                value={dataEdit.tip}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    tip: e.target.value,
                  })
                }
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
                htmlType="submit"
                loading={loading}
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
