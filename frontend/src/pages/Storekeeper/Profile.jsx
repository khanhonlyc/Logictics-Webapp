import { message } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import isMobilePhone from "validator/lib/isMobilePhone";
import { MainContext } from "../../context/MainContext";
import { END_POINT } from "../../utils/constant";

const Profile = () => {
  // Get context
  const { setMetadata, user, accessToken } = useContext(MainContext);
  // Initial state
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEdited, setIsEdited] = useState(false);

  // Set meta data
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Trang cá nhân | TKTL",
      };
    });
  }, [setMetadata]);

  // Set form
  useEffect(() => {
    if (user) {
      const { email, phone, name } = user;

      setForm((prevForm) => ({ ...prevForm, email, phone, name }));
    }
  }, [user]);

  // Validate form
  const validateForm = () => {
    const { name, email, phone } = form;

    if (isEmpty(name) || isEmpty(email) || isEmpty(phone)) {
      message.error({
        content: "Vui lòng nhập đầy đủ thông tin",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      return false;
    }

    if (!isEmail(email)) {
      message.error({
        content: "Email không hợp lệ",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      return false;
    }

    if (!isMobilePhone(phone, "vi-VN")) {
      message.error({
        content: "Số điện thoại không hợp lệ",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
      return false;
    }

    return true;
  };

  // Handle change input
  const handleForm = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Handle edit when user click edit button
  const handleEdit = () => {
    setIsEdited(true);
  };

  // Handle cancel when user click cancel button
  const handleCancel = () => {
    setIsEdited(false);
  };

  // Handle update when user click update button
  const handleUpdate = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    try {
      await axios.put(`${END_POINT}/user/staff/${user.id}`, form, {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      setIsEdited(false);

      message.success({
        content: "Cập nhật thông tin thành công",
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
    } catch ({ response }) {
      message.error({
        content: response.data.message,
        className: "custom-class",
        style: {
          marginTop: "20vh",
        },
      });
    }
  };

  // Format date to HH:mm:ss DD/MM/YYYY with moment
  const formatDate = (date) => moment(date).format("HH:mm:ss DD/MM/YYYY");

  return (
    <div className="md:px-8">
      {/* Title page section */}
      <div className="border-b-2 flex items-center justify-between">
        <h2
          className="text-xl font-bold mb-1 lg:text-2xl mt-2 text-[#3A3C3F]"
          title="Thông tin cá nhân"
        >
          Thông tin cá nhân
        </h2>

        <button type="button" onClick={handleEdit}>
          <AiFillEdit
            className="w-6 h-6 text-[#3A3C3F]"
            title="Chỉnh sửa vai trò"
          />
        </button>
      </div>

      {/* Form render data when isEdited = true and form edit data when isEdited = false */}
      <form
        className="bg-white px-2 py-4 md:p-4 rounded-md mt-8 grid grid-cols-1 md:grid-cols-2"
        onSubmit={handleUpdate}
      >
        <Input
          type="text"
          label="Tên"
          name="name"
          value={form.name}
          readOnly={!isEdited}
          handleForm={handleForm}
        />

        <Input
          type="email"
          label="Email"
          name="email"
          value={form.email}
          readOnly={!isEdited}
          handleForm={handleForm}
        />

        <Input
          type="text"
          label="Số điện thoại"
          name="phone"
          value={form.phone}
          readOnly={!isEdited}
          handleForm={handleForm}
        />

        <Input
          type="text"
          label="Tên vai trò"
          name="name"
          value={user.role.name}
          readOnly={true}
          handleForm={handleForm}
        />

        <Input
          type="text"
          label="Loại vai trò"
          name="staff_type"
          value={user.role.staff_type}
          readOnly={true}
          handleForm={handleForm}
        />

        <Input
          type="text"
          label="Ngày tạo"
          name="createdAt"
          value={formatDate(user.role.createdAt)}
          readOnly={true}
          handleForm={handleForm}
        />

        <Input
          type="text"
          label="Ngày cập nhật"
          name="updatedAt"
          value={formatDate(user.role.updatedAt)}
          readOnly={true}
          handleForm={handleForm}
        />

        {/* Render update and cancel button when isEdited = true */}
        {isEdited && (
          <div className="flex items-center justify-around">
            <button
              type="button"
              onClick={handleCancel}
              className=" rounded-lg font-extrabold bg-[#28303F] w-[150px] px-4 py-2 transition-all hover:scale-105 active:scale-100 text-[#FFD124]"
            >
              Hủy bỏ
            </button>

            <button
              type="submit"
              onClick={handleUpdate}
              className=" rounded-lg font-extrabold bg-[#FFD124] w-[150px] px-4 py-2 transition-all hover:scale-105 active:scale-100 text-[#28303F]"
            >
              Cập nhật
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

// Components
const Input = ({ type, label, name, value, readOnly, handleForm }) => (
  <div
    className={`my-4 mx-0 md:mx-[20px] relative ${
      readOnly ? "border-b-2" : "border-b-0"
    }`}
  >
    <label
      htmlFor={name}
      className={`absolute left-2 font-semibold bg-white px-1 transition-all ${
        readOnly
          ? "text-gray-400 text-[15px] top-[-15px]"
          : "text-[#3A3C3F] text-[14px] top-[-11px]"
      }`}
    >
      {label}
    </label>

    <input
      type={type}
      id={name}
      name={name}
      value={value}
      readOnly={readOnly}
      onChange={handleForm}
      className={`outline-none ${
        readOnly ? "border-none ml-8 font-semibold mt-1" : "border-[1px] px-4"
      } rounded-md py-[6px] border-[#3A3C3F] text-base w-[100%] line-clamp-1 h-11 transition-all text-[#3A3C3F]`}
    />
  </div>
);

export default Profile;
