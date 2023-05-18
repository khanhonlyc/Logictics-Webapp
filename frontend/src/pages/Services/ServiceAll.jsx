import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Carousel } from "antd";
import styled from "styled-components";
import { MainContext } from "../../context/MainContext";
import bannerExpress from "../../assets/images/bannerexpress.png";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
const CarouselWrapper = styled(Carousel)`
  > ul {
    margin-bottom: 30px;
  }
  > .slick-dots li button {
    width: 11px;
    height: 11px;
    border-radius: 100%;
  }
  > .slick-dots li.slick-active button {
    width: 11px;
    height: 11px;
    border-radius: 100%;
    background: #fc8080;
  }
`;
export default function ServiceAll() {
  const { setMetadata } = useContext(MainContext);
  const [quotes, setQuotes] = useState([]);
  const [services, setServices] = useState([]);
  const [features, setFeatures] = useState([]);
  const [participants, setParticipants] = useState([]);
  const params = useParams();

  // useEffect(() => {
  //   setMetadata((prev) => {
  //     return {
  //       ...prev,
  //       title: "Dịch vụ | TKTL",
  //     };
  //   });
  // }, []);
  // useEffect(() => {
  //   const getService = async () => {
  //     const res = await axios.get(`${END_POINT}/service/${params.id}`);
  //     console.log(res);
  //     const { data } = res.data;
  //     console.log(data.service);
  //     setServices(data.service);
  //   };
  //   getService();
  // }, []);

  const [id, SetId] = useState("");
  /*  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Dịch vụ tươi sống | TKTL",
      };
    });

  }, []); */
  console.log(params);
  useEffect(() => {
    try {
      /*   const getId = async()=>{
          const res = await axios.get(`${END_POINT}/service`)
          console.log(res)
          const {data} =res.data
          data.service.map(service=>{
            if(service.name==="TKT Fresh"){
              console.log("servicea",service._id)
              SetId(service._id)
            }
          })
        }
        getId() */
      console.log(params.id);
      if (params.id) {
        const getservice = async () => {
          const res = await axios.get(`${END_POINT}/service/${params.id}`);
          console.log(res);
          const { data } = res.data;
          console.log(data);
          setServices(data);
          setMetadata((prev) => {
            return {
              ...prev,
              title: `${data.sub_detail} | TKTL`,
            };
          });
        };
        getservice();
        const getquote = async () => {
          const res = await axios.get(
            `${END_POINT}/quote/service/${params.id}`
          );

          const { data } = res.data;
          console.log(data);
          setQuotes(data);
        };
        getquote();
        const getfeature = async () => {
          const res = await axios.get(
            `${END_POINT}/feature/service/${params.id}`
          );

          const { data } = res.data;
          console.log(data.feature);
          setFeatures(data.feature);
        };
        getfeature();
        const getparticipant = async () => {
          const res = await axios.get(
            `${END_POINT}/participant/service/${params.id}`
          );

          const { data } = res.data;
          console.log(data);
          setParticipants(data);
        };
        getparticipant();
      }
    } catch (err) {
      console.log(err);
    }
  }, [params]);
  return (
    <section id="layout-content">
      <div className="relative">
        <img src={bannerExpress} alt="express" />
        <button class="absolute bottom-[4%] sm:bottom-0 left-[5%] font-bold flex lg:inline-flex justify-center items-center bg-[#FF0000] rounded-[2px] text-white w-full md:w-[215px] md:h-[56px] sm:h-[40px] mt-8 lg:mt-4">
          <img
            src="https://jtexpress.vn/themes/jtexpress/assets/images/icon-detail-sevice.png"
            alt="J&amp;T Express Việt Nam - Chuyển phát tiêu chuẩn"
          />
          <span class="ml-2 Montserrat-Bold">Đăng ký tư vấn</span>
        </button>
      </div>
      {/* <div
        className="h-full lg:h-[610px] w-full relative pt-12"
        key={services?._id}
      >
        <img
          className="lg:absolute lg:right-[0px] lg:top-10 w-full h-full lg:w-auto object-cover right-negative-margin"
          src={`${END_POINT}/public/${services?.banner}`}
          alt="express"
        />
        <div className="container mx-auto h-full flex items-center">
          <div className="w-full h-auto lg:w-[540px] relative">
            <img
              // src="https://jtexpress.vn/themes/jtexpress/assets/images/Map-world.png"
              className="w-full h-full object-cover hidden lg:block "
              alt=""
            />
            <div className="lg:absolute left-[50%] lg:top-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:w-full lg:h-full lg:py-6 px-4 lg:px-0">
              <h5
                className="mt-6 lg:mt-0 text-[#f5c736] font-bold text-[24px] lg:text-[32px] aos-init"
                data-aos="fade-right"
              >
                {services?.sub_detail}
              </h5>
              <span className="block my-6 lg:my-4 text-justify lg:text-left">
                {services?.target}
              </span>
              <Link to="/tu-van/dang-ki-tu-van">
                <button className="flex lg:inline-flex justify-center items-center bg-[#e5a663] rounded-[2px] text-white w-full lg:w-[215px]  h-[56px] mt-8 lg:mt-4">
                  <img
                    src="https://jtexpress.vn/themes/jtexpress/assets/images/icon-detail-sevice.png"
                    alt=""
                  />
                  <span className="ml-2 font-bold">Đăng ký tư vấn</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto lg:pt-[80px] lg:pb-[58px]">
        <div className="wrapper_description_service px-4 grid lg:px-0 md:grid-cols-1 sm:grid-cols-1  lg:grid-cols-[700px_minmax(400px,_1fr)_200px] gap-[100px]  ">
          <div className="wrapper_description_service_detail mt-16 lg:mt-0 grid lg:grid-cols-2 gap-[30px] md:grid-cols-1 sm:grid-cols-1">
            <div class="flex item-start">
              <img
                class="w-[48px] h-[48px] object-cover"
                src="https://jtexpress.vn/themes/jtexpress/assets/images/money-bag-service-detail.png"
                alt="J&amp;T Express Việt Nam - Chuyển phát tiêu chuẩn"
              />
              <div class="flex flex-col ml-4">
                <h5 class="mb-2 text-[#D60009] text-[20px] Montserrat-Bold">
                  Tiết kiệm hơn
                </h5>
                <span class="text-justify aos-init aos-animate">
                  Giá thành của J&amp;T Express được điều chỉnh hợp lý và tiết
                  kiệm nhất cho khách hàng. Các chủ shop, cá nhân buôn bán, mua
                  sắm online có cơ hội tối đa hóa lợi nhuận trong hoạt động kinh
                  doanh của mình.
                </span>
              </div>
            </div>
            <div class="flex item-start">
              <img
                class="w-[48px] h-[48px] object-cover"
                src="https://jtexpress.vn/themes/jtexpress/assets/images/time-service-detail.png"
                alt="J&amp;T Express Việt Nam - Chuyển phát tiêu chuẩn"
              />
              <div
                class="flex flex-col ml-4"
                data-gtm-vis-has-fired-59878230_13="1"
                data-gtm-vis-has-fired-59878230_9="1"
              >
                <h5 class="mb-2 text-[#D60009] text-[20px] Montserrat-Bold">
                  Tiện lợi hơn
                </h5>
                <span
                  class="text-justify aos-init aos-animate"
                  data-aos="fade-right"
                  data-aos-delay="100"
                  data-aos-duration="800"
                >
                  J&amp;T Express có thể vận chuyển được đa dạng, hầu hết loại
                  hàng hóa. Đặc biệt, có thể vận chuyển hàng với kích thước lớn,
                  trọng lượng có thể lên đến 70kg, giảm nhẹ gánh nặng hàng to.
                </span>
              </div>
            </div>
            <div class="flex item-start">
              <img
                class="w-[48px] h-[48px] object-cover"
                src="https://jtexpress.vn/themes/jtexpress/assets/images/delivery-time-service-detail.png"
                alt="J&amp;T Express Việt Nam - Chuyển phát tiêu chuẩn"
              />
              <div
                class="flex flex-col ml-4"
                data-gtm-vis-has-fired-59878230_13="1"
                data-gtm-vis-has-fired-59878230_9="1"
              >
                <h5 class="mb-2 text-[#D60009] text-[20px] Montserrat-Bold">
                  Vượt trội hơn
                </h5>
                <span
                  class="text-justify aos-init aos-animate"
                  data-aos="fade-right"
                  data-aos-delay="150"
                  data-aos-duration="800"
                >
                  Khi đăng ký sử dụng dịch vụ chuyển phát tiêu chuẩn J&amp;T
                  Express, hàng hóa được đội ngũ "áo đỏ" đến tận nơi lấy đi. Quá
                  trình tiếp nhận và vận chuyển sử dụng nhiều loại hình vận tải,
                  đáp ứng tối đa nhu cầu của khách hàng.
                </span>
              </div>
            </div>
            <div>
              <img
                class="w-auto h-auto object-cover hidden lg:block"
                src="https://jtexpress.vn/themes/jtexpress/assets/images/service_detail_logo.png"
                alt="J&amp;T Express Việt Nam - Chuyển phát tiêu chuẩn"
              />
            </div>
            {/* {features.map((feature) => (
              <div className="flex item-start" key={feature._id}>
                <img
                  className="w-[48px] h-[48px] object-cover"
                  src={`${END_POINT}/public/${feature?.logo}`}
                  alt=""
                />

                <div className="flex flex-col ml-4">
                  <h5 className="mb-2 text-[#f5c736] text-[20px] font-bold">
                    {feature?.name}
                  </h5>
                  <span className="text-justify aos-init">
                    {feature?.detail}
                  </span>
                </div>
              </div>
            ))} */}
            {/* <div>
              <img
                className="w-auto h-auto object-cover hidden lg:block"
                src={`${END_POINT}/public/${services?.logo}`}
                alt=""
              />
            </div> */}
          </div>
          <img
            src="https://jtexpress.vn/themes/jtexpress/assets/images/car-service-detail.png"
            className="w-full h-full object-cover rounded-[10px]"
            alt=""
          />
        </div>
      </div>
      <div className="lg:bg-[#F4F4F4] lg:pt-[63px] lg:pb-[58px]">
        <div className="container mx-auto mt-10 lg:mt-0 px-4 lg:px-0 mb-10 lg:mb-0 ">
          <h5
            className="font-extrabold text-3xl md:text-4xl text-[#161D25] text-center aos-init"
            data-aos="fade-right"
          >
            Đối tượng phù hợp
          </h5>
          <span
            className="block text-center mt-5 mb-4 w-full lg:w-[578px] mx-auto aos-init text-base"
            data-aos="zoom-in"
          >
            {/* {services?.tip} */}
            Dịch vụ chuyển phát tiêu chuẩn - TKT Express dành cho tất cả mọi
            người có nhu cầu vận chuyển hàng hóa
          </span>
          <div className="w-[27px] h-[3px] bg-[#f5c736] mx-auto mb-8"></div>
          <div className="wrapper_objects_service lg:grid  lg:grid-cols-2 gap-[20px] sm:block">
            {/* {participants.map((participant) => (
              <div className=" grid grid-cols-1 gap-[20px]">
                <div
                  class="h-[315px] lg:h-[244px]  relative rounded-[10px] overflow-hidden col-span-2 md:col-span-1"
                  key={participant._id}
                >
                  <img
                    src={`${END_POINT}/public/${participant?.banner}`}
                    class="w-full h-full object-cover"
                    alt=""
                  />
                  <div class="object-service-detail absolute top-[60%] translate-y-[-60%] left-[10%] text-white w-[170px] lg:w-[320px]">
                    <span class="block Montserrat-Bold mb-3 text-[20px]">
                      {participant?.name}
                    </span>
                    <span
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      class="aos-init"
                    >
                      {participant?.description}
                    </span>
                  </div>
                </div>
              </div>
            ))} */}
            <div class="h-[315px] lg:h-[244px] relative rounded-[10px] overflow-hidden sm:mb-[20px]">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/woman.png"
                class="w-full h-full object-cover"
                alt="J&amp;T Express Việt Nam - Chuyển phát tiêu chuẩn"
              />
              <div class="object-service-detail absolute top-[50%] translate-y-[-50%] left-[10%] text-white w-[170px] lg:w-[320px]">
                <span class="block Montserrat-Bold mb-3 text-[20px]">
                  Cá nhân
                </span>
                <span
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  class="aos-init aos-animate"
                >
                  Bất kỳ ai có nhu cầu vận chuyển hàng hóa, gửi hàng đến người
                  thân, bạn bè, đồng nghiệp,... của mình đều có thể lựa chọn
                  Dịch vụ chuyển phát tiêu chuẩn - J&amp;T Express
                </span>
              </div>
            </div>
            <div class="h-[315px] lg:h-[244px] relative rounded-[10px] overflow-hidden">
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/man1.png"
                class="w-full h-full object-cover"
                alt="J&amp;T Express Việt Nam - Chuyển phát tiêu chuẩn"
              />
              <div class="object-service-detail absolute top-[50%] translate-y-[-50%] left-[10%] text-white w-[170px] lg:w-[320px]">
                <span class="block Montserrat-Bold mb-3 text-[20px]">
                  Chủ shop
                </span>
                <span
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  class="aos-init aos-animate"
                >
                  Nếu bạn là chủ shop online, đang tham gia bán hàng tại các nền
                  tảng thương mại điện tử và mạng xã hội thì Dịch vụ chuyển phát
                  tiêu chuẩn - J&amp;T Express này lại càng không thể bỏ qua
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center mt-7 gap-x-[24px] gap-y-[12px]">
            <span className="block w-full lg:w-[215px] h-[56px] border border-[#fbd535]">
              <Link to="/tra-cuu/bang-gia">
                <button className="flex items-center text-[#f5c736] font-bold justify-center h-full w-full">
                  <ion-icon
                    name="search-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="search outline"
                  />
                  <span className="ml-2  font-bold text-lg">Bảng giá</span>
                </button>
              </Link>
            </span>
            <span className="block w-full lg:w-[215px] md:w-[735px] sm:w-[610px] h-[56px] border border-[#fbd535]">
              <Link to="/tu-van/dang-ki-tu-van">
                <button className="flex items-center text-[#f5c736] font-bold justify-center h-full w-full">
                  <ion-icon
                    name="search-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="search outline"
                  />
                  <span className="ml-2  font-bold text-lg">
                    Đăng ký tư vấn
                  </span>
                </button>
              </Link>
            </span>
            <span className="block w-full lg:w-[215px] h-[56px] border border-[#f5c736]">
              <Link to="/tra-cuu/buu-cuc">
                <button className="flex items-center text-[#f5c736] font-bold justify-center h-full w-full">
                  <ion-icon
                    name="search-outline"
                    role="img"
                    className="md hydrated"
                    aria-label="search outline"
                  />
                  <span className="ml-2 font-bold text-lg">
                    Bưu cục gần nhất
                  </span>
                </button>
              </Link>
            </span>
          </div>
        </div>
      </div>

      <div className="">
        <CarouselWrapper
          effect="fade"
          dots="true"
          autoplay
          autoplaySpeed={3500}
        >
          <div className="relative">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/slider-tuyen-dung.png"
              className="w-full h-[380px] md:h-[500px] object-cover"
              alt="pic"
            />
            <div className="absolute top-0 bottom-0 left-0 right-0">
              <div className="flex items-center justify-center flex-col  mt-[60px] md:mt-[100px] ">
                <img
                  src="https://jtexpress.vn/storage/app/uploads/public/628/354/b0e/628354b0eabfe624030449.jpg"
                  alt=""
                  className="rounded-[50%]  w-[68px] h-[68px] preventselect"
                ></img>
                <div className="mx-8 sm:mx-[70px] md:mx-[130px] lg:mx-[320px] mt-[12px]">
                  <div className="text-white font-semibold text-lg text-center sm:text-xl md:text-2xl preventselect">
                    &quot;Nhờ TKT Express mà shop của tôi được nhiều khách hàng
                    đánh giá tốt về thời gian ship hàng. Giá thành tiết kiệm,
                    đội ngũ shipper chuyên nghiệp hỗ trợ rất nhiều cho công việc
                    kinh doanh của tôi.&quot;
                  </div>
                </div>
                <h1 className="text-white font-bold text-lg mt-[14px] preventselect">
                  Vũ An Phương
                </h1>
                <div className="text-white text-base sm:text-lg preventselect">
                  Chủ cửa hàng thiết bị gia dụng tại TP. Hà Nội
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/slider-tuyen-dung.png"
              className="w-full h-[380px] md:h-[500px] object-cover"
              alt="pic"
            />
            <div className="absolute top-0 bottom-0 left-0 right-0">
              <div className="flex items-center justify-center flex-col  mt-[60px] md:mt-[100px] ">
                <img
                  src="https://jtexpress.vn/storage/app/uploads/public/628/354/c45/628354c4549b2622585338.jpg"
                  alt=""
                  className="rounded-[50%]  w-[68px] h-[68px] preventselect"
                ></img>
                <div className="mx-8 sm:mx-[70px] md:mx-[130px] lg:mx-[320px] mt-[12px]">
                  <div className="text-white font-semibold text-lg text-center sm:text-xl md:text-2xl preventselect">
                    &quot;Tôi đã từng hợp tác với nhiều đơn vị chuyển phát nhưng
                    cuối cùng quyết định đồng hành cùng TKT Express. Phải nói
                    rằng, hệ thống bưu cục đồng nhất về chất lượng khắp 63 tỉnh
                    thành là điểm làm tôi hài lòng nhất.&quot;
                  </div>
                </div>
                <h1 className="text-white font-bold text-lg mt-[14px] preventselect">
                  Võ Ngọc Trâm
                </h1>
                <div className="text-white text-base sm:text-lg preventselect">
                  Chủ shop quần áo tại TP.HCM
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://jtexpress.vn/themes/jtexpress/assets/images/slider-tuyen-dung.png"
              className="w-full h-[380px] md:h-[500px] object-cover"
              alt="pic"
            />
            <div className="absolute top-0 bottom-0 left-0 right-0">
              <div className="flex items-center justify-center flex-col  mt-[60px] md:mt-[100px] ">
                <img
                  src="https://jtexpress.vn/storage/app/uploads/public/628/354/d6d/628354d6d29cd291281889.jpg"
                  alt=""
                  className="rounded-[50%]  w-[68px] h-[68px] preventselect"
                ></img>
                <div className="mx-8 sm:mx-[70px] md:mx-[130px] lg:mx-[320px] mt-[12px]">
                  <div className="text-white font-semibold text-lg text-center sm:text-xl md:text-2xl preventselect">
                    "Kinh doanh online hơn 3 năm nay, thái độ và sự hỗ trợ nhiệt
                    tình của shipper J&T Express là điều mà không ở đâu có. Tôi
                    rất hài lòng khi chọn J&T Express cho cửa hàng của mình."
                  </div>
                </div>
                <h1 className="text-white font-bold text-lg mt-[14px] preventselect">
                  Trương Ngọc Phương Anh
                </h1>
                <div className="text-white text-base sm:text-lg preventselect">
                  Chủ văn phòng phẩm tại TP. Cần Thơ
                </div>
              </div>
            </div>
          </div>

          {/* {quotes.map((quote) => (
            <div className="relative" key={quote?._id}>
              <img
                src="https://jtexpress.vn/themes/jtexpress/assets/images/slider-tuyen-dung.png"
                className="w-full h-[380px] md:h-[500px] object-cover"
                alt="pic"
              />
              <div className="absolute top-0 bottom-0 left-0 right-0">
                <div className="flex items-center justify-center flex-col  mt-[60px] md:mt-[100px] ">
                  <img
                    src={`${END_POINT}/public/${quote?.avatar}`}
                    alt=""
                    className="rounded-[50%]  w-[68px] h-[68px] preventselect"
                  ></img>
                  <div className="mx-8 sm:mx-[70px] md:mx-[130px] lg:mx-[320px] mt-[12px]">
                    <div className="text-white font-semibold text-lg text-center sm:text-xl md:text-2xl preventselect">
                      {quote?.quote}
                    </div>
                  </div>
                  <h1 className="text-white font-bold text-lg mt-[14px] preventselect">
                    {quote?.name}
                  </h1>
                  <div className="text-white text-base sm:text-lg preventselect">
                    {quote?.description}
                  </div>
                </div>
              </div>
            </div>
          ))} */}
        </CarouselWrapper>
      </div>
    </section>
  );
}
