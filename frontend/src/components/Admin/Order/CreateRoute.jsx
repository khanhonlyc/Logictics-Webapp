import React, { useState, useContext } from "react";
import { MainContext } from "../../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../../utils/constant";
import { Form, Input, DatePicker, Button, InputNumber } from "antd";

const { Item } = Form;
function CreateRoute({ isVisible, onClose, disable, data }) {
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const { accessToken } = useContext(MainContext);
  const [dataRoute, setDataRoute] = useState([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [isOkButton, setIsOkButton] = useState(false);
  const acceptCreateRoute = async () => {
    setLoading(true);
    try {
      const result = await axios({
        url: `${END_POINT}/admin/order/${data.orderId}/route`,
        method: "put",
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(result);
      if (result.status === 200) {
        alert("Tao duong di thanh cong");
        setDataRoute(result.data.data);
        setLoading(false);
        setIsButtonVisible(false);
        setIsOkButton(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Tạo đường đi cho đơn hàng {data.orderId}
              </span>
              <Button
                size="large"
                disabled={disable}
                className={
                  !disable &&
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
            >
              <Item label=""></Item>
              <Item label="">
                <div>
                  {dataRoute.map((data) => (
                    <li> {data.province}</li>
                  ))}
                </div>
              </Item>

              <div className="flex justify-center mt-2 text-sm gap-x-6">
                {isOkButton && (
                  <Button
                    size="large"
                    disabled={disable}
                    className={
                      !disable &&
                      "hover:bg-red-500 hover:border-red-700 hover:text-white rounded-lg"
                    }
                    onClick={onClose}
                  >
                    OK
                  </Button>
                )}

                {isButtonVisible && (
                  <Button
                    type="primary"
                    size="large"
                    loading={loading}
                    onClick={acceptCreateRoute}
                    className="rounded-lg "
                  >
                    Xác nhận
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateRoute;
