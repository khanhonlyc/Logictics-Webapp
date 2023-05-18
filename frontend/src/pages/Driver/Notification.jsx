import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

function NotificationCustomer() {
  const { accessToken, refreshNoti, setMetadata } = useContext(MainContext);
  const [notifications, setNotifications] = useState([]);

  // Set meta data
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Thông báo | TKTL",
      };
    });
  }, [setMetadata]);

  const getNotifications = async () => {
    try {
      const res = await axios.get(`${END_POINT}/notification?limit=10`, {
        headers: { authorization: `Bearer ${accessToken}` },
      });
      res.data.data.length > 0 && setNotifications(() => res.data.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshNoti]);

  return (
    <div className="">
      <div className="bg-gray-100 overflow-y-hidden relative ">
        <div className="flex justify-end align-center m-w-[100%] rounded-sm sm:border-gray-400 sm:border-b-[1px] bg-white sm:pb-1 flex-nowrap ">
          <div className=" m-w-[70px] mx-2 p-1 flex-shrink-0 cursor-pointer mt-2 ">
            <span className=" font-light text-sm md:text-sm text text-black hover:text-yellow-500 ">
              Đánh dấu đã đọc tất cả
            </span>
          </div>
        </div>

        <div className="flex flex-col mt-2  px-4">
          <div className="pt-3 mb-4">
            <h3 className="font-bold mb-1 text-2xl mt-2 uppercase">
              Thông báo
            </h3>
          </div>

          {notifications.map((notification) => (
            <div className="bg-white  mb-3 " key={notification._id}>
              <div className="flex items-center mt-1 sm:mt-2  justify-evenly sm:justify-between  sm:mx-3 md:mx-4 pb-4 md:pb-6 ">
                <div className=" sm:ml-2 flex ">
                  <img
                    className="w-14 h-14 mr-3  sm:w-24 sm:h-24 sm:mr-8"
                    alt="#"
                    src="https://images.squarespace-cdn.com/content/v1/56001a27e4b08aa6c7fa74e1/1560511769633-THRKK2P2TKYE2ZNOLSY9/Notify_Red.png"
                  ></img>
                  <div>
                    <div className="font-medium text-base sm:text-lg mt-1">
                      {notification.title}
                    </div>
                    <div className="font-light text-sm sm:text-base sm:mb-2">
                      {notification.message}
                    </div>
                    <div className="md:text-base">
                      {notification.updatedAt?.split("T")[0].substring(8, 10)}-
                      {notification.updatedAt?.split("T")[0].substring(5, 7)}-
                      {notification.updatedAt?.split("T")[0].substring(0, 4)}
                    </div>
                  </div>
                </div>

                <div className="flex flex-shrink-0">
                  <Link to={notification._id}>
                    <button className="py-2 px-4 mt-2 mb-4 round-md font-extrabold bg-[#ffd124]  hover:translate-y-[-1px] transition-all text-[#00003B] rounded-sm">
                      Chi tiết
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NotificationCustomer;
