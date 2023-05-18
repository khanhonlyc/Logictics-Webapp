import { useState, useContext } from "react";
import { END_POINT } from "../../../utils/constant";
import axios from "axios";
import { MainContext } from "../../../context/MainContext";
import { Form, Input, DatePicker, Button, InputNumber } from "antd";

const { Item } = Form;
function SplitProduct(props /* , isVisible, onClose, disable, onOk */) {
  const [dataSplitProduct, setDataSplitProduct] = useState({
    quantity: [],
  });
  console.log(dataSplitProduct);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onClick(dataSplitProduct);
  };
  return (
    <>
      {props.isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Tách sản phẩm
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
              <Item label="số lượng từng lô hàng">
                <Input
                  onChange={(e) => {
                    setDataSplitProduct({
                      ...dataSplitProduct,
                      quantity: e.target.value,
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

export default SplitProduct;
