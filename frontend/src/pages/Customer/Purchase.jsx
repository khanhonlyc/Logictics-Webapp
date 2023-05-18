import { Pagination, Tabs } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FaCarSide, FaTruckMoving, FaWeight } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdOutlineEditCalendar,
  MdOutlinePriceChange,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import IMG from "../../assets/images/noorder.jpg";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
import useNavigateHook from "./../../hooks/useNavigateHook";
import { BsList } from "react-icons/bs";
import styled from "styled-components";

const StyledInput = styled.input`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const { TabPane } = Tabs;

// Components
const Row = ({ icon, label, children }) => (
  <div className="ml-2 flex items-center py-1">
    {icon && icon}
    <div className="text-base font-semibold mr-4 w-44">{label}:</div>
    <div className="text-base">{children}</div>
  </div>
);

const SearchInput = ({ searchTerm, setSearchTerm }) => (
  <>
    <input
      type="text"
      name="search"
      placeholder="Tìm kiếm sản phẩm theo mã vận đơn"
      autoComplete="off"
      className="border border-gray-300 rounded-lg outline-none text-black text-sm block w-full p-2.5 pr-10"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <IoSearchOutline className="w-5 h-5 absolute right-4" />
  </>
);

const Header = ({ data, handleStatus }) => (
  <div className="flex justify-between items-center border-gray-300 border-b-[1px] py-2 bg-[#ffd124]">
    <div className="flex flex-nowrap items-center mx-2">
      <div className="text-lg sm:text-lg font-bold ml-2 text-[#00003B]">
        Mã đơn vận: #{data.orderId}
      </div>
    </div>
    <div className="flex flex-nowrap items-center mx-2 flex-row">
      <FaTruckMoving className="sm:mr-2 mr-[2px]" />
      <Link
        className="text-[10px] font-semibold sm:mr-4 sm:text-sm  hover:translate-y-[-1px] transition-all hover:text-[#00003B]  cursor-pointer"
        to={`/khach-hang/dat-hang/${data.orderId}`}
      >
        {handleStatus(data.status)}
      </Link>
    </div>
  </div>
);

const FilterByPageSize = ({ params, setParams }) => (
  <>
    <label htmlFor="pageSize">Hiển thị</label>
    <StyledInput
      type="number"
      name="pageSize"
      id="pageSize"
      value={params.pageSize}
      onChange={(e) =>
        setParams({
          ...params,
          pageSize:
            e.target.value === "" || e.target.value <= 0 ? 1 : e.target.value,
        })
      }
      className="border border-gray-300 rounded-lg text-black text-sm py-[10px] text-center w-12 h-[42px] outline-none"
    />
  </>
);

const OrderDetail = ({ data }) => (
  <div className="flex justify-end mb-1 mr-2">
    <Link to={`/khach-hang/lich-su-dat-hang/don-hang/${data.orderId}`}>
      <button className="p-2 ml-3 font-bold items-center max-w-[160px] flex  bg-yellow-500  border-button_color border-2  hover:translate-y-[-1px] transition-all text-[#00003B] rounded-sm">
        <MdOutlineEditCalendar className="mr-1" />
        <div>Theo dõi đơn hàng</div>
      </button>
    </Link>
  </div>
);

const Purchase = () => {
  // Router
  const navigate = useNavigate();
  const { pushQuery } = useNavigateHook();
  // Redux
  const { accessToken, setMetadata } = useContext(MainContext);
  // State
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  });
  const [params, setParams] = useState({
    ...pagination,
    page: pagination.page - 1,
    sortBy: "-updatedAt",
    pageSize: pagination.pageSize !== "" ? pagination.pageSize : order.length,
  });
  const [key, setKey] = useState("tất cả");
  const [searchTerm, setSearchTerm] = useState("");

  // Set metadata
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Lịch sử đặt hàng | TKTL",
      };
    });
  }, [setMetadata]);

  // Handle actions
  const handlePage = (newPagination) => {
    setParams({
      ...params,
      ...newPagination,
      page: newPagination - 1,
    });
  };
  const handleDate = (string) => {
    return string.split("T")[0];
  };

  // Get order list
  const fetchApi = async (params = {}) => {
    try {
      const res = await axios.get(`${END_POINT}/order`, {
        params: params,
        headers: { authorization: `Bearer ${accessToken}` },
      });
      const { data } = res.data;
      setTotal(data.length);
      setOrder(data.orders);
      setPagination({
        pageSize: params?.pageSize,
        page: params?.page,
      });
      pushQuery(params);
    } catch (err) {
      console.log(err);
    }
  };

  // Auto fetch
  useEffect(() => {
    fetchApi(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Handle status
  function handleTabs(key) {
    setKey(key);
    setParams({
      ...params,
      status: key,
      page: 0,
      pageSize: 2,
    });
    navigate(`/khach-hang/lich-su-dat-hang?status=${key}`);
  }

  // Handle filter status
  const handleStatus = (status) => {
    if (status === "waiting") {
      return (status = "Chờ xác nhận");
    } else if (status === "accepted") {
      return (status = "Đã chấp nhận");
    } else if (status === "probably proceed") {
      return (status = "Đang xử lý");
    } else if (status === "processing") {
      return (status = "Đang xử lý");
    } else if (status === "completed") {
      return (status = "Hoàn thành");
    } else if (status === "refused") {
      return (status = "Bị từ chối");
    } else if (status === "cancel") {
      return (status = "Hủy bỏ");
    }
    return;
  };

  // Format price
  const formatPrice = (number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(number)
      .replaceAll("₫", "VNĐ");
  };

  return (
    <div>
      <div className="bg-gray-100 relative">
        <div
          className="custom-tab  container w-[100%] px-auto  text-xl bg-white"
          style={{ width: "100%" }}
        >
          <Tabs
            defaultActiveKey={key}
            onChange={handleTabs}
            centered
            size="large"
            tabPosition="top"
            type="line"
            className="pt-1 px-2 lg:px-2"
            tabBarStyle={{ color: "#ffbb00" }}
          >
            <TabPane tab="Tất cả" key=""></TabPane>
            <TabPane tab="Chờ xác nhận" key="waiting"></TabPane>
            <TabPane tab="Chấp thuận" key="accepted"></TabPane>
            <TabPane tab="Đang giao" key="processing"></TabPane>
            <TabPane tab="Hoàn thành" key="completed"></TabPane>
            <TabPane tab="Đã hủy" key="cancel"></TabPane>
            <TabPane tab="Bị từ chối" key="refused"></TabPane>
          </Tabs>
        </div>

        <div className="m-2 flex mb-4 items-center">
          <div className="relative flex items-center text-gray-400 w-4/5 rounded-lg">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className="flex items-center justify-end gap-4 w-1/5">
            <FilterByPageSize params={params} setParams={setParams} />
          </div>
        </div>

        {order <= 0 ? (
          <div className="flex justify-center mt-3 mb-4 items-center flex-col">
            <img className="w-80 h-80 mb-2" src={IMG} alt="#" />
            <div className="font-bold text-2xl">Không có đơn hàng</div>
          </div>
        ) : (
          order
            .filter((orderItem) => orderItem.orderId.includes(searchTerm))
            .map((orderItem, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col mt-2 bg-white rounded-sm shadow-xl border-[1px]"
                >
                  <Header data={orderItem} handleStatus={handleStatus} />

                  <div className="overflow-auto mb-3 w-[100%]">
                    <div className="flex items-center py-2 border-gray-300 border-b-[1px]">
                      <div className="ml-3 flex flex-col">
                        <Row
                          icon={<AiTwotoneCalendar className="mr-2 w-5 h-5" />}
                          label="Thời gian"
                        >
                          {handleDate(
                            `${orderItem.createdAt.substring(8, 10)}`
                          )}
                          -
                          {handleDate(`${orderItem.createdAt.substring(5, 7)}`)}
                          -
                          {handleDate(`${orderItem.createdAt.substring(0, 4)}`)}
                        </Row>

                        <Row
                          icon={
                            <MdOutlineProductionQuantityLimits className="mr-2 w-5 h-5" />
                          }
                          label="Tên hàng hóa"
                        >
                          {orderItem.products.map((product) => (
                            <span key={product._id} className="addComma">
                              {product.name}
                            </span>
                          ))}
                        </Row>

                        <Row
                          icon={<BsList className="mr-2 w-5 h-5" />}
                          label="Số lượng"
                        >
                          {orderItem.products.reduce(
                            (acc, product) => product.quantity + acc,
                            0
                          )}
                        </Row>

                        <Row
                          icon={<FaWeight className="mr-2 w-5 h-5" />}
                          label="Khối lượng"
                        >
                          {orderItem.products.map((product) => (
                            <span
                              key={product._id}
                              className="capitalize addComma"
                            >
                              {orderItem.products.reduce(
                                (acc, product) => product.quantity + acc,
                                0
                              )}{" "}
                              {product.unit}
                            </span>
                          ))}
                        </Row>

                        <Row
                          icon={<FaCarSide className="mr-2 w-5 h-5" />}
                          label="Loại vận chuyển"
                        >
                          <span className="capitalize">
                            {orderItem.service.name}
                          </span>
                        </Row>

                        <Row
                          icon={
                            <MdOutlinePriceChange className="mr-2 w-5 h-5" />
                          }
                          label="Tổng tiền"
                        >
                          {orderItem.total_price
                            ? formatPrice(orderItem.total_price)
                            : "0 VNĐ"}
                        </Row>
                      </div>
                    </div>

                    <div className="flex justify-end  sm:mr-4 mb-1 mt-[16px]">
                      <OrderDetail data={orderItem} />
                    </div>
                  </div>
                </div>
              );
            })
        )}
      </div>
      <div className="flex justify-center mt-2 mb-3 items-center">
        <Pagination
          defaultCurrent={pagination.current}
          onChange={handlePage}
          total={total}
          pageSize={pagination.pageSize}
        />
      </div>
    </div>
  );
};

export default Purchase;
