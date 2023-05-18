import logoJT from "../assets/icons/logo-business.png";
import appStore from "../assets/images/appStore.png";
import ggPlay from "../assets/images/ggPlay.png";
import zaloIcon from "../assets/icons/icons-zalo.svg";
import axios from "axios";
import { END_POINT } from "../utils/constant";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaYoutubeSquare,
} from "react-icons/fa";
import {
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../context/MainContext";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { contactUs } = useContext(MainContext);
  const [services, setServices] = useState([]);
  useEffect(() => {
    const getService = async () => {
      const res = await axios.get(`${END_POINT}/service`);
      console.log(res);
      const { data } = res.data;
      console.log(data.service);
      setServices(data.service);
    };
    getService();
  }, []);
  const {t} = useTranslation('Footer')
  return (
    <footer className="bg-[#e0e3e7]">
      <div className=" grid grid-cols-1 gap-x-[70px] lg:grid-cols-3 pt-[35px] mx-auto px-4 lg:px-0 container ">
        <div className="leading-6 ">
          <img src={logoJT} className="h-[80px]" alt="logo-JnT" />
          <h5 className="mb-4 font-extrabold">
            {t('CÔNG TY')} TIEN KIM THANH LOGISTICS
          </h5>
          <div className="text-[12px] mb-1 ">
            <p>
              {t('Giấy CNĐKKD')}: 0313617136 - {t('Ngày cấp')}: 13/01/2016, {t("đăng ký thay đổi lần 06 ngày")} 25/09/2018
            </p>
            <p>
              {t('Cơ Quan Cấp')}: {t('Phòng Đăng ký kinh doanh - Sở kế hoạch và đầu tư TP Hồ Chí Minh')}
            </p>
          </div>
          <img src="https://jtexpress.vn/themes/jtexpress/assets/images/icon-bct.png" />
        </div>
        <div>
          <h5 className="font-extrabold mb-1">{t('TRUY CẬP NHANH')}</h5>
          <div className="w-full h-[2px] bg-slate-400 mb-4 relative">
            <div className="w-2/5 h-full bg-[#f0b90c] absolute"></div>
          </div>
          <div className="flex text-[12px] justify-around">
            <div className="mr-2">
              <div className="mb-2">
                <p className="mb-[4px] font-bold">
                  {t('Trung tâm chăm sóc khách hàng')}
                </p>
                <Link to="/tu-van/lien-he" className="block mb-1">
                  {t('Liên hệ với chúng tôi')}
                </Link>
                <Link to="/tu-van/dang-ki-tu-van" className="block mb-1">
                  {t('Đăng ký tư vấn')}
                </Link>
              </div>
              <div className="mb-2">
                <p className="mb-[4px] font-bold">{t('Tuyển dụng')}</p>
                <Link to="/tuyen-dung" className="block mb-1">
                  {t('Cơ hội nghề nghiệp')}
                </Link>
                <Link to="/cuoc-song" className="block mb-1">
                  {t('Cuộc sống TKT Express')}
                </Link>
              </div>
              <div className="mb-2">
                <p className="mb-[4px] font-bold">{t('Thông tin công ty')}</p>
                <Link to="/ve-chung-toi#cau-chuyen" className="block mb-1">
                  {t('Câu chuyện thương hiệu')}
                </Link>
                <Link to="/ve-chung-toi#tam-nhin" className="block mb-1">
                  {t('Tầm nhìn và giá trị cốt lõi')}
                </Link>
                <Link to="/ve-chung-toi#lich-su" className="block mb-1">
                  {t('Lịch sử phát triển')}
                </Link>
                <Link to="/ve-chung-toi#mang-luoi" className="block">
                  {t('Mạng lưới và quy mô')}
                </Link>
              </div>
            </div>

            <div className="">
              <div className="mb-2">
                <p className="mb-[4px] font-bold">Tra cứu</p>
                <Link to="/tra-cuu/cuoc-van-chuyen" className="block mb-1">
                  {t('Cước vận chuyển')}
                </Link>
                <Link to="/tra-cuu/buu-cuc" className="block mb-1">
                  {t("Bưu cục gần đây")}
                </Link>
                <Link to="/tra-cuu/van-don" className="block mb-1">
                  {t('Vận đơn')}
                </Link>
                <Link to="/tra-cuu/bang-gia" className="block mb-1">
                  {t('Bảng giá')}
                </Link>
                <Link to="/tra-cuu/hang-cam-gui" className="block mb-1">
                  {t('Hàng cấm gửi')}
                </Link>
              </div>
              <div className="mb-2">
                <p className="mb-[4px] font-bold">Dịch Vụ</p>
                {services?.map((service) => (
                  <Link
                    to={`dich-vu/${service.name}`.toLowerCase()}
                    className="block mb-1"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>
          <h5 className="font-extrabold mb-1 ">{t('THÔNG TIN LIÊN HỆ')}</h5>
          <div className="w-full h-[2px] bg-slate-400 mb-4 relative">
            <div className="w-1/2 h-full bg-[#f0b90c] absolute"></div>
          </div>
          <div className="flex mb-3">
            <IoMailOutline />
            <span className="ml-2 text-[12px]">{contactUs.email}</span>
          </div>
          <div className="flex mb-3">
            <IoCallOutline />
            <span className="ml-2 text-[12px]">{contactUs.phone}</span>
          </div>
          <div className="flex mb-5">
            <IoLocationOutline />
            <span className="ml-2 text-[12px]">{contactUs.address}</span>
          </div>
          <h5 className="font-extrabold mb-1 ">{t('TẢI ỨNG DỤNG')}</h5>
          <div className="w-full h-[2px] bg-slate-400 mb-4 relative">
            <div className="w-1/2 h-full bg-[#f0b90c] absolute "></div>
          </div>
          <div className="flex">
            <img
              className="w-20 "
              src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=https://jtexpress.vn/download&choe=UTF-8"
            />
            <div className="ml-6">
              <a href="https://apps.apple.com/us/app/j-t-vnm-vip/id1474072185">
                <img src={appStore} alt="appStore-logo" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.msd.VIPyueNanClient&hl=vi&gl=US">
                <img src={ggPlay} alt="ggPlay-logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[2px] bg-slate-400 w-3/5 mt-7 mb-7 mx-auto"></div>
      <div className="flex justify-center pb-4">
        <a href={contactUs.facebook} target="_blank">
          <FaFacebook className="mx-2 w-6 h-6" />
        </a>
        <a href={contactUs.instagram} target="_blank">
          <FaInstagram className="mx-2 w-6 h-6" />
        </a>
        <a href={contactUs.tiktok} target="_blank">
          <FaTiktok className="mx-2 w-6 h-6" />
        </a>
        <a href={contactUs.youtube} target="_blank">
          <FaYoutubeSquare className="mx-2 w-6 h-6" />
        </a>
        <a href="https://oa.zalo.me/1837464433417511317" target="_blank">
          <img src={zaloIcon} className="mx-2 w-6 " alt="zalo-icon"></img>
        </a>
      </div>
      <div className="flex justify-center items-center text-center flex-col lg:flex-row text-xs lg:text-sm pb-6">
        <a href="/">
          <span>{t("Chính sách bảo mật")}</span>
        </a>
        <span className="hidden mx-1 lg:block ">|</span>
        <span className="">
          Copyright © 2022 J&T Express. All rights reserved
        </span>
      </div>
    </footer>
  );
};
export default Footer;
