import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

export default function HangCamGui() {
  const [data, setData] = useState([]);
  const { setMetadata } = useContext(MainContext);
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Hàng cấm gửi | TKTL",
      };
    });
  }, []);
  const getDataFromApi = async () => {
    try {
      const res = await axios.get(`${END_POINT}/prohibited-product`);
      setData(res.data.data.list);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getDataFromApi();
  }, []);
  const Line = ({ color }) => (
    <hr
      style={{
        color: color,
        backgroundColor: color,
        height: "1px",
        width: "100%",
      }}
    />
  );

  return (
    <>
      {data && (
        <>
          {data.map((e, index) => (
            <div
              className="p-7"
              style={{
                maxWidth: "1200px",
                margin: "auto",
              }}
            >
              <div
                className="flex flex-row justify-start items-center mb-10 mt-5"
                key={e.id}
              >
                <img
                  className="w-[56px] h-[56px] lg:w-[94px] lg:h-[94px] object-cover"
                  src={`${END_POINT}/public/${e.images}`}
                  alt="hinh chat cam"
                />
                <div className="mx-4">
                  <h1 className="text-[#ffbb0f] text-2xl font-bold">
                    {index + 1}. {e.name}
                  </h1>
                  <span>{e.detail}</span>
                </div>
              </div>
              <Line color="#f4f4f4" />
            </div>
          ))}
          <div
            className="p-7"
            style={{
              maxWidth: "1200px",
              margin: "auto",
            }}
          >
            <div className="flex justify-start mb-10 mt-4">
              <h5 className="lg:ml-[94px] ml-[56px] text-[14px] lg:text-[16px] text-[#000000] font-extrabold">
                * Nhân viên cần phải kiểm tra hàng trước nhận từ khách để xác
                nhận loại hàng đang gửi thuộc loại hàng nào trong hai loại kể
                trên để xử lý hàng
              </h5>{" "}
            </div>
          </div>
        </>
      )}
    </>
  );
}
