import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import bannerService from "../../assets/images/banner-TKT dich vu.png";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import bannerExpress from "../../assets/images/bannerexpress.png";
import bannerFast from "../../assets/images/bannerfast.png";
import bannerSuper from "../../assets/images/bannersuper.png";
import bannerFresh from "../../assets/images/bannerfresh.jpg";
export default function Service() {
  const { setMetadata } = useContext(MainContext);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Dịch vụ | TKTL",
      };
    });
  }, []);
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

  return (
    <div className="overflow-hidden">
      <section>
        <div className="relative sm:h-full  md:h-[650px] lg:h-[700px] w-full">
          <img
            className="w-full h-full opacity-90 object-cover"
            src={bannerService}
            alt=""
          />
        </div>
        <div className="mx-3 mt-2 absolute top-[50%] sm:top-[30%] sm:translate-y-[-30%] left-[50%] translate-x-[-50%] w-[60%] text-center">
          <h1 className="text-[30px] mb-[12px] font-black text-[#f0b90c]">
            Tổng quan dịch vụ
          </h1>
          <span className="  text-base md:text-lg text-justify w-full text-[#fff] text-[16px]">
            Sở hữu những ưu điểm vượt trội so với các dịch vụ chuyển phát nhanh
            hiện có trên thị trường, TKT Express thấu hiểu mọi nhu cầu và mang
            đến cho khách hàng 5 dịch vụ với những tiện ích đặc biệt nhất.
          </span>
        </div>
      </section>
      <section className="relative">
        <div>
          <img src={bannerExpress} alt="express"></img>
        </div>
        <div class="flex items-center absolute bottom-[4%] md:left-[5%] sm:right-[10%]">
          <a href="https://jtexpress.vn/en/tracking?type=price-list#price-list-href">
            <button class="bg-[#f0b90c] rounded-[2px] Montserrat-Bold text-white md:w-[180px] md:h-[56px] sm:w-[120px] sm:h-[40px] mr-2 flex items-center justify-center">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/list_book_icon.png"
                alt="J&amp;T Express Việt Nam - Các dịch vụ của J&amp;T Express"
              />
              <span class="ml-2">Bảng giá</span>
            </button>
          </a>
          <a href="https://jtexpress.vn/en/standard-service" target="_blank">
            <button class="rounded-2 border border-[#f0b90c] Montserrat-Bold md:w-[180px] md:h-[56px] sm:w-[120px] sm:h-[40px] text-[#f0b90c] ml-2 z-[10000]">
              Xem chi tiết
            </button>
          </a>
        </div>
      </section>
      <section className="relative">
        <div>
          <img src={bannerFast} alt="express"></img>
        </div>
        <div class="flex items-center absolute md:top-[20%] md:left-[5%] sm:bottom-[5%] sm:right-[10%]">
          <a href="https://jtexpress.vn/en/tracking?type=price-list#price-list-href">
            <button class="bg-[#f0b90c] rounded-[2px] Montserrat-Bold text-white md:w-[180px] md:h-[56px] sm:w-[120px] sm:h-[40px] mr-2 flex items-center justify-center">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/list_book_icon.png"
                alt="J&amp;T Express Việt Nam - Các dịch vụ của J&amp;T Express"
              />
              <span class="ml-2">Bảng giá</span>
            </button>
          </a>
          <a href="https://jtexpress.vn/en/standard-service" target="_blank">
            <button class="rounded-2 border border-[#f0b90c] Montserrat-Bold md:w-[180px] md:h-[56px] sm:w-[120px] sm:h-[40px] md:text-[#fff] sm:text-[#ff0000] ml-2 z-[10000]">
              Xem chi tiết
            </button>
          </a>
        </div>
      </section>
      <section className="relative">
        <div>
          <img src={bannerSuper} alt="express"></img>
        </div>
        <div class="flex items-center absolute top-[65%] left-[5%]">
          <a href="https://jtexpress.vn/en/tracking?type=price-list#price-list-href">
            <button class="bg-[#f0b90c] rounded-[2px] Montserrat-Bold text-white md:w-[180px] md:h-[56px] sm:w-[120px] sm:h-[40px] mr-2 flex items-center justify-center">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/list_book_icon.png"
                alt="J&amp;T Express Việt Nam - Các dịch vụ của J&amp;T Express"
              />
              <span class="ml-2">Bảng giá</span>
            </button>
          </a>
          <a href="https://jtexpress.vn/en/standard-service" target="_blank">
            <button class="rounded-2 border border-[#f0b90c] Montserrat-Bold md:w-[180px] md:h-[56px] sm:w-[120px] sm:h-[40px] md:text-[#f0b90c] sm:text-[#f0b90c] ml-2 z-[10000]">
              Xem chi tiết
            </button>
          </a>
        </div>
      </section>
      <section className="relative">
        <div>
          <img src={bannerFresh} alt="express"></img>
        </div>
        <div class="flex items-center absolute top-[60%] left-[5%]">
          <a href="https://jtexpress.vn/en/tracking?type=price-list#price-list-href">
            <button class="bg-[#f0b90c] rounded-[2px] Montserrat-Bold text-white md:w-[180px] md:h-[56px] sm:w-[120px] sm:h-[40px] mr-2 flex items-center justify-center">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/list_book_icon.png"
                alt="J&amp;T Express Việt Nam - Các dịch vụ của J&amp;T Express"
              />
              <span class="ml-2">Bảng giá</span>
            </button>
          </a>
          <a href="https://jtexpress.vn/en/standard-service" target="_blank">
            <button class="rounded-2 border border-[#f0b90c] Montserrat-Bold md:w-[180px] md:h-[56px] sm:w-[120px] sm:h-[40px] text-[#f0b90c] ml-2 z-[10000]">
              Xem chi tiết
            </button>
          </a>
        </div>
      </section>
      <div class="set-height-sec-7 overflow-hidden">
        <div class="relative h-full w-full">
          <img
            class="w-full max-h-[180px] object-fill"
            src="https://jtexpress.vn/themes/jtexpress/assets/images/bg-download-appnew.png"
            alt="J&amp;T Express Việt Nam - Các dịch vụ của J&amp;T Express"
          />
          <div class="absolute left-0 top-0 w-full h-full">
            <div class="flex items-center h-full">
              <div class="z-10 container h-full mx-auto flex items-center justify-between gap-x-[22px]">
                <div class="text-[#FFFFFF] flex flex-col items-center text-center flex-1">
                  <div class="text-[16px] mb-[50px] sm:mb-[5px] lg:mb-4 flex flex-row items-end md:gap-x-[71px] sm:gap-x-[15px]">
                    <div>
                      <div class="flex flex-col justify-start text-left">
                        <div class="md:text-[30px] w-full my1920:text-[42px] sm:text-[20px] Montserrat-Bold my1920:w-[376px]">
                          Tải ứng dụng J&amp;T Express
                        </div>
                        <div class="flex flex-col">
                          <span class="block md:text-[16px] sm:text-[12px]">
                            Tải ngay App J&T Express - Giao Hàng Nhanh
                          </span>
                          <span class="block md:text-[16px] sm:text-[12px]">
                            Hưởng trọn bộ tính năng giao hàng chỉ với 1 chạm
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="flex items-center gap-x-[23px]">
                      <div class="flex flex-col items-center gap-y-[11px]">
                        <a
                          class="w-[134px] h-[40px] my1920:w-[198px] my1920:h-[57px]"
                          href="https://apps.apple.com/us/app/j-t-vnm-vip/id1474072185"
                          target="_blank"
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="https://jtexpress.vn/storage/app/uploads/public/627/5ca/259/6275ca259876b348340439.png"
                            alt="store-apple"
                          />
                        </a>
                        <a
                          class="w-[134px] h-[40px] my1920:w-[198px] my1920:h-[57px]"
                          href="https://play.google.com/store/apps/details?id=com.msd.VIPyueNanClient&amp;hl=vi&amp;gl=US"
                          target="_blank"
                        >
                          <img
                            class="w-full h-full object-cover"
                            src="https://jtexpress.vn/storage/app/uploads/public/627/5ca/bd7/6275cabd7222d202962202.png"
                            alt="ch-play"
                          />
                        </a>
                      </div>
                      <img
                        src="https://chart.googleapis.com/chart?chs=500x500&amp;cht=qr&amp;chl=https://jtexpress.vn/en/download&amp;choe=UTF-8"
                        title="Link to Download"
                        class="h-[86px] rounded-[5px]-[86px] my1920:h-[129px] my1920:w-[129px]"
                        alt="J&amp;T Express Việt Nam - Các dịch vụ của J&amp;T Express"
                      />
                    </div>
                  </div>
                </div>
                <div class="overflow-hidden flex items-end h-full">
                  <img
                    class="h-[172px] my1920:h-[262px]"
                    src="https://jtexpress.vn/themes/jtexpress/assets/images/img-in-sec-footer.png"
                    alt="J&amp;T Express Việt Nam - Các dịch vụ của J&amp;T Express"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {services?.map((service) => (
        <section>
          <div className="h-full sm:h-[500px] md:h-[620px] lg:h-[700px] w-full  pt-10">
            <img
              className=" w-full h-full object-cover "
              src={`${END_POINT}/public/${service?.banner}`}
              alt="#"
            />
          </div>
          <div className="text-left md:mx-7 mx-3 mt-2 ">
            <h1 className="text-[30px] mb-[12px] font-bold text-[#f0b90c]">
              {service?.sub_detail}
            </h1>
            <span className=" text-[20px] text-justify">
              <span className="inline-block mt-4 mb-10 ">
                <p>{service?.target}</p>
              </span>
            </span>
          </div>
        </section>
      ))} */}

      {/* <section className="mt-5">
        <div className="relative overflow-hidden w-full h-[414px]">
          <img
            className="  w-full h-full object-cover "
            src="https://jtexpress.vn/themes/jtexpress/assets/images/sec7inservice.png"
            alt=""
          />
          <img
            className="  object-cover w-full md:w-auto h-full z-10 absolute bottom-[-10px] left-[50%] translate-x-[-50%]"
            src="https://jtexpress.vn/themes/jtexpress/assets/images/insec7service.png"
            alt=""
          />
        </div>
        <div className="md:mx-44 sm:mx-36 mx-12 mt-2">
          <div className="text-center ">
            <h1 className="text-[28px] mb-[8px] font-bold text-[#f0b90c]">
              Tải ứng dụng TKTL
            </h1>
            <span className="  text-base md:text-lg text-justify">
              Tải ngay App TKTL - Giao Hàng Nhanh. Hưởng trọn bộ tính
              năng giao hàng chỉ với 1 chạm
            </span>
          </div>
          <div className="flex items-center flex-col mt-5 ">
            <div className="flex flex-row items-center ">
              <Link
                className="w-[134px] h-[40px] my1920:w-[198px] my1920:h-[57px] mr-4"
                to="https://apps.apple.com/us/app/j-t-vnm-vip/id1474072185"
              >
                {" "}
                <img
                  className="w-full h-full object-cover"
                  src="https://jtexpress.vn/storage/app/uploads/public/627/5ca/259/6275ca259876b348340439.png"
                  alt=""
                />
              </Link>
              <Link
                className="w-[134px] h-[40px] my1920:w-[198px] my1920:h-[57px]"
                to="https://play.google.com/store/apps/details?id=com.msd.VIPyueNanClient&hl=vi&gl=US"
              >
                <img
                  className="w-full h-full object-cover"
                  src="https://jtexpress.vn/storage/app/uploads/public/627/5ca/bd7/6275cabd7222d202962202.png"
                  alt="ch-play"
                />
              </Link>
            </div>
            <div className="flex items-center flex-col">
              <img
                src="https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=https://jtexpress.vn/vi/download&choe=UTF-8"
                title="Link to Download"
                className="h-[150px] w-[150px]"
                alt=""
              />
              <p className="font-bold text-base">QUÉT MÃ ĐỂ DOWNLOAD</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
