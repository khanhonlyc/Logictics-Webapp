import { useState, useEffect, useContext } from "react";
import { Carousel, Tabs, Select } from "antd";
import { Link } from "react-router-dom";
import appStore from "../../assets/images/appStore.png";
import ggPlay from "../../assets/images/ggPlay.png";
import { getDistrictsByProvinceCode, getProvinces } from "sub-vn";
import { Fade, Zoom } from "react-reveal";
import { MainContext } from "../../context/MainContext";
import { data } from "autoprefixer";
import { END_POINT } from "../../utils/constant";
import axios from "axios";
import { useTranslation } from "react-i18next";

const { TabPane } = Tabs;
const { Option } = Select;

const Home = () => {
  const [listProvinces, setListProvince] = useState([]);
  const [listDistricts, setListDistricts] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [services, setServices] = useState([]);
  const [partners, setPartners] = useState([]);
  const [person, setPerson] = useState({});
  const [keyOrder, setKeyOrder] = useState("");
  const { setMetadata, dataWarehouse, setDataWarehouse, order, setOrder, aboutUs, fetchAboutUs } =
    useContext(MainContext);

  const fetchQuotes = async () => {
    try {
      const res = await axios.get(`${END_POINT}/quote?limit=10`);
      if (res.status === 200) {
        setQuotes(res.data.data);
        res.data.data.length > 0 && setPerson(res.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPartner = async () => {
    try {
      const res = await axios.get(`${END_POINT}/partner`);
      if (res.status === 200) {
        setPartners(res.data.data.partners);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchDeliveryService = async () => {
    try {
      const res = await axios.get(`${END_POINT}/service`);
      if (res.status === 200) return setServices(res.data.data.service);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Trang chủ | TKTL",
      };
    });
    const dataProvinces = getProvinces();
    setListProvince(dataProvinces);
    const provinceCode = dataProvinces.find(
      (province) => province.name === dataWarehouse.province
    )?.code;
    const dataDistricts = getDistrictsByProvinceCode(provinceCode);
    setListDistricts(dataDistricts);

    fetchQuotes();
    fetchPartner();
    fetchDeliveryService()
    fetchAboutUs()
  }, []);

  const handleSelectProvince = (provinceSelected) => {
    const provinceCode = listProvinces.find(
      (province) => province.name === provinceSelected
    )?.code;
    const dataDistricts = getDistrictsByProvinceCode(provinceCode);
    setDataWarehouse({
      province: provinceSelected,
      district: null,
    });
    setListDistricts(dataDistricts);
  };
  const handleSelectDistrict = (districtSelected) => {
    // setCurrentDistrict(districtSelected);
    setDataWarehouse({
      ...dataWarehouse,
      district: districtSelected,
    });
  };
  const showPerson = (id) => {
    const person = quotes.find((quote) => quote._id === id);
    setPerson(person);
  };
  const {t} = useTranslation("Main")
  return (
    <div className="pb-4">
      <Carousel autoplay autoplaySpeed={1500} effect="fade">
        {aboutUs.banners && aboutUs.banners.map((banner, key) => (
          <div key={key}>
            <img
              src={`${END_POINT}/public/${banner}`}
              className="w-full h-[200px] md:h-[300px] lg:h-[550px] object-cover"
              alt="banner"
            />
          </div>
        ))}
      </Carousel>

      <div className="container flex items-center justify-center mx-auto w-full py-4 ">
        <Tabs
          defaultActiveKey="vận đơn"
          type="card"
          className="w-full shadow-xl p-3 rounded-xl "
        >
          <TabPane
            tab={
              <div className="text-lg h-[30px] text-[#fcd535]">
                {t('Tra cứu đơn hàng')}
              </div>
            }
            key="vận đơn"
          >
            <div>
              <form className="flex flex-col lg:flex-row ">
                <input
                  value={keyOrder}
                  onChange={(e) => setKeyOrder(e.target.value)}
                  className="border border-gray-300 text-[#F0B90B] text-sm rounded focus:ring-yellow-500 focus:border-yellow-500 block w-full p-3 mb-2 lg:mb-0   "
                  placeholder={t("Nhập mã vận đơn của bạn (cách nhau bới dấu phẩy), tối đa 10 vận đơn")}
                ></input>
                <Link
                  to="tra-cuu/van-don"
                  className="text-white bg-yellow-500 hover:bg-yellow-400 focus:ring-4  focus:ring-red-500 font-medium rounded-lg text-lg w-full lg:w-44 lg:ml-2 px-5 py-2.5 text-center "
                  onClick={(e) => {
                    if (keyOrder !== "" && keyOrder !== null) {
                      setOrder(keyOrder);
                    } else {
                      e.preventDefault();
                      alert("Vui lòng điền đầy đủ thông tin");
                    }
                  }}
                >
                  {t("Tìm kiếm")}
                </Link>
              </form>
            </div>
          </TabPane>
          <TabPane
            tab={
              <div className="text-lg h-[30px] text-[#fcd535]">
                {t("Tra cứu bưu cục")}
              </div>
            }
            key="2"
          >
            <form className="flex flex-col items-center lg:flex-row gap-y-3">
              <Select
                showSearch
                allowClear
                className="w-full lg:w-2/5"
                placeholder="Tỉnh/Thành Phố"
                onClear={() => {
                  setDataWarehouse({
                    province: null,
                    district: null,
                  });
                  setListDistricts([]);
                }}
                value={dataWarehouse.province}
                onChange={(value) => handleSelectProvince(value)}
              >
                {listProvinces.map((city) => (
                  <Option key={city.code} value={city.name}>
                    {city.name}
                  </Option>
                ))}
              </Select>
              <Select
                showSearch
                allowClear
                className="w-full lg:w-2/5"
                placeholder="Quận/Huyện"
                onSelect={(value) => handleSelectDistrict(value)}
                value={dataWarehouse.district}
                onClear={() =>
                  setDataWarehouse({
                    ...dataWarehouse,
                    district: null,
                  })
                }
              >
                {listDistricts.map((distr) => (
                  <Option key={distr.code} value={distr.name}>
                    {distr.name}
                  </Option>
                ))}
              </Select>
              <Link
                to="tra-cuu/buu-cuc"
                className="inline-block h-full w-full text-white  bg-yellow-500 hover:bg-yellow-400 focus:ring-2  focus:ring-red-500 font-medium rounded-lg text-lg lg:w-44 lg:ml-2 px-5 py-2.5 text-center"
              >
                {t("Tìm kiếm")}
              </Link>
            </form>
          </TabPane>
          <TabPane
            tab={
              <Link
                to="tra-cuu/bang-gia"
                className="text-lg h-[30px] text-[#fcd535]"
              >
                {t("Bảng giá")}
              </Link>
            }
            key="bảng giá"
          ></TabPane>
        </Tabs>
      </div>

      {/* Test searching */}

      {/* <div className=" container mt-4 grid grid-cols-1 lg:grid-cols-2 mx-auto gap-y-3 gap-x-6">
        {warehouses.map((warehouse, key) => (
          <div
            key={key}
            className="flex flex-col bg-[#FFFF00] bg-opacity-70 p-4 rounded-xl gap-y-2"
          >
            <div className="flex flex-row justify-between">
              <span className="text-xl font-extrabold text-red-700">{warehouse.name}</span>
              <a
                href={"https://www.google.com/maps?q=" + warehouse?.lon + warehouse?.lat}
                target="_blank"
                className="flex items-center text-red-600"
              >
                <FiMap className="w-4 h-4 inline-block mr-2" />
                <span className=" text-lg text-inherit font-semibold">Tìm đường đi</span>
              </a>
            </div>
            <div className="flex items-stretch">
              <IoLocationOutline className="w-4 h-4 inline-block mr-2" />
              <span className="font-semibold">{warehouse.street}</span>
            </div>
          </div>
        ))}
      </div> */}
      {/* Test searching */}

      <div className="flex flex-col justify-center items-center py-4 mt-6">
        <span className="uppercase text-xl font-black">
          {t("mạng lưới phủ sóng hầu hết các tỉnh thành Việt Nam")}
        </span>
        <span className="text-sm">
          {t("Tien Kim Thanh Logistics tự hào đã & đang mở rộng mạng lưới trên khắp đất nước, mang trong mình sứ mệnh vươn ra tầm cỡ thế giới")} 
        </span>
      </div>
      {/*  <div className="flex flex-col justify-center items-center m-6 text-red-500">
        <img src="" alt="#" />
      </div> */}

      {/* <Fade bottom duration={1500}>
        <div className="grid grid-cols-3 text-white text-center gap-y-12 mb-9">
          {flags.map((flag, key) => (
            <div
              className="relative flex flex-col justify-start items-center"
              key={key}
            >
              <img
                src={flag.url}
                alt={flag.name}
                className="peer w-12 h-12 shadow-md rounded-full  "
              />
              <span className="hidden lg:peer-hover:block  absolute top-14 px-5 py-1 rounded-md bg-slate-800">
                {flag.name}
              </span>
            </div>
          ))}
        </div>
      </Fade> */}

      <div className="flex flex-col lg:flex-row ">
        <div className="flex flex-col items-center justify-center text-justify gap-y-7 w-full lg:max-w-[500px] py-6 px-3 bg-[#F0B90B] lg:rounded-r-xl">
          <Fade left duration={1500}>
            <span className="text-4xl font-black container text-white px-4 lg:px-6">
              {t("VỀ CHÚNG TÔI")}
            </span>
            <span className=" text-base container tracking-wide px-4 lg:px-6 w-full">
              {aboutUs.description}
            </span>
          </Fade>
        </div>
        <div className="grid grid-cols-2 mx-auto gap-y-2 px-6 bg-yellow-100 lg:rounded-l-2xl w-full">
          <Fade right duration={2000}>
            <div className="flex flex-col items-center text-center py-4">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/63tinh-thanh.png"
                alt="63-tinh-thanh-pic"
              />
              <span className="text-xl font-extrabold">{t("63 TỈNH THÀNH")}</span>
              <span>{t("Dịch vụ phủ sóng khắp 63 tỉnh thành")}</span>
            </div>
            <div className="flex flex-col items-center text-center py-4">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/1000xe.png"
                alt="vehicle-pic"
              />
              <span className="text-xl font-extrabold">{t("850 PHƯƠNG TIỆN")}</span>
              <span>{t("Sở hữu 850 xe tải vận chuyển hàng hóa")}</span>
            </div>
            <div className="flex flex-col items-center text-center py-4">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/25000nhan-vien.png"
                alt="staff-pic"
              />
              <span className="text-xl font-extrabold">{t("19.000+ NHÂN VIÊN")}</span>
              <span>
                {t("Hơn 19.000 nhân viên đang làm việc khắp các tỉnh thành")}
              </span>
            </div>
            <div className="flex flex-col items-center text-center py-4">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/1900bu-cuc.png"
                alt="office-pic"
              />
              <span className="text-xl font-extrabold">{t("1.900 BƯU CỤC")}</span>
              <span>{t("Hơn 1.900 bưu cục hoạt động trên toàn quốc")}</span>
            </div>
          </Fade>
        </div>
      </div>
      <div className="hidden lg:flex flex-row flex-wrap justify-around items-center container mx-auto my-12 ">
        {services.length > 0 && services.map((service) => (
          <Link to={(`dich-vu/${service.name}`).toLowerCase()} key={service.name}>
            <div className="group shadow-2xl h-[70px]">
              <img
                src={`${END_POINT}/public/${service.logo}`}
                alt={service.name}
                className="group-hover:scale-110 duration-500 w-[174px] h-full"
              />
            </div>
            <div className="pt-4 flex flex-col">
              <span className="text-xl font-bold uppercase">
                {service.sub_detail}
              </span>
              <span className="text-base">{service.name}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* <div className="flex items-center justify-center my-6 container mx-auto">
        <Zoom duration={1000}>
          <iframe
            width="731"
            height="411"
            src="https://www.youtube.com/embed/99RCEdAP_yk"
            title="J&T Express tự hào ra mắt Trung tâm trung chuyển lớn nhất Việt Nam"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Zoom>
      </div> */}
      {/* <div className="relative h-[670px] lg:h-[462px]">
        <img
          src="https://jtexpress.vn/themes/jtexpress/assets/images/bg-download-appnew.png"
          alt=""
          className=" h-full w-full object-cover"
        />
        <div className="absolute bottom-0 flex flex-col lg:flex-row justify-around items-center gap-y-3 w-full ">
          <div className="flex flex-col text-center gap-y-5">
            <span className="text-white text-4xl font-black">TẢI ỨNG DỤNG</span>
            <span className="text-white  text-base font-bold mt-[-12px]">
              Tải ngay App J&T Express - Giao Hàng Nhanh
              <br />
              Hưởng trọn bộ tính năng giao hàng chỉ với 1 chạm
            </span>
            <div className="flex flex-row justify-around">
              <img src={appStore} alt="appstore" />
              <img src={ggPlay} alt="ggplay" />
            </div>
          </div>
          <div>
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/phone-at-home.png"
              alt=""
              className=""
            />
          </div>
        </div>
      </div> */}
      {quotes.length > 0 && (
        <div className="container mx-auto px-2 lg:px-0  my-10">
          <span className="block text-2xl sm:text-4xl lg:text-4xl font-black my-6 lg:my-0">
            {t("ĐỐI TÁC NÓI VỀ CHÚNG TÔI")}
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-[60%_35%] gap-x-10 mt-6">
            <div className="flex flex-col justify-center items-center bg-[#F0B90B] rounded ">
              <span className="px-10 text-base pt-10">
                Từ khi đặt chân vào Việt Nam năm 2018, J&T Express luôn nỗ lực
                hết mình, hoàn thành nghĩa vụ của một đối tác vận chuyển lớn
                trong khu vực, mang lại dịch vụ tốt nhất cho tất cả khách hàng,
                nhận về nhiều lời khen và nhận xét tích cực. Đây là sự tự hào và
                động lực để J&T Express tiếp tục giữ vững thành tích, phát huy
                dịch vụ, nâng cao hơn nữa trải nghiệm khách hàng.
              </span>

              <div className="w-full py-4 mt-4">
                <Carousel
                  autoplay
                  autoplaySpeed={2000}
                  focusOnSelect
                  draggable
                  slidesToShow={3}
                  arrows
                  // responsive={[]}
                  className=" overflow-hidden pb-10"
                >
                  {quotes.map((quote) => (
                    <div
                      className="flex flex-col items-center text-center"
                      key={quote._id}
                      onClick={() => showPerson(quote._id)}
                    >
                      <div className="w-[100px] h-[100px] sm:w-[134px] sm:h-[134px]">
                        <img
                          src={`${END_POINT}/public/${quote.avatar}`}
                          className="h-full w-full rounded-full object-cover"
                          alt={quote.name}
                        />
                      </div>
                      <span className="font-bold">{quote.name}</span>
                      <span className="px-2 ">{quote.description}</span>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
            <div className="bg-[#F0B90B] rounded-xl shadow-2xl lg:min-h-[450px] overflow-hidden">
              <div className="flex flex-col items-center py-4">
                <div className="w-[134px] h-[134px]">
                  {person.avatar !== undefined && (
                    <img
                      src={`${END_POINT}/public/${person.avatar}`}
                      className=" h-full w-full rounded-full object-cover"
                      alt=""
                    />
                  )}
                </div>
                <span className="text-xl font-bold pt-4">{person.name}</span>
                <span>{person.description}</span>

              </div>
              <div className="mx-3 sm:mx-10 lg:mx-0 h-full">
                <span className="py-6 line-clamp-6 text-justify bg-[#c19402] px-6 h-full text-base">
                  "
                  {person.quote}
                  "
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container m-auto">
        <Carousel
          autoplay
          autoplaySpeed={2000}
          draggable
          slidesToShow={5}
          dots={false}
          className="w-full"
        >
          {partners.length > 0 &&
            partners.map((partner) => (
              <img
                src={`${END_POINT}/public/${partner.logo}`}
                alt={partner.name}
                className="w-[186px] h-[100px] object-scale-down"
                key={partner._id}
              />
            ))}
        </Carousel>
      </div>
    </div>
  );
};
export default Home;
