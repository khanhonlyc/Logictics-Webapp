import { Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import {
  IoArrowForwardCircleOutline,
  IoNotificationsOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { MdPolicy } from "react-icons/md";
import { Link, Navigate, Outlet } from "react-router-dom";
import SideBar from "../components/SideBarDriver";
import { MainContext } from "../context/MainContext";
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem(
    <div>
      <Link to="/tai-xe/trang-ca-nhan">
        <div className="text-base font-medium">Tài khoản</div>
      </Link>
    </div>,
    "1",
    <IoPersonOutline className="text-xl ml-[-26px] md:ml-[-16px] lg:ml-0" />
  ),

  getItem(
    <div>
      <Link to="/tai-xe/dat-hang">
        <div className="text-base font-medium">Danh sách hóa đơn</div>
      </Link>
    </div>,
    "2",
    <BsHandbag className="text-xl ml-[-26px] md:ml-[-16px] lg:ml-0" />
  ),

  getItem(
    <div>
      <Link to="/tai-xe/thong-bao">
        <div className="text-base font-medium">Thông báo</div>
      </Link>
    </div>,
    "3",
    <IoNotificationsOutline className="text-xl ml-[-26px] md:ml-[-16px] lg:ml-0" />
  ),

  getItem(
    <div>
      <Link to="/tai-xe/chinh-sach">
        <div className="text-base font-medium">Chính sách</div>
      </Link>
    </div>,
    "4",
    <MdPolicy className="text-xl ml-[-26px] md:ml-[-16px] lg:ml-0" />
  ),
];

function DriverRoute() {
  const { user } = useContext(MainContext);
  const [open, setOpen] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const handleOpen = () => {
    setOpen(!open);
  };
  console.log(user);

  useEffect(() => {
    const getWidth = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", getWidth);
    if (width >= 640) {
      setOpen(false);
    }
    return () => {
      window.removeEventListener("resize", getWidth);
    };
  }, [width]);

  if (user && user?.role.staff_type === "driver") {
    return (
      <>
        <SideBar handleOpen={handleOpen} open={open} />
        <div>
          <span
            onClick={() => handleOpen()}
            className="sm:hidden w-9 h-9 z-100 fixed top-[10%] left-[0%] z-3 transition sm:top-[11%]  lg:top-[15%]"
          >
            <IoArrowForwardCircleOutline
              className="w-7 h-7 z-100   "
              onClick={() => handleOpen()}
            />
          </span>
        </div>

        <div className=" relative md:mx-5 lg:mx-36 py-4 bg-gray-white mx-2  grid grid-cols-9 mb-2">
          <div className="hidden sm:block sm:col-span-2">
            <div
              style={{
                width: "95%",
                backgroundColor: "white",
                height: "100%",
              }}
            >
              <div className=" mb-2 border-b-[1px] border-gray-500 ">
                <div className="text-center">Chào mừng</div>
                <div className="md:text-xl sm:text-lg  text-center font-semibold text-[#00003B]">
                  {user.role.name}
                </div>
              </div>
              <Menu
                theme=""
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={items}
              />
            </div>
          </div>
          <div className="col-span-9 sm:col-span-7 bg-[#f8faff] rounded-lg   ">
            <Outlet></Outlet>
          </div>
        </div>
      </>
    );
  }
  return <Navigate to="/dang-nhap-nhan-vien" />;
}
export default DriverRoute;
