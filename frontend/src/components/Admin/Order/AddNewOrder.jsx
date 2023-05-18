import { useState, useContext, useEffect } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  InputNumber,
  Select,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { END_POINT } from "../../../utils/constant";
import { MainContext } from "../../../context/MainContext";
import axios from "axios";
const { Item } = Form;
const { Option } = Select;
function AddNewOrder({ isVisible, refetchData, onClose, disable }) {
  const { accessToken } = useContext(MainContext);
  const [isDisable, setIsDisable] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [customerIdList, setCustomerIdList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    service: "",
    sender: {
      name: "",
      phone: "",
    },
    receiver: {
      name: "",
      phone: "",
    },
    pick_at: "",
    origin: {
      loading: "",
      address: "",
    },
    destination: {
      loading: "",
      address: "",
    },
    products: [
      {
        name: "",
        quantity: 0,
        unit: "",
        note: "",
      },
    ],
  });
  const [datarReceiver, setDataReceiver] = useState({
    name: "",
    phone: "",
  });
  const [dataSender, setDataSender] = useState({
    name: "",
    phone: "",
  });
  const [dataOrigin, setDataOrigin] = useState({
    loading: "",
    address: "",
  });
  const [dataDestination, setDataDestination] = useState({
    unloading: "",
    address: "",
  });
  const [dataProduct, setDataProduct] = useState([
    {
      name: "",
      quantity: 0,
      unit: "",
      note: "",
    },
  ]);
  const [dataCustomerId, setCustomerId] = useState("");
  const getServiceList = async () => {
    try {
      const res = await axios.get(`${END_POINT}/service`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(res);
      setServiceList(res.data.data.service);
      console.log(serviceList);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomerList = async () => {
    try {
      const res = await axios.get(`${END_POINT}/customer`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(res);
      setCustomerIdList(res.data.data);
      console.log(serviceList);
    } catch (error) {
      console.log(error);
    }
  };

  const getWarehouse = async () => {
    try {
      const res = await axios.get(`${END_POINT}/warehouse`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      console.log(res);
      setWarehouseList(res.data.data.warehouses);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServiceList();
    getWarehouse();
    getCustomerList();
  }, []);
  const handleDataProduct = () => {
    const productNameArray = dataProduct.name.split(",");
    const productQuantityArray = dataProduct.quantity.split(",");
    const productUnitArray = dataProduct.unit.split(",");
    const productNoteArray = dataProduct.note.split(",");
    console.log(productNameArray);
    console.log(productQuantityArray);
    console.log(dataProduct);
    const arr = [];
    var obj = {};
    // const result = productNameArray.map((pro) => ({
    //   ...obj,
    //   name: pro,
    // }));
    // const result1 = productQuantityArray.map((pro) => ({
    //   ...obj,
    //   quantity: pro,
    // }));
    // const result2 = productNoteArray.map((pro) => ({
    //   ...obj,
    //   note: pro,
    // }));
    // const result3 = productUnitArray.map((pro) => ({
    //   ...obj,
    //   unit: pro,
    // }));
    // console.log(result);
    // console.log(result1);
    // console.log(result2);
    // console.log(result3);
    for (var a = 0; a < productNameArray.length; a++) {
      console.log(productNameArray[i]);
      obj = {
        ...obj,
        name: productNameArray[a],
      };
    }
    console.log(arr);
    for (var i = 0; i < productQuantityArray.length; i++) {
      obj = {
        ...obj,
        quantity: productQuantityArray[i],
      };
    }
    for (var j = 0; j < productUnitArray.length; j++) {
      obj = {
        ...obj,
        unit: productUnitArray[j],
      };
    }
    for (var z = 0; z < productNoteArray.length; z++) {
      obj = {
        ...obj,
        note: productNoteArray[z],
      };
      arr.push(obj);
    }

    console.log(arr);
    return arr;
  };
  const acceptAddNewOrder = async () => {
    setLoading(true);
    // setIsDisable(true);
    try {
      await axios.post(`${END_POINT}/admin/order/${dataCustomerId}`, data, {
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
      {isVisible && (
        <div className="fixed inset-0  bg-slate-600 bg-opacity-50 z-20 flex justify-center items-center">
          <div className="relative w-[700px] flex flex-col bg-white p-6 gap-y-3 animate-modal_in mx-4 rounded-xl overflow-auto">
            <div className="flex justify-between items-center gap-y-3">
              <span className="text-xl uppercase font-bold h-fit">
                Thêm Order
              </span>
              <Button
                size="large"
                disabled={isDisable}
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
              name="complex-form"
              onFinish={acceptAddNewOrder}
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 18 }}
            >
              <Form.Item label="Mã khách hàng">
                <Space>
                  <Form.Item
                    name="customerID"
                    noStyle
                    rules={[
                      { required: true, message: "customerId is required" },
                    ]}
                  >
                    <Select
                      allowClear
                      placeholder="chọn khách hàng"
                      style={{ width: 300 }}
                      showSearch
                      onChange={(_, option) => setCustomerId(option?.value)}
                    >
                      {customerIdList.map((customerId) => (
                        <Option value={customerId._id} key={customerId._id}>
                          {customerId.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item label="Dịch vụ">
                <Space>
                  <Form.Item
                    name="service"
                    noStyle
                    rules={[{ required: true, message: "service is required" }]}
                  >
                    <Select
                      allowClear
                      placeholder="Chọn dịch vụ"
                      style={{ width: 300 }}
                      showSearch
                      onChange={(_, option) =>
                        setData({ ...data, service: option?.value })
                      }
                    >
                      {serviceList.map((service) => (
                        <Option value={service.name} key={service._id}>
                          {service.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item label="Xuất phát">
                <Input.Group compact>
                  <Form.Item
                    name={["loading", "addressOrigin"]}
                    noStyle
                    rules={[{ required: true, message: "loading is required" }]}
                  >
                    <Select
                      placeholder="Select loading"
                      onChange={(_, option) => {
                        setDataOrigin({
                          ...dataOrigin,
                          loading: option?.value,
                        });
                        setData({
                          ...data,
                          origin: dataOrigin,
                        });
                      }}
                    >
                      <Option value="on site">On site</Option>
                      <Option value="ship">Ship</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["unloading", "address"]}
                    noStyle
                    rules={[{ required: true, message: "Street is required" }]}
                  >
                    <Select
                      allowClear
                      placeholder="Chọn điểm xuất phát"
                      showSearch
                      style={{ width: 250 }}
                      onChange={(_, option) => {
                        setDataOrigin({
                          ...dataOrigin,
                          address: option?.value,
                        });
                      }}
                    >
                      {warehouseList.map((warehouse) => (
                        <Option value={warehouse._id} key={warehouse._id}>
                          {warehouse.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              <Form.Item label="Điểm đến">
                <Input.Group compact>
                  <Form.Item
                    name={["unloading", "addressDestination"]}
                    noStyle
                    rules={[
                      { required: true, message: "unloading is required" },
                    ]}
                  >
                    <Select
                      placeholder="Select unloading"
                      onChange={(_, option) => {
                        setDataDestination({
                          ...dataDestination,
                          unloading: option?.value,
                        });
                      }}
                    >
                      <Option value="on site">On site</Option>
                      <Option value="ship">Ship</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={["unloading", "addressDes"]}
                    noStyle
                    rules={[{ required: true, message: "address is required" }]}
                  >
                    <Select
                      placeholder="Chọn điểm đến"
                      allowClear
                      style={{ width: 250 }}
                      showSearch
                      onChange={(_, option) => {
                        setDataDestination({
                          ...dataDestination,
                          address: option?.value,
                        });
                      }}
                    >
                      {warehouseList.map((warehouse) => (
                        <Option value={warehouse._id} key={warehouse._id}>
                          {warehouse.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Input.Group>
              </Form.Item>
              <Form.Item label="Người gửi" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="sender"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input
                    onChange={(e) => {
                      setDataSender({
                        ...dataSender,
                        name: e.target.value,
                      });
                    }}
                    placeholder="Nhập tên người gửi"
                  />
                </Form.Item>
                <Form.Item
                  name="phoneSender"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    onChange={(e) => {
                      setDataSender({
                        ...dataSender,
                        phone: e.target.value,
                      });
                    }}
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Người nhận" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="receiver"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input
                    placeholder="Nhập tên người nhận"
                    onChange={(e) => {
                      setDataReceiver({
                        ...datarReceiver,
                        name: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="phoneReceiver"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="Nhập số điện thoại"
                    onChange={(e) => {
                      setDataReceiver({
                        ...datarReceiver,
                        phone: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>

              <Form.Item label="Pick_at">
                <Space>
                  <Form.Item
                    name="pick_at"
                    noStyle
                    rules={[{ required: true, message: "Pick_at is required" }]}
                  >
                    <Input
                      style={{ width: 300 }}
                      onChange={(e) => {
                        setData({
                          ...data,
                          pick_at: e.target.value,
                        });
                      }}
                    />
                  </Form.Item>
                </Space>
              </Form.Item>

              <Form.Item label="Sản phẩm" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="nameProduct"
                  rules={[{ required: true }]}
                  style={{ display: "inline-block", width: "25%" }}
                >
                  <Input
                    placeholder="Nhập tên sản phẩm"
                    onChange={(e) => {
                      setDataProduct({
                        ...dataProduct,
                        name: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="quantity"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="Số lượng"
                    onChange={(e) => {
                      setDataProduct({
                        ...dataProduct,
                        quantity: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="unit"
                  rules={[{ required: true }]}
                  style={{
                    display: "inline-block",
                    width: "25%",
                    margin: "0 8px",
                  }}
                >
                  <Input
                    placeholder="Đơn vị"
                    onChange={(e) => {
                      setDataProduct({
                        ...dataProduct,
                        unit: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="note"
                  rules={[{ required: true }]}
                  style={{
                    width: "100%",
                  }}
                >
                  <Input
                    style={{ height: 50 }}
                    placeholder="ghi chú"
                    onChange={(e) => {
                      setDataProduct({
                        ...dataProduct,
                        note: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item
                label=" "
                colon={false}
                style={{
                  marginTop: 10,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => {
                    handleDataProduct();
                    console.log(dataProduct);
                    setData({
                      ...data,
                      sender: dataSender,
                      receiver: datarReceiver,
                      origin: dataOrigin,
                      destination: dataDestination,
                      products: handleDataProduct(),
                    });
                    console.log(data);
                  }}
                >
                  Xác nhận
                </Button>
              </Form.Item>
            </Form>
            {/* <Form
              labelCol={{
                span: 6,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              onFinish={acceptAddNewOrder}
              autoComplete="off"
            >
              <Item label="Tên dịch vụ">
                <Select
                  allowClear
                  showSearch
                  onChange={(_, option) =>
                    setData({ ...data, serviceName: option?.value })
                  }
                >
                  {serviceList.map((service) => (
                    <Option value={service.name} key={service._id}>
                      {service.name}
                    </Option>
                  ))}
                </Select>
              </Item>

              <Item label="Xuất phát">
                <Select
                  allowClear
                  showSearch
                  onChange={(_, option) =>
                    setData({ ...data, origin: option?.value })
                  }
                >
                  {warehouseList.map((warehouse) => (
                    <Option value={warehouse.province} key={warehouse._id}>
                      {warehouse.name}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item label="Loading">
                <Select
                  allowClear
                  showSearch
                  onChange={(_, option) =>
                    setData({ ...data, origin: option?.value })
                  }
                >
                  <Option value="on site">On site</Option>
                  <Option value="ship">Ship</Option>
                </Select>
              </Item>
              <Item label="Điểm đến">
                <Select
                  allowClear
                  showSearch
                  onChange={(_, option) =>
                    setData({ ...data, destination: option?.value })
                  }
                >
                  {warehouseList.map((warehouse) => (
                    <Option value={warehouse.province} key={warehouse._id}>
                      {warehouse.name}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item label="Unloading">
                <Select
                  allowClear
                  showSearch
                  onChange={(_, option) =>
                    setData({ ...data, origin: option?.value })
                  }
                >
                  <Option value="on site">On site</Option>
                  <Option value="ship">Ship</Option>
                </Select>
              </Item>
              <Item label="Người nhận">
                <Input
                  onChange={(e) => {
                    setDataReceiver({
                      ...datarReceiver,
                      name: e.target.value,
                    });
                    setData({
                      ...data,
                      receiver: datarReceiver,
                    });
                  }}
                />
              </Item>
              <Item label="số điện thoại người nhận">
                <Input
                  onChange={(e) => {
                    setDataReceiver({
                      ...datarReceiver,
                      phone: e.target.value,
                    });
                    setData({
                      ...data,
                      receiver: datarReceiver,
                    });
                  }}
                />
              </Item>
              <Item label="xác thực">
                <Input
                  onChange={(e) => {
                    setDataReceiver({
                      ...datarReceiver,
                      identity: e.target.value,
                    });
                    setData({
                      ...data,
                      receiver: datarReceiver,
                    });
                  }}
                />
              </Item>
             
              <Item label="Email khách hàng">
                <Input
                  onChange={(e) => {
                    setData({
                      ...data,
                      customerEmail: e.target.value,
                    });
                  }}
                />
              </Item>
              <Item label="Số điện thoại">
                <Input
                  onChange={(e) => {
                    setData({
                      ...data,
                      customerPhone: e.target.value,
                    });
                  }}
                />
              </Item>
              <div className="flex justify-end mt-2 text-sm gap-x-6">
                <Button
                  size="large"
                  disabled={disable}
                  className={
                    !disable &&
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
                  onClick={() => console.log(data)}
                  htmlType="submit"
                  className="rounded-lg"
                >
                  Xác nhận
                </Button>
              </div>
            </Form> */}
          </div>
        </div>
      )}
    </>
  );
}

export default AddNewOrder;
