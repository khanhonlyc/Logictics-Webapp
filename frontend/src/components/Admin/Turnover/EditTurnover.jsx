import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import { END_POINT } from "../../../utils/constant";

const { Item } = Form;
const { Option } = Select;

const paymentMethods = ["CASH", "MOMO_WALLET", "ZALO_PAY", "PAYPAL", "BANKING"];
const typeOfTurnovers = [
  "complete_order",
  "fuel",
  "repair",
  "maintenance",
  "incurred",
];
const bills = [];
const orders = [];

function EditTurnover({ onClose, data, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const acceptEditTurnover = async () => {
    setLoading(true);
    setIsDisable(true);
    try {
      await axios.put(`${END_POINT}/turnover/${dataEdit._id}`, dataEdit, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      setLoading(false);
      setIsDisable(false);
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
            <span className="text-xl uppercase font-bold h-fit">
              Chỉnh sửa doanh thu
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
            autoComplete="off"
            initialValues={dataEdit}
            onFinish={acceptEditTurnover}
          >
            <Item
              label="Tổng tiền"
              name="total"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập Tổng tiền",
                },
              ]}
            >
              <Input
                type="number"
                value={dataEdit.total}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    total: e.target.value,
                  })
                }
              />
            </Item>

            <Item
              label="Phương thức thanh toán"
              name="payment_method"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                value={dataEdit.payment_method}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    payment_method: e.target.value,
                  })
                }
                className="capitalize"
              >
                {paymentMethods.map((paymentMethod) => (
                  <Option
                    value={paymentMethod}
                    key={paymentMethod}
                    className="capitalize"
                  >
                    {paymentMethod.replaceAll("_", " ").toLowerCase()}
                  </Option>
                ))}
              </Select>
            </Item>

            <Item
              label="Đã	trả"
              name="paid"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiền đã trả",
                },
              ]}
            >
              <Input
                type="number"
                value={dataEdit.paid}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    paid: e.target.value,
                  })
                }
              />
            </Item>

            <Item
              label="Kiểu doanh thu"
              name="type_of_turnover"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn kiểu doanh thu",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    type_of_turnover: e.target.value,
                  })
                }
                className="capitalize"
              >
                {typeOfTurnovers.map((typeOfTurnover) => (
                  <Option
                    value={typeOfTurnover}
                    key={typeOfTurnover}
                    className="capitalize"
                  >
                    {typeOfTurnover.replaceAll("_", " ").toLowerCase()}
                  </Option>
                ))}
              </Select>
            </Item>

            <Item
              label="Trả lại"
              name="refund"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                type="number"
                value={dataEdit.refund}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    refund: e.target.value,
                  })
                }
              />
            </Item>

            <Item
              label="Mã hóa đơn"
              name="bill"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    bill: e.target.value,
                  })
                }
              >
                {bills.map((bill) => (
                  <Option value={bill} key={bill}>
                    {bill}
                  </Option>
                ))}
              </Select>
            </Item>

            <Item
              label="Mã vận đơn"
              name="order"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    order: e.target.value,
                  })
                }
              >
                {orders.map((order) => (
                  <Option value={order} key={order}>
                    {order}
                  </Option>
                ))}
              </Select>
            </Item>

            <Item
              label="Thông điệp"
              name="message"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input
                type="text"
                value={dataEdit.message}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    message: e.target.value,
                  })
                }
              />
            </Item>

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
                onClick={acceptEditTurnover}
                className="rounded-lg"
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

export default EditTurnover;
