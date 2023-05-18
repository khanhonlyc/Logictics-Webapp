import React, { useEffect, useState } from "react";
import Subtract from "../../assets/icons/Subtract.svg";
import comboShape from "../../assets/icons/combo-shape.svg";
import SubFollow from "../../assets/icons/SubFollow.svg";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import { Link } from "react-router-dom";

function OrderDetail() {
  const [orderID, setOrderID] = useState([]);
  const [service, setService] = useState([]);
  const [provinceSend, SetprovinceSend] = useState([]);
  const [provinceDestination, SetprovinceDestination] = useState([]);
  const [distance, setDistance] = useState([]);
  const [status, setStatus] = useState([]);
  const [updateDate, setUpdateDate] = useState([]);
  const [senderName, setSenderName] = useState([]);
  const [senderPhone, setSenderPhone] = useState([]);
  const [senderAdd, setSenderAdd] = useState([]);
  const [senderWarehouse, setSenderWarehouse] = useState(null);
  const [receiverName, setReceiverName] = useState([]);
  const [receiverPhone, setReceiverPhone] = useState([]);
  const [receiverAdd, setReceiverAdd] = useState([]);
  const [products, setProducts] = useState([]);

  //fake ID order
  const id = 70555425;
  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(`${END_POINT}/admin/order/${id}`);
      const { data } = res.data;
      //convert type adress
      const addSender = data.origin.address;
      const newAddSender = [
        addSender.street,
        addSender.ward,
        addSender.district,
        addSender.province,
      ]
        .filter((value) => value)
        .join(", ");

      const addReceiver = data.destination.address;
      const newAddReceiver = [
        addReceiver.street,
        addReceiver.ward,
        addReceiver.district,
        addReceiver.province,
      ]
        .filter((value) => value)
        .join(", ");

      setService(data.service.name);
      setOrderID(data.orderId);
      SetprovinceSend(data.origin.address.province);
      SetprovinceDestination(data.destination.address.province);

      setStatus(data.status);
      setUpdateDate(
        data.updatedAt.split("T")[0].split("-").reverse().join("-")
      );
      setSenderName(data.sender.name);
      setSenderPhone(data.sender.phone);
      setSenderAdd(newAddSender);
      setReceiverName(data.receiver.name);
      setReceiverPhone(data.receiver.phone);
      setReceiverAdd(newAddReceiver);
      setProducts(data.products);
    };

    getOrder();
  }, []);
  //get distance
  useEffect(() => {
    const getDistance = axios
      .get(
        `${END_POINT}/distance?fromProvince=${provinceSend}&toProvince=${provinceDestination}`
      )
      .then((distance) => {
        setDistance(distance.data.data.distance[0].distance);
      })
      .catch(() => setDistance("err"));
  });

  return (
    <div className="mx-10 text-[#3A3C3F] text-lg font-medium">
      <p className="font-bold text-2xl leading-10 my-4">CHI TIẾT ĐƠN HÀNG</p>
      <div className="flex justify-between font-bold text-xl leading-8 mb-3">
        <div className="flex-1">
          <span className="rounded-md bg-[#4BAE4F] px-2 py-1 mr-3">
            #{orderID}
          </span>
          <span className="rounded-md bg-[#FFD124] px-2 py-1 mr-3">
            {service}
          </span>
          <span className="rounded-md bg-[#3A3C3F] px-2 py-1 text-[#FFD124]">
            <img
              className="inline-block mr-1 mb-1"
              src={comboShape}
              alt="icon"
            />
            {distance} km
          </span>
        </div>
        <div>
          <Link to={`/tai-xe/hanh-trinh-don-hang/${id}`}>
            <span className="rounded-md bg-[#3A3C3F] px-2 py-1 text-[#FFD124]">
              <img className="inline-block mr-1" src={SubFollow} alt="i" />
              Theo dõi
            </span>
          </Link>
        </div>
      </div>
      <span className="mr-4">
        <span className="w-3 h-3 bg-[#4BAE4F] inline-block rounded-full mr-1"></span>
        {status == "waiting" ? "Đang thực hiện" : "Đã giao"}
      </span>
      <span className="text-[#cccccc]">{updateDate}</span>

      <div className="flex">
        <div className="flex flex-col items-center justify-between my-2 mr-1">
          <span className="w-2 h-2 bg-[#11468F] rounded-full block"> </span>
          <span className="border-l-2 border-[#11468F] h-11"></span>
          <img src={Subtract} alt="sub" className="" />
        </div>
        <div className="flex flex-col items-start justify-between h-18">
          <p className="mb-8">{provinceSend}</p>
          <p className="mb-0">{provinceDestination}</p>
        </div>
      </div>
      <div>
        <div className="mb-8">
          <div className="w-full bg-[#FFD124] font-semibold text-xl mt-4 py-3 pl-4">
            Thông tin vận chuyển
          </div>
          <div className="bg-[#fff] w-full text-xl font-medium">
            <div className="mx-10 flex items-center">
              <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                Tên đội xe
              </span>
              <span className="py-4"> miền tây</span>
            </div>
            <div className="border-t border-[#cccccc] mx-10 flex items-center">
              <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                Họ và tên tài xế
              </span>
              <span className="py-4"> miền tây</span>
            </div>
            <div className="border-t border-[#cccccc] mx-10 flex items-center">
              <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                Số điện thoại
              </span>
              <span className="py-4"> miền tây</span>
            </div>
            <div className="border-t border-[#cccccc] mx-10 flex items-center">
              <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                Loại xe
              </span>
              <span className="py-4"> miền tây</span>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="w-full bg-[#FFD124] font-semibold text-xl mt-4 py-3 pl-4">
            Thông tin nơi bốc hàng
          </div>
          <div className="bg-[#fff] w-full text-xl font-medium">
            {senderWarehouse ? (
              <div className="mx-10 flex items-center">
                <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                  Tên kho
                </span>
                <span className="py-4">{senderWarehouse}</span>
              </div>
            ) : (
              ""
            )}

            <div className="border-t border-[#cccccc] mx-10 flex items-center">
              <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                Họ và tên
              </span>
              <span className="py-4">{senderName}</span>
            </div>
            <div className="border-t border-[#cccccc] mx-10 flex items-center">
              <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                Số điện thoại
              </span>
              <span className="py-4">{senderPhone}</span>
            </div>
            <div className="border-t border-[#cccccc] mx-10 flex items-center">
              <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                Địa chỉ
              </span>
              <span className="py-4 w-3/4"> {senderAdd}</span>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="w-full bg-[#FFD124] font-semibold text-xl mt-4 py-3 pl-4">
            Thông tin người nhận
          </div>
          <div className="bg-[#fff] w-full text-xl font-medium">
            <div className="mx-10 flex items-center">
              <span className="inline-block w-1/4 text-[#cccccc]">
                Họ và tên
              </span>
              <span className="py-4">{receiverName}</span>
            </div>
            <div className="border-t border-[#cccccc] mx-10 flex items-center">
              <span className="inline-block w-1/4 text-[#cccccc]">
                Số điện thoại
              </span>
              <span className="py-4">{receiverPhone}</span>
            </div>
            <div className="border-t border-[#cccccc] mx-10 flex items-center">
              <span className="inline-block w-1/4 text-[#cccccc]">Địa chỉ</span>
              <span className="py-4 w-3/4">{receiverAdd}</span>
            </div>
          </div>
        </div>
        <div className="mb-8">
          <div className="w-full bg-[#FFD124] font-semibold text-xl mt-4 py-3 pl-4">
            Thông tin vận chuyển
          </div>
          {products.map((product) => (
            <div className="bg-[#fff] w-full text-xl font-medium mb-4">
              <div className="mx-10 flex items-center">
                <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                  Tên hàng hóa
                </span>
                <span className="mr-10 inline-block w-1/3 py-4">
                  {product.name}
                </span>
                <span className="inline-block w-max text-[#cccccc] mr-2">
                  Ghi chú
                </span>
                <span className="py-4">{product.note}</span>
              </div>
              <div className="border-t border-[#cccccc] mx-10 flex items-center">
                <span className="inline-block w-1/4 mr-2 text-[#cccccc]">
                  số lượng
                </span>
                <span className="py-4">{product.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
