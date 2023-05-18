import React, { useEffect, useState } from "react";
import Subtract from "../../assets/icons/Subtract.svg";
import Subtract2 from "../../assets/icons/Subtract2.svg";
import comboShape from "../../assets/icons/combo-shape.svg";
import oclock from "../../assets/icons/oclock.svg";
import phone from "../../assets/icons/phone.svg";
import avata from "../../assets/images/avata.png";
import axios from "axios";
import { END_POINT } from "../../utils/constant";
import { useParams } from "react-router-dom";

function OderTrip() {
  const ApiKey =
    "Aj5y-Wjpja4fW8y_yKFw1F1AlDxLIaLh4JykJe5gk26OyR05463nsI9pwOM4EnzY";
  const [orderID, setOrderID] = useState([]);
  const [service, setService] = useState([]);
  const [provinceSend, SetprovinceSend] = useState([]);
  const [provinceDestination, SetprovinceDestination] = useState([]);
  const [distance, setDistance] = useState([]);
  const [senderAddress, setSenderAddress] = useState([]);
  const [receiverAddress, setReceiverAddress] = useState([]);
  const [status, setStatus] = useState([]);
  const [updateDate, setUpdateDate] = useState([]);
  //fake data
  const [receiverPhone, setReceiverPhone] = useState([]);
  const [receiverName, setReceiverName] = useState([]);
  const id = useParams();
  const idOrder = id.ID;

  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(`${END_POINT}/admin/order/${idOrder}`);
      const { data } = res.data;
      //convert type adress
      const addressSender = data.origin.address;
      const newAddressSender = [
        addressSender.street,
        addressSender.ward,
        addressSender.district,
        addressSender.province,
      ]
        .filter((value) => value)
        .join(", ");

      const addressReceiver = data.destination.address;
      const newAddressReceiver = [
        addressReceiver.street,
        addressReceiver.ward,
        addressReceiver.district,
        addressReceiver.province,
      ]
        .filter((value) => value)
        .join(", ");

      setService(data.service.name);
      setOrderID(data.orderId);
      SetprovinceSend(data.origin.address.province);
      SetprovinceDestination(data.destination.address.province);
      setSenderAddress(newAddressSender);
      setReceiverAddress(newAddressReceiver);
      setStatus(data.status);
      setUpdateDate(
        data.updatedAt.split("T")[0].split("-").reverse().join("-")
      );
      //fake data
      setReceiverPhone(data.receiver.phone);
      setReceiverName(data.receiver.name);
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
      <p className="font-bold text-2xl leading-10 my-4">THEO DÕI ĐƠN HÀNG</p>
      <div className="flex justify-around">
        <div className="flex flex-col justify-between w-2/5 mr-2 mb-6">
          <div>
            <div className="font-bold text-base leading-8 mb-3">
              <div className="">
                <div className="rounded-md bg-[#4BAE4F] 2xl:text-2xl 2xl:py-1 2xl:mr-3 px-2 mt-1 mr-2 w-max inline-block">
                  #{orderID}
                </div>
                <div className="rounded-md bg-[#FFD124] 2xl:text-2xl 2xl:py-1 2xl:mr-3 px-2 mt-1 mr-2 w-max inline-block">
                  {service}
                </div>
                <div className="rounded-md bg-[#3A3C3F] 2xl:text-2xl 2xl:py-1 px-2 mt-1 text-[#FFD124] w-max inline-block">
                  <img
                    className="inline-block mr-1 mb-1"
                    src={comboShape}
                    alt="i"
                  />
                  {distance} km
                </div>
              </div>
            </div>
            <span className="mr-4">
              <span className="w-3 h-3 bg-[#4BAE4F] inline-block rounded-full mr-1"></span>
              {status == "waiting" ? "Đang thực hiện" : "Đã giao"}
            </span>
            <span className="text-[#cccccc]">{updateDate}</span>
            <div className="flex">
              <div className="flex flex-col items-center justify-between my-2 mr-1">
                <span className="w-2 h-2 bg-[#11468F] rounded-full block">
                  {" "}
                </span>
                <span className="border-l-2 border-[#11468F] h-11"></span>
                <img src={Subtract} alt="sub" className="" />
              </div>
              <div className="flex flex-col items-start justify-between h-18">
                <p className="mb-8">{provinceSend}</p>
                <p className="mb-0">{provinceDestination}</p>
              </div>
            </div>
          </div>
          <div className="bg-[#3A3C3F] text-[#F9F9F9] mt-4">
            <div className="flex justify-around border-b-[0.5px] border-[#F9F9F9] border-solid py-4 mb-4">
              <div className="flex">
                <div className="inline-block mr-2 pt-1">
                  <img src={oclock} />
                </div>
                <div className="inline-block">
                  <span className="font-bold text-lg">35 Phút</span>
                  <p className="mb-0 font-normal text-sm">Thời gian dự kiến</p>
                </div>
              </div>
              <div className="flex">
                <div className="inline-block mr-2 pt-1">
                  <img src={Subtract2} />
                </div>
                <div className="inline-block">
                  <span className="font-bold text-lg">
                    {provinceDestination}
                  </span>
                  <p className="mb-0 font-normal text-sm">Nơi dở hàng</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center px-4 mb-5">
              <div className="rounded-full mr-3 w-14 h-14">
                <img src={avata} alt="avatar" />
              </div>
              <div className="flex-1">
                <p className="mb-0 font-bold text-lg">{receiverName}</p>
                <p className="mb-0 font-normal text-sm">Người dỡ hàng</p>
              </div>
              <div className="group cursor-pointer flex bg-[#FFD124] w-max min-w-[3.5rem] h-14 rounded-2xl ml-2">
                <span className="hidden group-hover:flex text-[#3A3C3F] text-xl font-semibold m-auto mx-2">
                  {receiverPhone}
                </span>
                <img className="m-auto w-8 h-8" src={phone} alt="call" />
              </div>
            </div>
            <div className="flex justify-center items-center px-4 pb-4">
              <div className="rounded-full mr-3 w-14 h-14">
                <img src={avata} alt="avatar" />
              </div>
              <div className="flex-1">
                <p className="mb-0 font-bold text-lg">{receiverName}</p>
                <p className="mb-0 font-normal text-sm">Người bốc hàng</p>
              </div>
              <div className="group cursor-pointer flex bg-[#FFD124] w-max min-w-[3.5rem] h-14 rounded-2xl ml-2">
                <span className="hidden group-hover:flex text-[#3A3C3F] text-xl font-semibold m-auto mx-2">
                  {receiverPhone}
                </span>
                <img className="m-auto w-8 h-8" src={phone} alt="call" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end">
          <iframe
            className="relative mb-6 border-solid border-[#3A3C3F]"
            width="450"
            height="450"
            style={{ border: 2 }}
            src={`https://dev.virtualearth.net/REST/v1/Imagery/Map/Road/Routes?wp.0=${senderAddress}&wp.1=${receiverAddress}&mapSize=450,450&key=${ApiKey}`}
            scrolling="no"
          ></iframe>
          <a
            className="absolute w-[450px] h-[450px] mb-6"
            target="_blank"
            rel="noreferrer noopener"
            href={`https://www.google.com/maps/dir/?api=1&origin=${senderAddress}&destination=${receiverAddress}&travelmode=driving`}
          ></a>
        </div>
      </div>
    </div>
  );
}

export default OderTrip;
