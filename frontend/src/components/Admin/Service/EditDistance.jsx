import { Button, Form, Input, Select } from "antd";

import axios from "axios";
import React from "react";
import { END_POINT } from "../../../utils/constant";
import { useState } from "react";
import { useContext } from "react";
import { MainContext } from "../../../context/MainContext";

const { Option } = Select;
export default function AdminEditDistance({ onClose, data }) {
  const { accessToken } = useContext(MainContext);
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  console.log("data để edit", dataEdit);

  const acceptEditDistance = async () => {
    setLoading(true);
    try {
      await axios.put(`${END_POINT}/admin/distance/${dataEdit._id}`, dataEdit, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      setIsDisable(false);
      onClose();
      alert("chỉnh sửa thành công");
    } catch (error) {
      if (error.request.status === 400) {
        alert("không có chỉnh sữa");
      } else alert(error.code);
      setIsDisable(false);
      setLoading(false);
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const initialValues = {
    fromProvince: dataEdit.fromProvince,
    toProvince: dataEdit.toProvince,
    zonecode: dataEdit.zonecode,
    dist: dataEdit.distance,
    distance: dataEdit.distance,
  };
  return (
    <>
      (
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">
              Thêm Khoảng cách cho dịch vụ
            </span>
            <Button
              size="large"
              disabled={isDisable}
              className={
                !isDisable &&
                "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
              }
              onClick={onClose}
            >
              x
            </Button>
          </div>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            onFinish={acceptEditDistance}
            initialValues={initialValues}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Xuất phát" name="fromProvince">
              <Input
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    fromProvince: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="Điểm đến" name="toProvince">
              <Input
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    toProvince: e.target.value,
                  });
                }}
              />
            </Form.Item>
            <Form.Item label="ZoneCode" name="zonecode">
              <Select
                onChange={(_, option) => {
                  setDataEdit({
                    ...dataEdit,
                    zonecode: option?.value,
                  });
                }}
              >
                <Option value="A">A</Option>
                <Option value="B">B</Option>
                <Option value="C">C</Option>
                <Option value="F">F</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Distance" name="dist">
              <Input
                type="number"
                value={dataEdit.distance}
                onChange={(e) => {
                  setDataEdit({
                    ...dataEdit,
                    dist: +e.target.value || 3000,
                    distance: +e.target.value || 3000,
                  });
                }}
              />
            </Form.Item>
            <div className="flex justify-end mt-2 text-sm gap-x-6">
              <Button
                size="large"
                disabled={isDisable}
                className={
                  !isDisable &&
                  "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
                }
                onClick={onClose}
              >
                Hủy
              </Button>
              <Button
                loading={loading}
                type="primary"
                size="large"
                htmlType="submit"
                className="rounded-lg"
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        </div>
      </div>
      )
    </>
  );
}
