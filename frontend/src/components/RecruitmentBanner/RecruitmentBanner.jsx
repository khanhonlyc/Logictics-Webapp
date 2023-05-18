import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Images from "../../utils/images";
import { Carousel } from "antd";
import styled from "styled-components";

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
const RecruitmentBanner = () => {
  return (
    <CarouselWrapper effect="fade" dots="true" autoplay autoplaySpeed={3500}>
      <div className="relative">
        <img
          src="https://jtexpress.vn/themes/jtexpress/assets/images/slider-tuyen-dung.png"
          className="w-full h-[380px] md:h-[500px] object-cover"
          alt="pic"
        />
        <div className="absolute top-0 bottom-0 left-0 right-0">
          <div className="flex items-center justify-center flex-col  mt-[60px] md:mt-[100px] ">
            <img
              src={`https://jtexpress.vn/storage/app/uploads/public/628/356/625/6283566257f1c652959166.jpg`}
              alt="#"
              className="rounded-[50%]  w-[68px] h-[68px] preventselect"
            ></img>
            <div className="mx-8 sm:mx-[70px] md:mx-[130px] lg:mx-[320px] mt-[12px]">
              <div className="text-white font-semibold text-lg text-center sm:text-xl md:text-2xl preventselect">
                Tại TK giúp tôi vận chuyển tốt hơn
              </div>
            </div>
            <h1 className="text-white font-bold text-lg mt-[14px] preventselect">
              Nguyễn kì Duyên
            </h1>
            <div className="text-white text-base sm:text-lg preventselect">
              Phó điều hành công ty đa quốc gia
            </div>
          </div>
        </div>
      </div>
    </CarouselWrapper>
  );
};

export default RecruitmentBanner;
