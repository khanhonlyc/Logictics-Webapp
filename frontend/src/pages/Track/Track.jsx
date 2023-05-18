import { Tabs } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
import BangGia from "./BangGia";
import BuuCuc from "./BuuCuc";
import CuocVanChuyen from "./CuocVanChuyen";
import HangCamGui from "./HangCamGui";
import VanDon from "./VanDon";
const { TabPane } = Tabs;

export default function Track({ number }) {
  const { aboutUs, fetchAboutUs } = useContext(MainContext);
  useEffect(() => {
    fetchAboutUs();
  }, []);

  const onChange = (key) => {
    console.log(key);
  };
  const navigate = useNavigate();
  const [defaultService, setDefaultService] = useState("cước vận chuyển");
  function callback(dichVu) {
    setDefaultService(dichVu);
    navigate(`/tra-cuu/${dichVu}`);
  }

  return (
    <>
      {aboutUs.banners && (
        <img
          className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
          src={`${END_POINT}/public/${aboutUs.banners[0]}`}
          alt="banner"
        />
      )}
      <div
        className="custom-tab shadow-[#000000] container mx-auto text-xl "
        style={{ maxWidth: "1200px" }}
      >
        <Tabs
          activeKey={number}
          onChange={callback}
          centered
          size="large"
          tabPosition="top"
          type="line"
          className="p-3"
          tabBarStyle={{ color: "#fcd535" }}
        >
          <TabPane tab="Cước vận chuyển" key="cuoc-van-chuyen">
            <CuocVanChuyen />
          </TabPane>
          <TabPane tab="Bưu cục gần đây" key="buu-cuc">
            <BuuCuc />
          </TabPane>
          <TabPane tab="Vận đơn" key="van-don">
            <VanDon />
          </TabPane>
          <TabPane tab="Bảng giá" key="bang-gia">
            <BangGia />
          </TabPane>
          <TabPane tab="Hàng cấm gửi" key="hang-cam-gui">
            <HangCamGui />
          </TabPane>
        </Tabs>
      </div>
      <Outlet />
    </>
  );
}
