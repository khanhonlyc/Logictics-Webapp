import { useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import footBanner from "../../assets/images/footer.png";
import vietnam from "../../assets/images/vietnamwhite.png";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";
import { useTranslation } from "react-i18next";

function About() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const location = useLocation();

  const [check, setCheck] = useState(false);

  const { setMetadata, aboutUs, fetchAboutUs } = useContext(MainContext);

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Về chúng tôi | TKTL",
      };
    });

    fetchAboutUs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMetadata]);

  useEffect(() => {
    if (ref4 !== null) {
      setCheck(true);
    }
  }, [ref4]);

  useEffect(() => {
    if (check === true) {
      setTimeout(() => {
        const handleScrollToTitle = (ref) => {
          ref.current.scrollIntoView({ behavior: "smooth" });
        };
        if (location.hash === "#mang-luoi") {
          handleScrollToTitle(ref4);
        }
        if (location.hash === "#lich-su") {
          handleScrollToTitle(ref3);
        }
        if (location.hash === "#tam-nhin") {
          handleScrollToTitle(ref2);
        }
        if (location.hash === "#cau-chuyen") {
          handleScrollToTitle(ref1);
        }
      }, 1000);
    } else return;
  });
  const {t} = useTranslation('About')
  return (
    <div className="mx-auto">
      {aboutUs.banners && (
        <img
          src={`${END_POINT}/public/${aboutUs.banners[0]}`}
          alt="banner"
          className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
        />
      )}
      <div
        ref={ref1}
        className="flex flex-col xl:flex-row justify-between  container mx-auto my-4"
      >
        <div className="max-w-md">
          <span className="block text-2xl text-center font-black my-6 py-4 lg:text-6xl lg:text-left">
            Tien Kim Thanh Logistics
          </span>
          <div className="text-justify w-full xl:w-[525px] border-4 border-border_color p-8 text-base rounded-2xl lg:bg-yellow-100 opacity-95">
            <span className="whitespace-pre-line">{aboutUs.description}</span>
            <div className="w-20 h-[2px] bg-[#f0b90c] mt-8"></div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-around mt-36 gap-8 font-extrabold ">
          <div className="flex flex-col items-center text-center px-3 gap-y-3 ">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/1000xe.png"
              alt="vehicle-pic"
              className="shadow-xl rounded-full"
            />
            <span className="text-3xl text-primary">850+</span>
            <span
              x-data="{ show: false }"
              x-show="show"
              x-init="setTimeout(() => show = true, 3000)"
            ></span>
            <span className="text-xl uppercase">{t('phương tiện')}</span>
          </div>
          <div className="flex flex-col items-center text-center px-3 gap-y-3">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/25000nhan-vien.png"
              alt="staff-pic"
              className="shadow-xl rounded-full"
            />
            <span className="text-3xl text-[#F0B90B]">19.000+</span>
            <span
              x-data="{ show: false }"
              x-show="show"
              x-init="setTimeout(() => show = true, 3000)"
            ></span>
            <span className="text-xl uppercase">{t('nhân viên')}</span>
          </div>
          <div className="flex flex-col items-center text-center px-3 gap-y-3">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/1900bu-cuc.png"
              alt="office-pic"
              className="shadow-xl rounded-full"
            />
            <span className="text-3xl text-[#F0B90B]">1.900</span>
            <span
              x-data="{ show: false }"
              x-show="show"
              x-init="setTimeout(() => show = true, 3000)"
            ></span>
            <span className="text-xl uppercase">{t('bưu cục')}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 container px-3 lg:px-0 mx-auto">
        <div className="flex flex-col gap-y-6 xl:order-2">
          <span ref={ref2} className="text-2xl font-black uppercase">
            {t('Tầm nhìn')}
          </span>
          <span className="text-base">{aboutUs.vision}</span>
          <div className="w-20 h-[2px] bg-[#F0B90B]"></div>
          <span className="text-2xl font-black uppercase">{t('Giá trị cốt lõi')}</span>
          <span className="text-base whitespace-pre-line ">
            {aboutUs.values}
          </span>
        </div>
        <div className="lg:w-[525px] mx-auto xl:order-1">
          {aboutUs.banners && (
            <img
              src={`${END_POINT}/public/${aboutUs.logo}`}
              className=" w-full h-full  object-cover"
              alt="logo"
            />
          )}
        </div>
      </div>

      <div ref={ref3} className=" mx-auto my-10">
        <div className="w-auto flex flex-col xl:flex-row justify-center gap-x-20 rounded-lg bg-amber-100 py-12">
          <div className="xl:max-w-[400px]">
            <div className="text-3xl xl:text-5xl text-center xl:text-left font-black my-4 text-[#F0B90B] ">
              {t('LỊCH SỬ')}
            </div>
            <div className="p-8 mb-2 border-[3px] border-border_color rounded-2xl bg-yellow-200 shadow-2xl opacity-95">
              <span className="text-base font-semibold text-justify">
                {t('Lịch sử của TKTL')}.
              </span>
            </div>
          </div>
          <div className="relative my-4 flex items-center">
            <img
              src={vietnam}
              className="w-full h-full object-contain"
              alt="vietnam"
            />
            <div className="absolute top-0 flex flex-col h-full w-full justify-between">
              <div className="flex items-start w-full sm:pl-20 ">
                <div className="flex flex-col px-5 py-1 items-center bg-yellow-500  border-white border-2 bg-opacity-50 text-center rounded-xl translate-x-5 xl:translate-x-0 sm:translate-y-5 xl:translate-y-0">
                  <span className="uppercase font-bold tracking-widest">
                    {t('Hà Nội')}
                  </span>
                  <span>02/2022</span>
                </div>
              </div>

              <div className="flex justify-end w-full sm:-translate-y-20">
                <div className="flex flex-col px-5 py-1 items-center  bg-yellow-500 border-white border-2 bg-opacity-50 text-center rounded-xl">
                  <span className="uppercase font-bold tracking-widest">
                    {t('Đà Nẵng')}
                  </span>
                  <span>02/2022</span>
                </div>
              </div>
              <div className="flex justify-end sm:-translate-y-20">
                <div className="flex flex-col px-5 py-1 items-center bg-yellow-500 border-white border-2 bg-opacity-50 text-center rounded-xl">
                  <span className="uppercase font-bold tracking-widest">
                    {t('Hồ Chí Minh')}
                  </span>
                  <span>02/2022</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full lg:px-0  mt-16">
        <div className="flex flex-col mx-auto justify-center items-center gap-y-0 lg:gap-y-8 px-4 container w-full">
          <span
            ref={ref4}
            className="text-2xl lg:text-4xl font-black text-center uppercase text-[#F0B90B]"
          >
            {t('Mạng lưới phủ sóng')}
          </span>
          <span className=" lg:text-base text-justify lg:w-4/5 p-3 shadow-2xl rounded-xl border-[3px] bg-yellow-200 border-border_color tracking-wide">
            {t('Mạng lưới phủ sóng của TKTL')}.
          </span>
        </div>
        <img
          src={footBanner}
          className="w-full h-auto object-cover pt-5"
          alt="footer-banner"
        />
      </div>
    </div>
  );
}

export default About;
