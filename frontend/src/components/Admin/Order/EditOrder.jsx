import { useState } from "react";
import { Form, Input, DatePicker, Button, InputNumber } from "antd";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";
import { useContext } from "react";
import axios from "axios";
const { Item } = Form;
function EditOrder({ onClose, refetchData, data }) {
  console.log(data);

  const [dataEdit, setDataEdit] = useState(data);
  const [valueStatus, setValueStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);

  const acceptEditOrder = async () => {
    setLoading(true);
    const item = {
      status: valueStatus,
    };
    setLoading(true);
    // setIsDisable(true);
    try {
      const res = await axios.put(
        `${END_POINT}/admin/order/${data.orderId}/status`,
        item,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      if (res.status === 200) {
        alert("cap nhat thanh cong");
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
      <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
        <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
          <div className="flex justify-between items-center gap-y-3">
            <span className="text-xl uppercase font-bold h-fit">Sửa Order</span>
          </div>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            autoComplete="off"
          >
            {/* <Item label="Người nhận">
                                <Input defaultValue={data.receiver} />
                            </Item>
                            <Item label="Xuất phát">
                                <Input defaultValue={data.origin} />
                            </Item>
                            <Item label="Điểm đến">
                                <Input defaultValue={data.destination} />
                            </Item> */}
            <Form.Item label="Tình trạng">
              <select
                defaultValue={dataEdit.status}
                style={{ padding: "5px" }}
                onChange={(e) => {
                  setValueStatus(e.target.value);
                }}
              >
                <option value="waiting">waiting</option>
                <option value="accepted">accepted</option>
                <option value="probably proceed">probably proceed</option>
                <option value="processing">processing</option>
                <option value="completed">completed</option>
                <option value="refused">refused</option>
                <option value="cancel">cancel</option>
              </select>
            </Form.Item>
            {/* <Item label="Thiết bị">
                                <Input disabled={true} defaultValue={data.service} />
                            </Item>
                            <Item label="Tổng giá tiền">
                                <InputNumber defaultValue={data.total_price} />
                            </Item> */}
            {/* <Item label="Sản phẩm">
                                <Button>Tách</Button>
                                <div>{data.product.map(e => (
                                    <li>Lô hàng {e.bill}</li>
                                ))}</div>
                            </Item> */}
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
                type="primary"
                size="large"
                loading={loading}
                className="rounded-lg"
                htmlType="submit"
                onClick={acceptEditOrder}
              >
                Xác nhận
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditOrder;
