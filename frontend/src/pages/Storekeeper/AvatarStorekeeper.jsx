import { Avatar, Dropdown, Menu } from "antd";
import React, { useContext } from "react";
import { IoExitOutline } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { MainContext } from "../../context/MainContext";

function AvatarStorekeeper() {
  const { logoutHandle } = useContext(MainContext);
  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <Link to="/thu-kho/trang-ca-nhan">Quản lý tài khoản</Link>,
          icon: <MdAccountCircle />,
        },
        {
          key: "2",
          label: <div onClick={logoutHandle}>Đăng xuất</div>,
          icon: <IoExitOutline />,
        },
      ]}
    />
  );
  return (
    <>
      <Dropdown overlay={menu}>
        <button type="button" onClick={(e) => e.preventDefault()}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </button>
      </Dropdown>
    </>
  );
}
export default AvatarStorekeeper;
