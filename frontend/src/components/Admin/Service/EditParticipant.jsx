import { Button, Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import React, { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
export default function EditParticipant({ onClose, data, refetchData }) {
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);

  const acceptEditParticipant = async () => {
    setLoading(true);
    let formEditData = new FormData();

    formEditData.append("name", dataEdit.name);
    formEditData.append("description", dataEdit.description);
    formEditData.append("banner", dataEdit.banner);

    try {
      const res = await axios({
        url: `${END_POINT}/admin/participant/${dataEdit._id}`,
        method: "put",
        data: formEditData,
        headers: { authorization: `Bearer ${accessToken}` },
      });
      if (res.status === 200) {
        alert("đã them thành công ");
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
            onFinish={acceptEditParticipant}
            initialValues={dataEdit}
            autoComplete="off"
          >
            <h1 className="uppercase"> Vui lòng nhập chỉnh sửa participant </h1>

            <Form.Item label="Name" name="name">
              <Input
                value={dataEdit.name}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    name: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input
                value={dataEdit.description}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    description: e.target.files[0],
                  });
                }}
              />
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    banner: e.target.files[0],
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
                className="rounded-lg"
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
                  "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
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
