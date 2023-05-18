import { useState, useContext } from "react";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
import { Form, Input, DatePicker, Button, InputNumber, Select } from "antd";

const { Item } = Form;
const { Option } = Select;
function AddPriceList(props /* , isVisible, onClose, disable, onOk */) {
  const [dataPriceList, setDataPriceList] = useState({
    province: "",
    file: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    const dataPL = new FormData();
    dataPL.append("province", dataPriceList.province);
    dataPL.append("file", dataPriceList.file);
    props.onClick(dataPL);
  };
  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Thêm PriceList cho dịch vụ
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
              <Item label="Tên">
                <Input
                  onChange={(e) => {
                    setDataPriceList({
                      ...dataPriceList,
                      province: e.target.value,
                    });
                  }}
                />
              </Item>

              <Item label="Hình ảnh">
                <input
                  type="file"
                  name="file"
                  onChange={(e) => {
                    setDataPriceList({
                      ...dataPriceList,
                      file: e.target.files[0],
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

export default AddPriceList;
