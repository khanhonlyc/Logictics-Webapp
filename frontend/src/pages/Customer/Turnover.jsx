import { DatePicker } from "antd";
import axios from "axios";
import * as shape from "d3-shape";
import moment from "moment";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { BsArrow90DegDown, BsArrow90DegUp } from "react-icons/bs";
import { FaCalendar } from "react-icons/fa";
import styled from "styled-components";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

const d3 = { shape };

const StyledDatePicker = styled(DatePicker)`
  .ant-picker-input > input {
    display: none !important;
  }

  .ant-picker-input > span {
    color: #ffd124;
    margin: 0;
  }
`;

// Constants
const details = [
  {
    key: "today",
    title: "Hôm nay",
  },
  {
    key: "yesterday",
    title: "Hôm qua",
  },
  {
    key: "week",
    title: "Tuần",
  },
  {
    key: "month",
    title: "Tháng",
  },
];

const options = ["1d", "1m"];

const Turnover = () => {
  // Redux
  const { setMetadata, accessToken } = useContext(MainContext);
  // State
  const [option, setOption] = useState(options[0]);
  const [status, setStatus] = useState("today");
  const [orders, setOrders] = useState([]);
  const [orderFiltered, setOrderFiltered] = useState([]);
  const [orderFilteredByOption, setOrderFilteredByOption] = useState([]);
  const month = moment().format("MM");

  // Set metadata
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Doanh thu | TKTL",
      };
    });
  }, [setMetadata]);

  // Fetch data
  const getOrdersApi = useCallback(async () => {
    try {
      const res = await axios.get(`${END_POINT}/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setOrders(res.data.data.orders);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken]);

  // Auto fetch order list
  useEffect(() => {
    getOrdersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Format date
  const formatDate = (date) => moment(date).utc().format("DD/MM/YYYY");

  // Format price
  const formatPrice = (number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(number)
      .replaceAll("₫", "VNĐ");
  };

  // Get range date
  const getRangeDate = useCallback(
    (status) => {
      const today = {
        from_date: moment().format("DD-MM-YYYY 00:00:00"),
        to_date: moment().format("DD-MM-YYYY 23:59:59"),
      };
      const yesterday = {
        from_date: moment().subtract(1, "days").format("DD-MM-YYYY 00:00:00"),
        to_date: moment().subtract(1, "days").format("DD-MM-YYYY 23:59:59"),
      };
      const week = {
        from_date: moment()
          .day(5)
          .startOf("isoWeek")
          .format("DD-MM-YYYY 00:00:00"),
        to_date: moment().day(5).endOf("isoWeek").format("DD-MM-YYYY 23:59:59"),
      };
      const month = {
        from_date: moment().startOf("month").format("DD-MM-YYYY 00:00:00"),
        to_date: moment().endOf("month").format("DD-MM-YYYY 23:59:59"),
      };

      switch (status) {
        case "today":
          return orders.filter((order) =>
            moment(formatDate(order.createdAt)).isSame(today.from_date, "day")
          );
        case "yesterday":
          return orders.filter((order) =>
            moment(formatDate(order.createdAt)).isSame(
              yesterday.from_date,
              "day"
            )
          );
        case "week":
          return orders.filter((order) =>
            moment(formatDate(order.createdAt)).isBetween(
              week.from_date,
              week.to_date,
              "week",
              "[]"
            )
          );
        case "month":
          return orders.filter(
            (order) =>
              formatDate(order.createdAt) >=
                month.from_date.replaceAll("-", "/").slice(0, 10) &&
              formatDate(order.createdAt) <=
                month.to_date.replaceAll("-", "/").slice(0, 10)
          );

        default:
          return orders.filter((order) =>
            moment(formatDate(order.createdAt)).isSame(today.from_date, "day")
          );
      }
    },
    [orders]
  );

  // Set order filtered by status
  useEffect(() => {
    setOrderFiltered(getRangeDate(status));
  }, [getRangeDate, status]);

  // Get range date by option
  const getRangeDateByOption = useCallback(
    (option) => {
      const today = {
        from_date: moment().format("DD-MM-YYYY 00:00:00"),
        to_date: moment().format("DD-MM-YYYY 23:59:59"),
      };
      const month = {
        from_date: moment().startOf("month").format("DD-MM-YYYY 00:00:00"),
        to_date: moment().endOf("month").format("DD-MM-YYYY 23:59:59"),
      };

      switch (option) {
        case "1d":
          return orders.filter((order) =>
            moment(formatDate(order.createdAt)).isSame(today.from_date, "day")
          );
        case "1m":
          return orders.filter(
            (order) =>
              formatDate(order.createdAt) >=
                month.from_date.replaceAll("-", "/").slice(0, 10) &&
              formatDate(order.createdAt) <=
                month.to_date.replaceAll("-", "/").slice(0, 10)
          );

        default:
          return;
      }
    },
    [orders]
  );

  // Set order filtered by option
  useEffect(() => {
    setOrderFilteredByOption(getRangeDateByOption(option));
  }, [getRangeDateByOption, option]);

  //* Calculate total price
  const calculateTotal = useCallback(
    (orders) =>
      orders
        .filter((order) => order.total_price)
        .reduce((total, order) => total + order.total_price, 0),
    []
  );

  // Filter order refused and calculate total price
  const calculateTotalRefused = useCallback(
    (orders) => {
      const filterOrdersPaid = orders?.filter(
        (order) => order.status !== "refused"
      );

      return calculateTotal(filterOrdersPaid);
    },
    [calculateTotal]
  );

  // Filter order completed and calculate total price
  const calculateTotalPaid = useCallback(
    (orders) => {
      const filterOrdersPaid = orders?.filter(
        (order) => order.status === "completed"
      );

      return calculateTotal(filterOrdersPaid);
    },
    [calculateTotal]
  );

  // Calculate total price by month
  const calculateTotalByMonth = useCallback(() => {
    const filterOrdersByMonth = orders.filter(
      (order) => moment(order.createdAt).format("MM") === month
    );

    return calculateTotal(filterOrdersByMonth);
  }, [calculateTotal, month, orders]);

  // Calculate total price by previous month
  const calculateTotalByPreviousMonth = useCallback(() => {
    const filterOrdersByPreviousMonth = orders.filter(
      (order) =>
        moment(order.createdAt).format("MM") ===
        moment().subtract(1, "months").format("MM")
    );

    return calculateTotal(filterOrdersByPreviousMonth);
  }, [calculateTotal, orders]);

  //* Arc chart
  const totalPaid = calculateTotalPaid(orderFilteredByOption);
  const totalTurnover = calculateTotalRefused(orderFilteredByOption);

  // Return calculation total price
  const calculatePercent = useCallback((calculation) => {
    return calculation ? calculation.toFixed(2) : 0;
  }, []);

  // Calculate percent unpaid of total price
  const calculatePercentUnpaid = calculatePercent(
    ((totalTurnover - totalPaid) / totalTurnover) * 100
  );

  // Calculate percent paid of total price
  const calculatePercentPaid = calculatePercent(
    (totalPaid / totalTurnover) * 100
  );

  const arc = [
    {
      startAngle: 0,
      endAngle: 2.1,
      fillColor: "fill-[#DA1212]",
    },
    {
      startAngle: 2.1,
      endAngle: 4.2,
      fillColor: "fill-[#11468F]",
    },
    {
      startAngle: 4.2,
      endAngle: 6.3,
      fillColor: "fill-[#FFD124]",
    },
  ];

  return (
    <div>
      <div className="relative px-6">
        <TitlePage title="Doanh thu" />

        <div className="bg-[#28303F] rounded-2xl p-4 flex items-center justify-center gap-4 mb-8">
          <div className="w-1/2 flex items-center justify-center">
            <Svg size="100" width={230}>
              {arc.map((item, index) => (
                <Arc
                  key={index}
                  startAngle={item.startAngle}
                  endAngle={item.endAngle}
                  className={item.fillColor}
                />
              ))}
            </Svg>
          </div>

          <div className="flex flex-col gap-4 w-1/2 items-center justify-center">
            <div className="flex items-center gap-10 mb-6">
              {options.map((opt) => (
                <div
                  key={opt}
                  onClick={() => setOption(opt)}
                  className={
                    opt === option
                      ? "bg-[#FFD124] w-10 h-10 flex items-center justify-center rounded-md cursor-pointer uppercase"
                      : "bg-transparent w-10 h-10 flex items-center justify-center rounded-md cursor-pointer uppercase border border-[#FFD124] text-[#FFD124]"
                  }
                >
                  {opt}
                </div>
              ))}

              <div className="border border-[#FFD124] text-[#FFD124] w-10 h-10 flex items-center justify-center rounded-md cursor-pointer">
                <StyledDatePicker
                  allowClear={false}
                  bordered={false}
                  inputReadOnly={true}
                  suffixIcon={<FaCalendar />}
                />
              </div>
            </div>
            <div className="text-[#fff]">
              <p className="lg:text-base mb-0">Chú thích:</p>
              <ul>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#DA1212] rounded-sm"></div>Chưa
                  thanh toán {calculatePercentUnpaid}%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#11468F] rounded-sm"></div>Đã
                  thanh toán {calculatePercentPaid}%
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#FFD124] rounded-sm"></div> Chuyển
                  hoàn 0%
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div
            className="w-1/2 rounded-2xl p-4 flex items-center justify-center flex-col gap-2"
            style={{
              background:
                "linear-gradient(126.44deg, #FFD124 47.65%, rgba(255, 209, 36, 0) 142.68%)",
            }}
          >
            <FaCalendar className="text-7xl" />
            <p className="mb-0 font-semibold text-base">Tháng {month}</p>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <div
              style={{
                background:
                  "linear-gradient(175.77deg, #DA1212 -107.9%, rgba(255, 255, 255, 0) 118.81%)",
              }}
              className="rounded-2xl p-4 flex flex-col gap-2"
            >
              <p className="mb-0 text-[#3A3C3F8F]">Tháng trước</p>
              <div className="flex items-center justify-between">
                <p className="mb-0 font-bold text-base">
                  {formatPrice(calculateTotalByPreviousMonth())}
                </p>

                {formatPrice(calculateTotalByPreviousMonth()) >
                formatPrice(calculateTotalByMonth()) ? (
                  <BsArrow90DegUp className="text-[#75FF00] text-3xl" />
                ) : (
                  <BsArrow90DegDown className="text-[#DA1212] text-3xl" />
                )}
              </div>
            </div>
            <div
              style={{
                background:
                  "linear-gradient(180deg, #75FF00 -97.3%, rgba(255, 255, 255, 0) 143.24%)",
              }}
              className="rounded-2xl p-4 flex flex-col gap-2"
            >
              <p className="mb-0 text-[#3A3C3F8F]">Tháng này</p>
              <div className="flex items-center justify-between">
                <p className="mb-0 font-bold text-base">
                  {formatPrice(calculateTotalByMonth())}
                </p>
                {formatPrice(calculateTotalByPreviousMonth()) <
                formatPrice(calculateTotalByMonth()) ? (
                  <BsArrow90DegUp className="text-[#75FF00] text-3xl" />
                ) : (
                  <BsArrow90DegDown className="text-[#DA1212] text-3xl" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-1 text-lg">Chi tiết</h4>

          <div className="flex items-center justify-around">
            {details.map((item) => (
              <div
                key={item.title}
                onClick={() => setStatus(item.key)}
                className={
                  status === item.key
                    ? "font-bold bg-[#FFD124] text-[#3A3C3F] px-4 py-1 rounded-2xl cursor-pointer hover:opacity-90 transition-all"
                    : "px-4 py-1 rounded-2xl cursor-pointer border border-[#3A3C3F8F] text-[#3A3C3F8F]"
                }
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="bg-[#28303F] h-28 rounded-xl flex justify-around items-center mt-6 text-center">
            <div className="flex flex-col">
              <h6 className="text-slate-400 mb-8 lg:text-base">
                Tổng doanh thu
              </h6>
              <p className="text-[#fff] font-bold lg:text-base mb-0">
                {calculateTotalRefused(orderFiltered)
                  ? formatPrice(calculateTotalRefused(orderFiltered))
                  : "0 VNĐ"}
              </p>
            </div>

            <div className="flex flex-col">
              <h6 className="text-slate-400 mb-8 lg:text-base">Đơn hàng</h6>
              <p className="text-[#fff] font-bold lg:text-base mb-0">
                {orderFiltered?.length ? orderFiltered.length : 0}
              </p>
            </div>

            <div className="flex flex-col">
              <h6 className="text-slate-400 mb-8 lg:text-base">
                Đã thanh toán
              </h6>
              <p className="text-[#fff] font-bold lg:text-base mb-0">
                {calculateTotalPaid(orderFiltered)
                  ? formatPrice(calculateTotalPaid(orderFiltered))
                  : "0 VNĐ"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Components
const TitlePage = ({ title }) => (
  <div className="pt-3 mb-4">
    <h3 className="font-bold mb-1 text-2xl mt-2 uppercase">{title}</h3>
  </div>
);

const Svg = ({ children, size, width = 100 }) => {
  const x = size / 2;
  const y = size / 2;
  return (
    <svg width={width} viewBox={`0 0 ${size} ${size}`}>
      <g transform={`translate(${x},${y})`}>{children}</g>
    </svg>
  );
};

const Arc = ({
  size,
  startAngle,
  endAngle,
  innerRadius = 20,
  outerRadius = 35,
  ...rest
}) => {
  const arcGenerator = d3.shape
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(startAngle)
    .endAngle(endAngle);

  return <path {...rest} d={arcGenerator()} />;
};

export default Turnover;
