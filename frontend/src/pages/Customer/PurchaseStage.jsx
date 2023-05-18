import { LeftOutlined } from "@ant-design/icons";
import { Steps } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { IoInformationCircleOutline, IoLocationOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../components/Comment/Comment";
import SingleComment from "../../components/Comment/SingleComment";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

const { Step } = Steps;

// fake data
const steps = [
  {
    title: "16:34 10-02-2022",
    description: "Lấy hàng thành công",
  },
  {
    title: "04:45 13-02-2022",
    description: "Đơn hàng đã xuất kho",
  },
  {
    title: "00:30 15-02-2022",
    description: "Đơn hàng đã đến kho Cu Chi SOC",
  },
  {
    title: "13:36 15-02-2022",
    description: "Đơn hàng đã đến kho 50-HCM D2/An Phu LM Hub",
  },
  {
    title: "14:32 15-02-2022",
    description: "Giao hàng thành công. Người nhận hàng: Bùi Đăng Khoa",
  },
];

const comments = [
  {
    userId: 12222222222,
    avatar:
      "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png",
    commentId: 1645,
    username: "Nguyễn Văn A",
    createdAt: "58 phút trước",
    message:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tenetur a magnam aliquid.",
  },
  {
    userId: 1333333333,
    avatar:
      "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png",
    commentId: 13123,
    username: "Nguyễn Văn B",
    createdAt: "2 giờ trước",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, totam? Sit, laboriosam. Velit, quo assumenda! Autem nulla ex voluptatum molestiae facere illo reiciendis quas labore, ut, eos sequi amet nam magni?",
  },
  {
    userId: 14444444444,
    commentId: 134543,
    username: "Nguyễn Văn C",
    createdAt: "3 giờ trước",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit necessitatibus animi voluptatem sequi a obcaecati quas eligendi facilis architecto vero. Natus, architecto illum?",
  },
  {
    userId: 14444444425,
    commentId: 134544,
    username: "Nguyễn Văn C",
    createdAt: "3 giờ trước",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit necessitatibus animi voluptatem sequi a obcaecati quas eligendi facilis architecto vero. Natus, architecto illum?",
  },
  {
    userId: 14444444441,
    avatar:
      "https://www.seekpng.com/png/detail/110-1100707_person-avatar-placeholder.png",
    commentId: 134541,
    username: "Nguyễn Văn C",
    createdAt: "3 giờ trước",
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit necessitatibus animi voluptatem sequi a obcaecati quas eligendi facilis architecto vero. Natus, architecto illum?",
  },
  {
    userId: 1333333337,
    commentId: 13122,
    username: "Nguyễn Văn B",
    createdAt: "2 giờ trước",
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore, totam? Sit, laboriosam. Velit, quo assumenda! Autem nulla ex voluptatum molestiae facere illo reiciendis quas labore, ut, eos sequi amet nam magni?",
  },
];

function PurchaseStage() {
  // State
  const [order, setOrder] = useState({});
  const maximumNumberOfCommentsDisplayed = 5;
  const [showAllComments, setShowAllComments] = useState(false);
  // Router
  const navigate = useNavigate();
  const { id } = useParams(); // get order id from params
  // Redux
  const { accessToken, setMetadata } = useContext(MainContext);

  // Set metadata
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Theo dõi đơn hàng | TKTL",
      };
    });
  }, [setMetadata]);

  // Handle filter status
  const handleStatus = (status) => {
    if (status === "waiting") {
      return (status = "Chờ xác nhận");
    } else if (status === "accepted") {
      return (status = "Đã chấp nhận");
    } else if (status === "probably proceed") {
      return (status = "Đang xử lý");
    } else if (status === "processing") {
      return (status = "Đang xử lý");
    } else if (status === "completed") {
      return (status = "Hoàn thành");
    } else if (status === "refused") {
      return (status = "Bị từ chối");
    } else if (status === "cancel") {
      return (status = "Hủy bỏ");
    }
    return;
  };

  // Get order list
  useEffect(() => {
    const fetchOrderApi = async () => {
      try {
        const res = await axios.get(`${END_POINT}/order/${id}`, {
          headers: { authorization: `Bearer ${accessToken}` },
        });
        setOrder(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrderApi();
  }, [accessToken, id]);

  // Format price
  const formatPrice = (number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(number)
      .replaceAll("₫", "VNĐ");
  };

  const originStreet = order?.origin?.address.street;
  const originWard = order?.origin?.address.ward;
  const originDistrict = order?.origin?.address.district;
  const originProvince = order?.origin?.address.province;
  const originAddress = `Đường ${originStreet}, ${originWard}, ${originDistrict}, ${originProvince}`;
  const originAddressMap = [
    originStreet,
    originWard,
    originDistrict,
    originAddress,
  ]
    .filter((value) => value)
    .join(", ");

  const destinationStreet = order?.destination?.address.street;
  const destinationWard = order?.destination?.address.ward;
  const destinationDistrict = order?.destination?.address.district;
  const destinationProvince = order?.destination?.address.province;
  const destinationAddress = `Đường ${destinationStreet}, ${destinationWard}, ${destinationDistrict}, ${destinationProvince}`;
  const destinationAddressMap = [
    destinationStreet,
    destinationWard,
    destinationDistrict,
    destinationProvince,
  ]
    .filter((value) => value)
    .join(", ");

  return (
    <div className="bg-gray-100 relative">
      <div className="bg-white rounded-sm shadow-xl pb-2 ">
        {/* Back to previous page */}
        <button
          className="hover:translate-y-[-1px] transition-all hover:text-yellow-500 pl-4 pt-3"
          onClick={() => navigate(-1)}
        >
          <LeftOutlined className="text-[12px] sm:text-xs mr-2" />
          <span className="font-medium sm:mt-1 cursor-pointer text-[12px] sm:text-xs">
            Trở lại
          </span>
        </button>

        <div className="px-4 pb-3 pt-3">
          {/* Title */}
          <div className="text-xl font-bold mb-1 lg:text-2xl mt-2 uppercase">
            Theo dõi đơn hàng
          </div>
        </div>

        <div className="px-4 pb-3 pt-3 flex items-center gap-4 justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#4E9F3D] text-[#F9F9F9] font-bold py-[10px] px-[20px] text-base">
              #{order.orderId}
            </div>
            <div className="bg-[#3A3C3F] text-[#FFD124] font-bold py-[10px] px-[20px] text-base">
              {handleStatus(order.status)}
            </div>
            <div className="bg-[#FFD124] text-[#3A3C3F] font-bold py-[10px] px-[20px] text-base capitalize">
              {order?.service?.name}
            </div>
          </div>
          <div className="bg-[#3A3C3F] text-[#F9F9F9] font-bold py-[10px] px-[20px] text-base">
            Giá trị:{" "}
            {order?.total_price ? formatPrice(order?.total_price) : "0 VNĐ"}
          </div>
        </div>

        {order.status !== "waiting" &&
          order.status !== "refused" &&
          order.status !== "cancel" && (
            <div className="mx-2 flex my-8 gap-4 justify-between">
              <div className="px-4 my-3.5 border-gray-300">
                <div className="flex flex-col-reverse">
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
              </div>

              <div className="flex items-end">
                <iframe
                  title="Map"
                  className="relative border-solid border-[#3A3C3F] border-2"
                  width="450"
                  height="450"
                  src={`https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=${originAddressMap}&wp.1=${destinationAddressMap}&mapSize=450,450&key=${process.env.REACT_APP_API_KEY}`}
                  scrolling="no"
                ></iframe>
                <a
                  className="absolute w-[450px] h-[450px]"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={`https://www.google.com/maps/dir/?api=1&origin=${originAddressMap}&destination=${destinationAddressMap}&travelmode=driving`}
                >
                  <span className="hidden">
                    Địa chỉ giao từ {originAddress} tới {destinationAddress}
                  </span>
                </a>
              </div>
            </div>
          )}

        <div className="overflow-auto mb-3 w-[100%]">
          <div className="border-gray-300 border-b-[1px] px-4 py-2 bg-[#ffd124]">
            <div className="text-lg sm:text-lg font-bold ml-2 text-[#00003B] flex items-center">
              <IoLocationOutline className="mr-1 w-5 h-5  md:w-7 md:h-7" />
              Thông tin người gửi
            </div>
          </div>
          <div className="px-10 py-2 ">
            <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
              <div className="w-36 font-semibold text-sm sm:text-base opacity-50">
                Họ và tên:
              </div>
              <div className="text-sm sm:text-base font-semibold">
                {order?.sender?.name}
              </div>
            </div>

            <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
              <div className="w-36 font-semibold text-sm sm:text-base opacity-50">
                Số điện thoại:
              </div>
              <div className="text-sm sm:text-base font-semibold">
                {order?.sender?.phone}
              </div>
            </div>

            <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
              <div className="w-36 font-semibold text-sm sm:text-base opacity-50">
                Địa chỉ:
              </div>
              <div className="text-sm sm:text-base font-semibold capitalize">
                {originAddress}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-auto mb-3 w-[100%]">
          <div className="border-gray-300 border-b-[1px] px-4 py-2 bg-[#ffd124]">
            <div className="text-lg sm:text-lg font-bold ml-2 text-[#00003B] flex items-center">
              <IoLocationOutline className="mr-1 w-5 h-5  md:w-7 md:h-7" />
              Thông tin người nhận
            </div>
          </div>
          <div className="px-10 py-2 ">
            <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
              <div className="w-36 font-semibold text-sm sm:text-base opacity-50">
                Họ và tên:
              </div>
              <div className="text-sm sm:text-base font-semibold">
                {order?.receiver?.name}
              </div>
            </div>

            <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
              <div className="w-36 font-semibold text-sm sm:text-base opacity-50">
                Số điện thoại:
              </div>
              <div className="text-sm sm:text-base font-semibold">
                {order?.receiver?.phone}
              </div>
            </div>

            <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
              <div className="w-36 font-semibold text-sm sm:text-base opacity-50">
                Địa chỉ:
              </div>
              <div className="text-sm sm:text-base font-semibold capitalize">
                {destinationAddress}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-auto mb-3 w-[100%]">
          <div className="border-gray-300 border-b-[1px] px-4 py-2 bg-[#ffd124]">
            <div className="text-lg sm:text-lg font-bold ml-2 text-[#00003B] flex items-center">
              <IoInformationCircleOutline className="mr-1 w-5 h-5  md:w-7 md:h-7" />
              Danh sách hàng hóa
            </div>
          </div>
          {order?.products?.map((product) => (
            <div
              className="px-10 py-2 grid grid-cols-2 bg-[#F9F9F9]"
              key={product._id}
            >
              <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
                <div className="w-32 font-semibold text-sm sm:text-base opacity-50">
                  Tên hàng hóa:
                </div>
                <div className="text-sm sm:text-base font-semibold">
                  {product.name}
                </div>
              </div>

              <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
                <div className="w-32 font-semibold text-sm sm:text-base opacity-50">
                  Ghi chú:
                </div>
                <div className="text-sm sm:text-base font-semibold">
                  {product.note}
                </div>
              </div>

              <div className="flex items-center border-b-2 mb-1 pb-1 last:border-b-0 last:mb-0 last:pb-0 bg-[#F9F9F9]">
                <div className="w-32 font-semibold text-sm sm:text-base opacity-50">
                  Số lượng:
                </div>
                <div className="text-sm sm:text-base font-semibold">
                  {product.quantity}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8 px-4 pb-12">
        <SingleComment orderId={id} currentCustomer={order.customer} />

        {comments.length > maximumNumberOfCommentsDisplayed && !showAllComments
          ? comments
              .slice(0, maximumNumberOfCommentsDisplayed)
              .map((comment) => (
                <Comment key={comment.commentId} comment={comment} />
              ))
          : comments.map((comment) => (
              <Comment key={comment.commentId} comment={comment} />
            ))}

        {comments.length > maximumNumberOfCommentsDisplayed && (
          <div className="flex justify-center mt-12">
            <button
              className="bg-[#ffd124] text-[#00003B] font-semibold py-2 px-4 rounded-md"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments ? "Ẩn bình luận" : "Xem tất cả bình luận"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseStage;
