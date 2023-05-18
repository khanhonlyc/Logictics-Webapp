import { useState, useContext, useEffect } from "react";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
import { Form, Input, DatePicker, Button, InputNumber, Select } from "antd";

const { Option } = Select;
function AddParticipant(props /* , isVisible, onClose, disable, onOk */) {
  const [dataParticipant, setDataParticipant] = useState({
    name: "",
    description: "",
    banner: "",
  });
  const handleSubmit = (e) => {
    const dataPar = new FormData();

    dataPar.append("name", dataParticipant.name);
    dataPar.append("description", dataParticipant.description);
    dataPar.append("banner", dataParticipant.banner);
    props.onClick(dataPar);
  };

  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Thêm các bên tham gia cho dịch vụ
              </span>
              <Button
                size="large"
                disabled={props.disable}
                className={
                  !props.disable &&
                  "hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
                }
                onClick={props.onClose}
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
              onFinish={handleSubmit}
            >
              <Form.Item
                label="Tên"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập chi tiết",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setDataParticipant({
                      ...dataParticipant,
                      name: e.target.value,
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
                    message: "Mời nhập chi tiết",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setDataParticipant({
                      ...dataParticipant,
                      description: e.target.value,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Hình ảnh"
                name="banner"
                rules={[
                  {
                    required: true,
                    message: "Mời nhập chi tiết",
                  },
                ]}
              >
                <input
                  type="file"
                  name="file"
                  onChange={(e) => {
                    setDataParticipant({
                      ...dataParticipant,
                      banner: e.target.files[0],
                    });
                  }}
                />
              </Form.Item>
              <div className="flex justify-end mt-2 text-sm gap-x-6">
                <Button
                  size="large"
                  disabled={props.disable}
                  className={
                    !props.disable &&
                    "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
                  }
                  onClick={props.onClose}
                >
                  Hủy
                </Button>
                <Button
                  type="primary"
                  size="large"
                  className="rounded-lg"
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default AddParticipant;
