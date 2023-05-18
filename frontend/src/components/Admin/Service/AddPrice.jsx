import { useState, useContext } from "react";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
import { Form, Input, DatePicker, Button, InputNumber, Select } from "antd";
import { data } from "autoprefixer";

const { Item } = Form;
const { Option } = Select;
function AddPrice(props /* , isVisible, onClose, disable, onOk */) {
  const [dataPrice, setDataPrice] = useState({
    kg: [{}],
    ton: [{}],
    m3: [{}],
  });
  const [dataKG, setDataKG] = useState({
    next: true,
    sidestep: 0,
    prices: [],
  });
  const [dataTon, setDataTon] = useState({
    next: true,
    sidestep: 0,
    prices: [],
  });
  const [dataM3, setDataM3] = useState({
    next: true,
    sidestep: 0,
    prices: [],
  });
  const handleSubmit = (e) => {
    props.onClick(dataPrice);
  };
  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Tạo bảng giá mới
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
              name="complex-form"
              //   onFinish={acceptAddNewOrder}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Form.Item label="TON" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="nextTon"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "25%" }}
                >
                  <Select
                    placeholder="next"
                    onChange={(_, option) => {
                      setDataKG({
                        ...dataKG,
                        next: option?.value,
                      });
                    }}
                  >
                    <Option value={true}>True</Option>
                    <Option value={false}>False</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="sidestepTon"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="Sidestep"
                    onChange={(e) => {
                      setDataKG({
                        ...dataKG,
                        sidestep: +e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="priceTon"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="Price"
                    onChange={(e) => {
                      const priceSplit = e.target.value.split(",");
                      const arrOfNum = priceSplit.map((price) => {
                        return Number(price);
                      });
                      setDataKG({
                        ...dataKG,
                        prices: arrOfNum,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item label="KG" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="nextKG"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "25%" }}
                >
                  <Select
                    placeholder="next"
                    onChange={(_, option) => {
                      setDataTon({
                        ...dataTon,
                        next: option?.value,
                      });
                    }}
                  >
                    <Option value={true}>True</Option>
                    <Option value={false}>False</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="sidestepKG"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="sidestep"
                    onChange={(e) => {
                      setDataTon({
                        ...dataTon,
                        sidestep: +e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="priceKG"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="price"
                    onChange={(e) => {
                      const priceSplit = e.target.value.split(",");
                      const arrOfNum = priceSplit.map((price) => {
                        return Number(price);
                      });
                      setDataTon({
                        ...dataTon,
                        prices: arrOfNum,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item label="M3" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="nextM3"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "25%" }}
                >
                  <Select
                    placeholder="next"
                    onChange={(_, option) => {
                      setDataM3({
                        ...dataM3,
                        next: option?.value,
                      });
                    }}
                  >
                    <Option value={true}>True</Option>
                    <Option value={false}>False</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="sidestepM3"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="sidestep"
                    onChange={(e) => {
                      setDataM3({
                        ...dataM3,
                        sidestep: +e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="priceM3"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="price"
                    onChange={(e) => {
                      const priceSplit = e.target.value.split(",");
                      const arrOfNum = priceSplit.map((price) => {
                        return Number(price);
                      });
                      setDataM3({
                        ...dataM3,
                        prices: arrOfNum,
                      });
                    }}
                  />
                </Form.Item>
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
                  onClick={() => {
                    setDataPrice({
                      ...dataPrice,
                      kg: [dataKG],
                      ton: [dataTon],
                      m3: [dataM3],
                    });
                    handleSubmit();
                  }}
                  //   // onSubmit={handleSubmit}
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

export default AddPrice;
