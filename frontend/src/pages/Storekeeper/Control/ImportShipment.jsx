import { useState, useEffect, useContext } from "react";
import { Form, Input, Button } from "antd";
import { MainContext } from "../../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
const { Item } = Form;

function ImportShipment({ onClose, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  console.log(formData)
  const acceptImport = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `${END_POINT}/warehouse/add-inventory/62e9d8b0c5e7cf9384ba18a4`,
        formData,
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      setLoading(false);
      refetchData()
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
      <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
        <div className="flex justify-between items-center gap-y-3">
          <span className="text-xl uppercase font-bold h-fit">
            Thêm hàng vào kho
          </span>
          <Button
            size="large"
            //   disabled={isDisable}
            className="hover:bg-red-500 hover:border-red-700 hover:text-white border-none"
            onClick={onClose}
          >
            x
          </Button>
        </div>
        <Form
          autoComplete="off"
          onFinish={acceptImport}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
        >
          <Item
            label="Mã hàng hóa"
            name="productShipmentId"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mã hàng hóa",
              },
            ]}
          >
            <Input
              value={formData.productShipmentId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  productShipmentId: e.target.value,
                })
              }
            />
          </Item>
          <Item
            label="Doanh thu"
            name="turnover"
            rules={[
              {
                required: true,
                message: "Vui lòng không bỏ trống",
              },
              {
                pattern: new RegExp(/^[0-9]+$/),
                message: "Vui lòng chỉ nhập số",
              },
            ]}
          >
            <Input
              value={formData.turnover}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  turnover: +e.target.value,
                })
              }
            />
          </Item>
          <div className="flex justify-end mt-2 text-sm gap-x-6">
            <Button
              size="large"
              className="hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
              onClick={onClose}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="rounded-lg"
            >
              Xác nhận
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ImportShipment;
