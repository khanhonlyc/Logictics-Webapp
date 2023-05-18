import { useState, useContext } from "react";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
import { Form, Input, DatePicker, Button, InputNumber, Select } from "antd";

const { Item } = Form;
const { Option } = Select;
function AddDistance(props /* , isVisible, onClose, disable, onOk */) {
  const [dataDistance, setDataDistance] = useState({
    fromProvince: "",
    toProvince: "",
    zonecode: "",
    dist: 0,
  });
  console.log(dataDistance);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onClick(dataDistance);
  };
  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Thêm Khoảng cách cho dịch vụ
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
            >
              <Item label="Xuất phát">
                <Input
                  onChange={(e) => {
                    setDataDistance({
                      ...dataDistance,
                      fromProvince: e.target.value,
                    });
                  }}
                />
              </Item>
              <Item label="Điểm đến">
                <Input
                  onChange={(e) => {
                    setDataDistance({
                      ...dataDistance,
                      toProvince: e.target.value,
                    });
                  }}
                />
              </Item>
              <Item label="ZoneCode">
                <Select
                  onChange={(_, option) => {
                    setDataDistance({
                      ...dataDistance,
                      zonecode: option?.value,
                    });
                  }}
                >
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                  <Option value="C">C</Option>
                  <Option value="F">F</Option>
                </Select>
                {/* <Input
                  onChange={(e) => {
                    setDataDistance({
                      ...dataDistance,
                      zonecode: e.target.value,
                    });
                  }}
                /> */}
              </Item>
              <Item label="Dist">
                <Input
                  onChange={(e) => {
                    setDataDistance({
                      ...dataDistance,
                      dist: +e.target.value,
                    });
                  }}
                />
              </Item>
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
                  onClick={handleSubmit}
                  // onSubmit={handleSubmit}
                  className="rounded-lg"
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

export default AddDistance;
