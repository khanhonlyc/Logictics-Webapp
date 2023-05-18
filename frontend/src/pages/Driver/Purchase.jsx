import { Steps } from "antd";
import React, { useContext, useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import comboShape from "../../assets/icons/combo-shape.svg";
import Ellipse276 from "../../assets/images/Ellipse276.png";
import Union from "../../assets/images/Union.png";
import { MainContext } from "../../context/MainContext";

const { Step } = Steps;

const steps = [
  {
    title: "Hà Nội",
  },
  {
    title: "Lào Cai",
  },
];

const bills = [
  {
    _id: "63463dea3c5d5365b569463b",
    service: "633ad3aa17736b42d1d198ef",
    road: [
      {
        _id: "6346386e3c5d5365b5694600",
        origin: "63463023aa49b8c4bb5aa952",
        destination: "63463038aa49b8c4bb5aa955",
        distance: 10000,
        createdAt: "2022-10-09T03:45:50.431Z",
      },
    ],
    car: "633bad9c29fb93acd4e46e00",
    driver: "633084e59055bd1a8b4e1321",
    status: "completed",
    actual_fuel: 0,
    theoretical_fuel: 0,
    product_shipments: [],
    createdAt: "2022-10-09T04:09:14.499Z",
  },
  {
    _id: "63463dde3c5d5365b5694634",
    service: "633ad3aa17736b42d1d198ef",
    road: [
      {
        _id: "6346386e3c5d5365b5694600",
        origin: "63463023aa49b8c4bb5aa952",
        destination: "63463038aa49b8c4bb5aa955",
        distance: 10000,
        createdAt: "2022-10-12T03:45:50.431Z",
      },
    ],
    car: "633bad9c29fb93acd4e46e00",
    driver: "633084e59055bd1a8b4e1321",
    status: "completed",
    actual_fuel: 0,
    theoretical_fuel: 0,
    product_shipments: [],
    createdAt: "2022-10-12T04:09:02.687Z",
  },
  {
    _id: "634639ed3c5d5365b569462d",
    service: "633ad3aa17736b42d1d198ef",
    road: [
      {
        _id: "6346386e3c5d5365b5694600",
        origin: "63463023aa49b8c4bb5aa952",
        destination: "63463038aa49b8c4bb5aa955",
        distance: 10000,
        createdAt: "2022-10-12T03:45:50.431Z",
      },
    ],
    car: "633bad9c29fb93acd4e46e00",
    driver: "633084e59055bd1a8b4e1321",
    status: "completed",
    actual_fuel: 0,
    theoretical_fuel: 0,
    product_shipments: [],
    createdAt: "2022-10-12T03:52:13.267Z",
  },
];

const Purchase = () => {
  // Redux
  const { setMetadata /* accessToken */ } = useContext(MainContext);
  // State
  // const [bills, setBills] = useState([]);

  // Set metadata
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Danh sách hóa đơn | TKTL",
      };
    });
  }, [setMetadata]);

  // Fetch data
  // const getBillsApi = useCallback(async () => {
  //   try {
  //     const res = await axios.get(`${END_POINT}/bill`, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     });

  //     // setBills(res.data.data.bills);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [accessToken]);

  // Auto fetch order list
  useEffect(() => {
    // getBillsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="px-6 py-4">
      <TitlePage title="Danh sách hóa đơn" />

      <div className="space-y-8">
        {bills.map((bill) => (
          <BillList key={bill._id} bill={bill} />
        ))}
      </div>
    </div>
  );
};

// Components
const TitlePage = ({ title }) => (
  <h3 className="font-bold mb-8 text-2xl mt-2 uppercase" title={title}>
    {title}
  </h3>
);

const BillList = ({ bill }) => {
  const getCreatedAt = (date) => {
    const createdAt = new Date(date);
    return `${createdAt.getDate()}-${
      createdAt.getMonth() + 1
    }-${createdAt.getFullYear()}`;
  };

  return (
    <div>
      <p className="bg-[#3A3C3F] text-[#F9F9F9] font-semibold text-base py-2 px-4">
        {getCreatedAt(bill.createdAt)}
      </p>

      <div className="rounded-xl shadow-2xl bg-[#fff] pb-4">
        <div className="bg-[#FFD124] py-2 px-4 flex items-center justify-between">
          <p className="text-[#3A3C3F] font-bold m-0">#7841319</p>
          <p className="space-x-4 flex items-center justify-between m-0">
            <img src={Ellipse276} alt="active-icon" />
            <span className="text-[13px] font-medium">Đang thực hiện</span>
          </p>
        </div>

        <div className="my-6 px-8">
          <Steps
            progressDot
            current={2}
            direction="vertical"
            style={{ zIndex: 1 }}
          >
            {steps.map((item) => (
              <Step
                key={item.title}
                description={item.description}
                title={item.title}
              />
            ))}
          </Steps>
        </div>

        <div className="flex items-center justify-between px-8 -mt-2">
          <div className="flex items-center gap-10">
            <p className="flex items-center gap-2">
              <img
                className="inline-block mr-1 mb-1"
                src={comboShape}
                alt="i"
              />
              25 km
            </p>
            <p className="flex items-center gap-2">
              <img className="inline-block mr-1 mb-1" src={Union} alt="i" />1
              tấn
            </p>
          </div>
          <Link
            to="/tai-xe/chi-tiet-don-hang"
            className="bg-[#FFD124] rounded-3xl px-8 py-2"
          >
            <AiOutlineArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
