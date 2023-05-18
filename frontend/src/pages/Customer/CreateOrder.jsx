import { Button, message } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  getDistrictsByProvinceCode,
  getProvinces,
  getWardsByDistrictCode,
} from "sub-vn";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

// Components
const TitlePage = ({ title }) => (
  <div className="pl-6 pt-3">
    <h3 className="font-bold mb-1 text-2xl mt-2 uppercase">{title}</h3>
  </div>
);

const Container = ({ title, icon, children }) => (
  <div className="mt-2 rounded-sm shadow-xl pb-6">
    <div className="py-2 bg-[#ffd124]">
      <div className="mx-2 relative">
        <div className="text-lg font-bold ml-2 text-[#00003B]">{title}</div>

        {icon && (
          <div className="absolute text-[#F9F9F9] bg-[#3A3C3F] cursor-pointer right-2 w-[28px] text-2xl top-0 flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </div>

    {children}
  </div>
);

const Input = ({ type, label, name, value, handleForm }) => (
  <div className="my-3 mx-[20px] relative">
    <label
      htmlFor={name}
      className="absolute top-[-10px] left-2 bg-white text-[14px] font-semibold"
    >
      {label}
    </label>

    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleForm}
      className="outline-none border-[1px] rounded-md px-4 py-[6px] border-[#3A3C3F] text-base w-[100%] line-clamp-1 h-11"
    />
  </div>
);

const InputRadio = ({ name, value, defaultChecked, children }) => (
  <label className="text-[14px] font-bold flex items-center">
    <input
      type="radio"
      name={name}
      className="mr-2 w-4 h-4"
      value={value}
      defaultChecked={defaultChecked}
    />
    {children}
  </label>
);

const PickAt = ({ label1, label2, name, onChange }) => (
  <div className="flex items-center pt-4 gap-8 px-8" onChange={onChange}>
    <InputRadio name={name} value="ship" defaultChecked>
      {label1}
    </InputRadio>
    <InputRadio name={name} value="on site">
      {label2}
    </InputRadio>
  </div>
);

const Textarea = ({ label, name, value, handleForm }) => (
  <div className="my-3 mx-[20px] relative">
    <label
      htmlFor={name}
      className="absolute top-[-10px] left-2 bg-white text-[14px] font-semibold"
    >
      {label}
    </label>
    <textarea
      className="outline-none border-[1px] rounded-md py-[6px] px-4 border-[#3A3C3F] text-base w-[100%] h-36"
      id={name}
      type="text"
      name={name}
      onChange={handleForm}
      value={value}
    />
  </div>
);

const DropBox = ({ label, name, data, onChange }) => (
  <div className="my-3 mx-[20px] relative">
    <label
      htmlFor={name}
      className="absolute top-[-10px] left-2 bg-white text-[14px] font-semibold"
    >
      {label}
    </label>

    <select
      id={name}
      name={name}
      onChange={onChange}
      className="outline-none border-[1px] rounded-md px-4 py-[6px] border-[#3A3C3F] text-base w-[100%] line-clamp-1 h-11"
    >
      <option value=""></option>
      {data?.length > 0 &&
        data.map((item) => (
          <option key={item.code} value={item.code}>
            {item.name}
          </option>
        ))}
    </select>

    <label htmlFor={name} className="absolute top-2 right-2">
      <MdOutlineKeyboardArrowDown className="text-[#3A3C3F] text-[30px]" />
    </label>
  </div>
);

const Services = ({ services, information, setInformation }) => (
  <div className="relative mt-4 ml-8 w-fit pb-4">
    <select
      id="services"
      name="services"
      onChange={(e) =>
        setInformation({
          ...information,
          serviceName: e.target.value,
        })
      }
      className="line-clamp-1 bg-[#3A3C3F] text-[#F9F9F9] rounded-2xl text-[14px] font-semibold h-12 w-[180px] px-4 outline-none"
    >
      <option value="">Tiêu chuẩn</option>
      {services.map((service) => (
        <option key={service._id} value={service.name}>
          {service.name}
        </option>
      ))}
    </select>

    <label htmlFor="services" className="absolute top-2 right-2">
      <MdOutlineKeyboardArrowDown className="text-[#F9F9F9] text-[30px]" />
    </label>
  </div>
);

const Warehouse = ({ warehouse, name, valueSelected, onChange }) => (
  <div className="relative mt-4 ml-4 pb-3">
    <select
      id={name}
      name={name}
      onChange={onChange}
      className="bg-[#3A3C3F] text-[#F9F9F9] rounded-2xl text-[14px] font-semibold h-12 w-1/2 pl-4 pr-10 outline-none capitalize text-ellipsis"
    >
      {warehouse
        .filter((item) => item._id !== valueSelected)
        .map((item) => (
          <option key={item._id} value={item._id} className="capitalize">
            {`kho ${item.name}, đường ${item.street}, ${item.ward}, ${item.district}, ${item.province}`}
          </option>
        ))}
    </select>

    <label htmlFor={name} className="absolute top-[10px] left-[45.5%]">
      <MdOutlineKeyboardArrowDown className="text-[#F9F9F9] text-[30px]" />
    </label>
  </div>
);

export default function CreateOrder() {
  // Redux
  const { setMetadata, accessToken } = useContext(MainContext);

  // Router
  const navigate = useNavigate();

  // State
  const [information, setInformation] = useState({
    // Service information
    serviceName: "",
    // Sender information
    nameSender: "",
    phoneSender: "",
    loading: "ship",
    warehouseIdSender: "",
    //
    streetSender: "",
    // Receiver information
    nameReceiver: "",
    phoneReceiver: "",
    unloading: "ship",
    warehouseIdReceiver: "",
    //
    streetReceiver: "",
    // Pick at information
    pick_at: "ship",
    // Product information
    products: [
      {
        name: "",
        quantity: "",
        unit: "kg",
        note: "",
      },
    ],
  });
  const [services, setServices] = useState([]);
  const [warehouse, setWarehouse] = useState([]);
  const [senderAddress, setSenderAddress] = useState({
    provincesTo: [],
    districtsTo: [],
    wardsTo: [],
    provinceCodeTo: null,
    districtCodeTo: null,
    wardCodeTo: null,
    province: null,
    district: null,
    ward: null,
  });
  const [receiverAddress, setReceiverAddress] = useState({
    provincesTo: [],
    districtsTo: [],
    wardsTo: [],
    provinceCodeTo: null,
    districtCodeTo: null,
    wardCodeTo: null,
    province: null,
    district: null,
    ward: null,
  });
  const [warehouseSenderSelected, setWarehouseSenderSelected] = useState("");
  const [warehouseReceiverSelected, setWarehouseReceiverSelected] =
    useState("");
  const [loading, setLoading] = useState(false);

  // Set metadata
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Đơn đặt hàng | TKTL",
      };
    });
  }, [setMetadata]);

  // Get all services
  useEffect(() => {
    const getService = async () => {
      const res = await axios.get(`${END_POINT}/service`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { data } = res.data;
      setServices(data.service);
    };
    getService();
  }, [accessToken]);

  // Get all warehouse
  useEffect(() => {
    const getWarehouse = async () => {
      const res = await axios.get(`${END_POINT}/warehouse`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setWarehouse(res.data.data.warehouses);
    };
    getWarehouse();
  }, [accessToken]);

  // Get all provinces sender
  useEffect(() => {
    setSenderAddress((prev) => {
      return {
        ...prev,
        provincesTo: getProvinces(),
      };
    });
  }, []);

  // Get all districts by province code sender
  useEffect(() => {
    setSenderAddress((prev) => {
      return {
        ...prev,
        districtsTo: getDistrictsByProvinceCode(senderAddress.provinceCodeTo),
      };
    });
  }, [senderAddress.provinceCodeTo]);

  // Get all wards by district code sender
  useEffect(() => {
    setSenderAddress((prev) => {
      return {
        ...prev,
        wardsTo: getWardsByDistrictCode(senderAddress.districtCodeTo),
      };
    });
  }, [senderAddress.districtCodeTo]);

  // Get province name sender
  useEffect(() => {
    for (let i = 0; i < senderAddress?.provincesTo?.length; i++)
      if (senderAddress?.provinceCodeTo === senderAddress?.provincesTo[i].code)
        setSenderAddress((prev) => {
          return {
            ...prev,
            province: senderAddress?.provincesTo[i].name,
          };
        });
  }, [senderAddress?.provinceCodeTo, senderAddress?.provincesTo]);

  // Get district name sender
  useEffect(() => {
    for (let i = 0; i < senderAddress?.districtsTo?.length; i++)
      if (senderAddress?.districtCodeTo === senderAddress?.districtsTo[i].code)
        setSenderAddress((prev) => {
          return {
            ...prev,
            district: senderAddress?.districtsTo[i].name,
          };
        });
  }, [senderAddress?.districtCodeTo, senderAddress?.districtsTo]);

  // Get ward name sender
  useEffect(() => {
    for (let i = 0; i < senderAddress?.wardsTo?.length; i++)
      if (senderAddress?.wardCodeTo === senderAddress?.wardsTo[i].code)
        setSenderAddress((prev) => {
          return {
            ...prev,
            ward: senderAddress?.wardsTo[i].name,
          };
        });
  }, [senderAddress?.wardCodeTo, senderAddress?.wardsTo]);

  // Get all provinces receiver
  useEffect(() => {
    setReceiverAddress((prev) => {
      return {
        ...prev,
        provincesTo: getProvinces(),
      };
    });
  }, []);

  // Get all districts by province code receiver
  useEffect(() => {
    setReceiverAddress((prev) => {
      return {
        ...prev,
        districtsTo: getDistrictsByProvinceCode(receiverAddress.provinceCodeTo),
      };
    });
  }, [receiverAddress.provinceCodeTo]);

  // Get all wards by district code receiver
  useEffect(() => {
    setReceiverAddress((prev) => {
      return {
        ...prev,
        wardsTo: getWardsByDistrictCode(receiverAddress.districtCodeTo),
      };
    });
  }, [receiverAddress.districtCodeTo]);

  // Get province name receiver
  useEffect(() => {
    for (let i = 0; i < receiverAddress?.provincesTo?.length; i++)
      if (
        receiverAddress?.provinceCodeTo === receiverAddress?.provincesTo[i].code
      )
        setReceiverAddress((prev) => {
          return {
            ...prev,
            province: receiverAddress?.provincesTo[i].name,
          };
        });
  }, [receiverAddress?.provinceCodeTo, receiverAddress?.provincesTo]);

  // Get district name receiver
  useEffect(() => {
    for (let i = 0; i < receiverAddress?.districtsTo?.length; i++)
      if (
        receiverAddress?.districtCodeTo === receiverAddress?.districtsTo[i].code
      )
        setReceiverAddress((prev) => {
          return {
            ...prev,
            district: receiverAddress?.districtsTo[i].name,
          };
        });
  }, [receiverAddress?.districtCodeTo, receiverAddress?.districtsTo]);

  // Get ward name receiver
  useEffect(() => {
    for (let i = 0; i < receiverAddress?.wardsTo?.length; i++)
      if (receiverAddress?.wardCodeTo === receiverAddress?.wardsTo[i].code)
        setReceiverAddress((prev) => {
          return {
            ...prev,
            ward: receiverAddress?.wardsTo[i].name,
          };
        });
  }, [receiverAddress?.wardCodeTo, receiverAddress?.wardsTo]);

  // Handle change input
  const handleForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInformation({ ...information, [name]: value });
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Check if pick at is
      await axios.post(
        `${END_POINT}/order`,
        information.loading === "ship" && information.unloading === "ship"
          ? {
              sender: {
                name: information.nameSender,
                phone: information.phoneSender,
              },
              receiver: {
                name: information.nameReceiver,
                phone: information.phoneReceiver,
              },
              service: information.serviceName,
              origin: {
                loading: information.loading,
                address: {
                  street: information.streetSender,
                  ward: senderAddress.ward,
                  district: senderAddress.district,
                  province: senderAddress.province,
                },
              },
              destination: {
                unloading: information.unloading,
                address: {
                  street: information.streetReceiver,
                  ward: receiverAddress.ward,
                  district: receiverAddress.district,
                  province: receiverAddress.province,
                },
              },
              products: [...information.products],
            }
          : information.loading === "ship" &&
            information.unloading === "on site"
          ? {
              sender: {
                name: information.nameSender,
                phone: information.phoneSender,
              },
              receiver: {
                name: information.nameReceiver,
                phone: information.phoneReceiver,
              },
              service: information.serviceName,
              origin: {
                loading: information.loading,
                address: {
                  street: information.streetSender,
                  ward: senderAddress.ward,
                  district: senderAddress.district,
                  province: senderAddress.province,
                },
              },
              destination: {
                unloading: information.unloading,
                address: information.warehouseIdReceiver,
              },
              products: [...information.products],
            }
          : information.loading === "on site" &&
            information.unloading === "ship"
          ? {
              sender: {
                name: information.nameSender,
                phone: information.phoneSender,
              },
              receiver: {
                name: information.nameReceiver,
                phone: information.phoneReceiver,
              },
              service: information.serviceName,
              origin: {
                loading: information.loading,
                address: information.warehouseIdSender,
              },
              destination: {
                unloading: information.unloading,
                address: {
                  street: information.streetReceiver,
                  ward: receiverAddress.ward,
                  district: receiverAddress.district,
                  province: receiverAddress.province,
                },
              },
              products: [...information.products],
            }
          : information.loading === "on site" &&
            information.unloading === "on site" && {
              sender: {
                name: information.nameSender,
                phone: information.phoneSender,
              },
              receiver: {
                name: information.nameReceiver,
                phone: information.phoneReceiver,
              },
              service: information.serviceName,
              origin: {
                loading: information.loading,
                address: information.warehouseIdSender,
              },
              destination: {
                unloading: information.unloading,
                address: information.warehouseIdReceiver,
              },
              products: [...information.products],
            },
        {
          headers: { authorization: `Bearer ${accessToken}` },
        }
      );
      message.success({
        content: "Tạo đơn hàng thành công",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });

      setLoading(false);
      navigate("/khach-hang/lich-su-dat-hang", { replace: true });
    } catch (err) {
      setLoading(false);
      message.error({
        content: err.response.data.message,
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
    }
  };

  // Add product form when click add button
  const handleAddProductForm = () => {
    setInformation({
      ...information,
      products: [
        ...information.products,
        {
          name: "",
          quantity: "",
          unit: "kg",
          note: "",
        },
      ],
    });
  };

  // Remove product form when click remove button
  const handleRemoveProductForm = (idx) => {
    setInformation({
      ...information,
      products: information.products.filter((_, index) => index !== idx),
    });
  };

  return (
    <div>
      <div className=" relative">
        <TitlePage title="Đơn đặt hàng" />
        <div className=" relative">
          <form className="lg:mx-5 sm:mx-4 md:mx-5 mx-[8px] mb-4">
            {/* Sender information */}
            <Container title="Thông tin người gửi">
              <PickAt
                label1="Shipper tới lấy hàng"
                label2="Tới bưu cục gửi"
                name="senderReceiver"
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    loading: e.target.value,
                  }))
                }
              />

              <div className="flex flex-1 w-[100%] items-center py-2">
                <div className="mx-3 flex flex-col  flex-1 w-[100%] relative">
                  <Input
                    type="text"
                    label="Họ và tên"
                    name="nameSender"
                    value={information.nameSender}
                    handleForm={handleForm}
                  />

                  <Input
                    type="text"
                    label="Số điện thoại"
                    name="phoneSender"
                    value={information.phoneSender}
                    handleForm={handleForm}
                  />

                  {information.loading === "ship" ? (
                    <div className="grid md:grid-cols-2 sm:grid-cols-1">
                      <Input
                        type="text"
                        label="Số nhà"
                        name="streetSender"
                        value={information.streetSender}
                        handleForm={handleForm}
                      />

                      <DropBox
                        label="Tỉnh/Thành phố"
                        name="provinceSender"
                        data={senderAddress?.provincesTo}
                        onChange={(e) => {
                          setSenderAddress((prev) => ({
                            ...prev,
                            provinceCodeTo: e.target.value,
                          }));
                        }}
                      />

                      <DropBox
                        label="Quận/Huyện"
                        name="districtSender"
                        data={senderAddress?.districtsTo}
                        onChange={(e) => {
                          setSenderAddress((prev) => ({
                            ...prev,
                            districtCodeTo: e.target.value,
                          }));
                        }}
                      />

                      <DropBox
                        label="Phường/Xã"
                        name="wardSender"
                        data={senderAddress?.wardsTo}
                        onChange={(e) => {
                          setSenderAddress((prev) => ({
                            ...prev,
                            wardCodeTo: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  ) : (
                    <Warehouse
                      warehouse={warehouse}
                      name="warehouseSender"
                      onChange={(e) => {
                        setInformation((prev) => ({
                          ...prev,
                          warehouseIdSender: e.target.value,
                        }));
                        setWarehouseSenderSelected(e.target.value);
                      }}
                      valueSelected={warehouseReceiverSelected}
                    />
                  )}
                </div>
              </div>
            </Container>

            {/* Receiver information */}
            <Container title="Thông tin người nhận">
              <PickAt
                label1="Shipper gửi trả hàng"
                label2="Tới bưu cục lấy hàng"
                name="receiverSender"
                onChange={(e) =>
                  setInformation((prev) => ({
                    ...prev,
                    unloading: e.target.value,
                  }))
                }
              />

              <div className="flex flex-1 w-[100%] items-center py-2">
                <div className="mx-3 flex flex-col  flex-1 w-[100%] relative">
                  <Input
                    type="text"
                    label="Họ và tên"
                    name="nameReceiver"
                    value={information.nameReceiver}
                    handleForm={handleForm}
                  />

                  <Input
                    type="text"
                    label="Số điện thoại"
                    name="phoneReceiver"
                    value={information.phoneReceiver}
                    handleForm={handleForm}
                  />

                  {information.unloading === "ship" ? (
                    <div className="grid md:grid-cols-2 sm:grid-cols-1">
                      <Input
                        type="text"
                        label="Số nhà"
                        name="streetReceiver"
                        value={information.streetReceiver}
                        handleForm={handleForm}
                      />

                      <DropBox
                        label="Tỉnh/Thành phố"
                        name="provinceReceiver"
                        data={receiverAddress?.provincesTo}
                        onChange={(e) => {
                          setReceiverAddress((prev) => ({
                            ...prev,
                            provinceCodeTo: e.target.value,
                          }));
                        }}
                      />

                      <DropBox
                        label="Quận/Huyện"
                        name="districtReceiver"
                        data={receiverAddress?.districtsTo}
                        onChange={(e) => {
                          setReceiverAddress((prev) => ({
                            ...prev,
                            districtCodeTo: e.target.value,
                          }));
                        }}
                      />

                      <DropBox
                        label="Phường/Xã"
                        name="wardReceiver"
                        data={receiverAddress?.wardsTo}
                        onChange={(e) => {
                          setReceiverAddress((prev) => ({
                            ...prev,
                            wardCodeTo: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  ) : (
                    <Warehouse
                      warehouse={warehouse}
                      name="warehouseReceiver"
                      onChange={(e) => {
                        setInformation((prev) => ({
                          ...prev,
                          warehouseIdReceiver: e.target.value,
                        }));
                        setWarehouseReceiverSelected(e.target.value);
                      }}
                      valueSelected={warehouseSenderSelected}
                    />
                  )}
                </div>
              </div>
            </Container>

            {/* Type of service */}
            <Container title="Loại dịch vụ">
              <Services
                services={services}
                information={information}
                setInformation={setInformation}
              />
            </Container>

            {/* Product information */}
            <Container
              title="Thông tin hàng hóa"
              icon={<BsPlus onClick={handleAddProductForm} />}
            >
              {information.products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex flex-1 w-[100%] items-center py-2 border-gray-300 border-b-[1px] relative"
                >
                  <div className="mx-3 flex flex-col  flex-1 w-[100%] relative">
                    <Input
                      type="text"
                      label={`Tên hàng hóa ${
                        information.products.length > 1 ? idx + 1 : ""
                      }`}
                      name={`name-${idx + 1}`}
                      value={product.name}
                      handleForm={(e) =>
                        setInformation({
                          ...information,
                          products: information.products.map(
                            (product, index) => {
                              if (index === idx) {
                                return {
                                  ...product,
                                  name: e.target.value,
                                };
                              }
                              return product;
                            }
                          ),
                        })
                      }
                    />

                    <div className="flex items-center">
                      <Input
                        type="number"
                        label={`Số lượng ${
                          information.products.length > 1 ? idx + 1 : ""
                        }`}
                        name={`quantity-${idx + 1}`}
                        value={product.quantity}
                        handleForm={(e) =>
                          setInformation({
                            ...information,
                            products: information.products.map(
                              (product, index) => {
                                if (index === idx) {
                                  return {
                                    ...product,
                                    quantity: e.target.value,
                                  };
                                }
                                return product;
                              }
                            ),
                          })
                        }
                      />

                      <div
                        className="flex items-center p-4 gap-8"
                        onChange={(e) =>
                          setInformation({
                            ...information,
                            products: information.products.map(
                              (product, index) => {
                                if (index === idx) {
                                  return {
                                    ...product,
                                    unit: e.target.value,
                                  };
                                }
                                return product;
                              }
                            ),
                          })
                        }
                      >
                        <InputRadio
                          name={`unit-${idx + 1}`}
                          value="kg"
                          defaultChecked
                        >
                          Kg
                        </InputRadio>
                        <InputRadio name={`unit-${idx + 1}`} value="m3">
                          M<sup>3</sup>
                        </InputRadio>
                        <InputRadio name={`unit-${idx + 1}`} value="ton">
                          Tấn
                        </InputRadio>
                      </div>
                    </div>

                    <Textarea
                      label={`Ghi chú ${
                        information.products.length > 1 ? idx + 1 : ""
                      }`}
                      name={`note-${idx + 1}`}
                      value={product.note}
                      handleForm={(e) =>
                        setInformation({
                          ...information,
                          products: information.products.map(
                            (product, index) => {
                              if (index === idx) {
                                return {
                                  ...product,
                                  note: e.target.value,
                                };
                              }
                              return product;
                            }
                          ),
                        })
                      }
                    />
                  </div>

                  {information.products.length > 1 && (
                    <div
                      className="absolute w-[28px] h-[28px] bg-[#3A3C3F] text-[#F9F9F9] cursor-pointer flex items-center justify-center -right-8 bottom-0"
                      onClick={() => handleRemoveProductForm(idx)}
                    >
                      <AiOutlineMinus />
                    </div>
                  )}
                </div>
              ))}
            </Container>

            <div className="flex justify-center items-center mt-2">
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                className="py-2 px-5 mt-2 mb-4 rounded-lg font-extrabold bg-[#ffd124]  hover:translate-y-[-1px] transition-all text-[#00003B] w-[150px]"
                onClick={handleSubmit}
              >
                Tạo đơn
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
