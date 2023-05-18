import { Button, DatePicker, Form, Input, Select } from "antd";
import axios from "axios";
import { useContext, useState } from "react";
import { MainContext } from "../../../context/MainContext";
import { END_POINT } from "../../../utils/constant";

const car_fleet = ["63181f770e47f63f5761a35d"];

const { Item } = Form;
const { Option } = Select;
function EditCar({ onClose, data, refetchData }) {
  const { accessToken } = useContext(MainContext);
  const [dataEdit, setDataEdit] = useState(data);
  const [loading, setLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(false);

  const carType = (value) => {
    setDataEdit({
      ...dataEdit,
      car_type: value,
    });
  };
  const acceptEditCar = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.put(`${END_POINT}/admin/car/${dataEdit._id}`, dataEdit, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
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
            <span className="text-xl uppercase font-bold h-fit">
              Chỉnh sửa Thông tin xe
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
            onFinish={acceptEditCar}
          >
            <Item
              label="Biển số xe"
              name="plate"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập biển số xe",
                },
              ]}
            >
              <Input
                value={dataEdit.plate}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    plate: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Loại xe"
              name="car_type"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn loại xe",
                },
              ]}
            >
              <Select allowClear showSearch onChange={carType}>
                <Option value="8_ton">8_ton</Option>
                <Option value="20_ton">20_ton</Option>
              </Select>
            </Item>
            <Item
              label="Dung tích"
              name="volumn"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập dung tích",
                },
              ]}
            >
              <Input
                type="number"
                value={dataEdit.volumn}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    volumn: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Trọng tải"
              name="tonnage"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trọng tải",
                },
              ]}
            >
              <Input
                type="number"
                value={dataEdit.tonnage}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    tonnage: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Đội xe"
              name="car_fleet"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn đội xe",
                },
              ]}
            >
              <Select
                allowClear
                showSearch
                onChange={(_, option) =>
                  setDataEdit({ ...dataEdit, car_fleet: option?.value })
                }
              >
                {car_fleet.map((car_fleet) => (
                  <Option value={car_fleet} key={car_fleet}>
                    {car_fleet}
                  </Option>
                ))}
              </Select>
            </Item>
            <Item
              label="Mã bảo hiểm"
              name="seri"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã seri",
                },
              ]}
            >
              <Input
                defaultValue={dataEdit.insurance.seri}
                onChange={(e) =>
                  setDataEdit({
                    ...dataEdit,
                    seri: e.target.value,
                  })
                }
              />
            </Item>
            <Item
              label="Hết hạn bảo hiểm"
              name="expired"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thời gian hết hạn",
                },
              ]}
            >
              <DatePicker
                placeholder={dataEdit.insurance.expired?.slice(0, 10)}
                onChange={(e, dateString) =>
                  setDataEdit({
                    ...dataEdit,
                    expired: dateString,
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
                onClick={acceptEditCar}
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

export default EditCar;
