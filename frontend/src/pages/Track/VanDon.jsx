import { message } from "antd";
import axios from "axios";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

export default function VanDon() {
  const { accessToken, order, setOrder, setMetadata } = useContext(MainContext);
  const [billCode, setBillCode] = useState(order);
  const [data, setData] = useState(false); // list order

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Vận đơn | TKTL",
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

  const handleSubmit = async () => {
    setOrder("");
    if (!billCode) {
      message.error({
        content: "Vui lòng nhập mã vận đơn",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      return;
    }

    const {
      data: { data },
    } = await axios({
      method: "get",
      headers: { authorization: `Bearer ${accessToken}` },
      url: `${END_POINT}/order/tracking/${billCode.replaceAll(", ", "&")}`,
    });

    console.log(data);

    setData(data);
  };

  return (
    <div
      className="p-7"
      style={{
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <textarea
        value={billCode}
        onChange={(e) => setBillCode(e.target.value)}
        className="border border-[#ced4da] focus:outline-none w-full rounded-[2px] px-[20px] py-[16px] h-[80px]"
        name="billcode"
        placeholder="Ví dụ: 47283639, 21625339"
      />
      <div>
        <span className="text-[#161D25] block my-[24px]">
          Nhập mã vận đơn của bạn (cách nhau bởi dấu phẩy), tối đa 10 vận đơn.
        </span>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#e5a663] h-[55px] rounded-[2px] text-white font-semibold text-lg"
        >
          Tra cứu vận đơn
        </button>
      </div>

      <p className=" text-center mt-6 text-base font-semibold">
        {data.success ? (
          <span className="text-[green]">
            Tìm kiếm thành công {data.success} mã vận đơn.
          </span>
        ) : (
          ""
        )}{" "}
        {data.failure ? (
          <span className="text-[red]">
            Không tìm thấy {data.failure} mã vận đơn.
          </span>
        ) : (
          ""
        )}
      </p>

      {data.orders && data.orders.length > 0 && (
        <div id="bill" className="px-4 lg:px-0">
          {data.orders.map((order) => (
            <div
              className="mt-10 py-4 bg-[#FFF2F4] min-h-[100px] rounded-[10px] flex lg:flex-row flex-col items-center"
              key={order?._id}
            >
              <div className="text-center mx-10">
                <p className="text-[16px] font-medium mb-1">
                  {moment(order?.createdAt).format("HH:mm")}
                </p>
                <p className="text-[#FF0000] text-[16px] font-medium mb-0">
                  {moment(order?.createdAt).format("DD/MM/YYYY")}
                </p>
              </div>

              <div className="lg:p-0 p-4">
                <p className="mb-1 text-[18px]">
                  <b>Mã vận đơn:</b> {order?.orderId}
                </p>
                <p className="mb-1 text-[18px]">
                  <b>Tên người gửi:</b> {order?.sender?.name} - <b>SĐT:</b>{" "}
                  {order?.sender?.phone}
                </p>
                <p className="mb-1 text-[18px]">
                  <b>Tên người nhận:</b> {order?.receiver?.name} - <b>SĐT:</b>{" "}
                  {order?.receiver?.phone}
                </p>
                <p className="mb-1 text-[18px]">
                  <b>Địa chỉ người gửi:</b>{" "}
                  {order?.destination?.address?.street} -{" "}
                  {order?.destination?.address?.ward} -{" "}
                  {order?.destination?.address?.district} -{" "}
                  {order?.destination?.address?.province}{" "}
                </p>
                <p className="mb-1 text-[18px]">
                  <b>Địa chỉ người nhận:</b> {order?.origin?.address?.street} -{" "}
                  {order?.origin?.address?.ward} -{" "}
                  {order?.origin?.address?.district} -{" "}
                  {order?.origin?.address?.province}{" "}
                </p>
                <p className="mb-1 text-[18px]">
                  <b>Tên sản phẩm:</b> {order?.products[0]?.name}
                </p>
                <p className="mb-1 text-[18px]">
                  <b>Trọng lượng:</b> {order?.products[0]?.quantity}
                  {order?.products[0]?.unit}
                </p>

                <p className="mb-1 text-[18px]">
                  <b>Tên dịch vụ:</b> {order?.service?.name}
                </p>
                <p className="mb-1 text-[18px]">
                  <b>Trạng thái:</b> {handleStatus(order?.status)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
