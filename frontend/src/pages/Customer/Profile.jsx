import React, { useEffect, useRef, useState } from "react";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import SideBar from "../../components/SideBarCustomer";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineEdit
} from "react-icons/ai";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../utils/constant";

export default function Profile() {
  const oldPwRef = useRef(null);
  const newPwRef = useRef(null);
  const verify_passwordRef = useRef(null);
  const [cPassword, setCPassword] = useState({
    oldPw: "",
    newPw: "",
    verify_password: "",
  });
  const { setMetadata, accessToken, user } = useContext(MainContext);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [banks, setBanks] = useState([]);

  const [information, setInformation] = useState({
    name: "Chưa có thông tin",
    address: "Chưa có thông tin",
    companyTaxcode_business: "Chưa có thông tin",
    phone: "Chưa có thông tin",
    email: "Chưa có thông tin",
    bank_name: "Chưa có thông tin",
    bank_account_number: "Chưa có thông tin",
    description: "chưa có thông tin",
  });
  useEffect(() => {
    if (user) {
      const { name, address, companyTaxcode_business, bank_name, bank_account_number, description } = user.role
      setInformation({
        name: name,
        address: address,
        companyTaxcode_business: companyTaxcode_business,
        email: user.email,
        phone: user.phone,
        description: description,
        bank_name: bank_name,
        bank_account_number: bank_account_number
      })
    }
  }, [])

  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Trang cá nhân | TKTL",
      };
    });
    fetchBankAPI();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInformation({ ...information, [name]: value });
    console.log(information);
  };

  const fetchBankAPI = async () => {
    try {
      const res = await axios.get('https://api.vietqr.io/v2/banks')
      if (res.status === 200) {
        setBanks(res.data.data);
        console.log(res.data.data);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    putInformation();
  }

  const putInformation = async () => {
    try {
      const res = await axios({
        method: 'put',
        url: `${END_POINT}/user/customer`,
        data: {
          name: information.name,
          address: information.address,
          taxcode: information.companyTaxcode_business,
          email: information.email,
          phone: information.phone,
          bank_name: information.bank_name,
          bank_account_number: information.bank_account_number,
          description: information.description
        }
      })
      console.log(res);
      alert("Cập nhật thành công");
    } catch (error) {
      console.log(error);
      alert("Cập nhật không thành công");

    }
  }

  return (
    <div>
      <div className=" relative">
        <div className=" relative ">
          <div className="flex justify-start flex-col  border-b-2  pl-4 pb-3 pt-3">
            <div className="text-xl font-bold mb-1 lg:text-2xl mt-2">
              Hồ Sơ Của Tôi
            </div>
            <div className="text-base">Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
          </div>
          <form className=" lg:mx-5 sm:mx-4 md:mx-5 mx-[8px] my-4" action="">
            <div className=" grid grid-cols-2 justify-items-center  ">
              <div className="col-span-1">
                <div className="flex mb-6 sm:py-1 flex-col  ">
                  <div className="flex items-center   justify-start ">
                    <label className=" mr-3 text-yellow-600 lg:text-lg text-base">
                      Tên:
                    </label>
                  </div>
                  <div className="flex  ">
                    <input
                      className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  max-w-[160px] md:min-w-[260px] sm:min-w-[210px] line-clamp-1"
                      type="text"
                      name="name"
                      onChange={handleForm}
                      value={information.name}
                    />
                  </div>
                </div>

                <div className="flex mb-6 sm:py-1 flex-col  ">
                  <div className="flex items-center   justify-start ">
                    <label className=" mr-3 text-yellow-600 lg:text-lg text-base">
                      Email:
                    </label>
                  </div>
                  <div className="flex  ">
                    <input
                      className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  max-w-[160px] md:min-w-[260px] sm:min-w-[210px] line-clamp-1"
                      type="text"
                      name="email"
                      onChange={handleForm}
                      value={information.email}
                    />
                  </div>
                </div>
                <div className="flex mb-6 sm:py-1 flex-col  ">
                  <div className="flex items-center   justify-start ">
                    <label className=" mr-3 text-yellow-600 lg:text-xl text-base">
                      Địa chỉ:
                    </label>
                  </div>
                  <div className="flex  ">
                    <input
                      className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  max-w-[160px] md:min-w-[260px] sm:min-w-[210px] line-clamp-1"
                      type="text"
                      name="address"
                      onChange={handleForm}
                      value={information.address}
                    />
                  </div>
                </div>


              </div>
              <div className="col-span-1 ">
                <div className="flex mb-6 sm:py-1 flex-col  ">
                  <div className="flex items-center   justify-start ">
                    <label className=" mr-3 text-yellow-600 lg:text-lg text-base">
                      Số điện thoại:
                    </label>
                  </div>
                  <div className="flex  ">
                    <input
                      className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  max-w-[160px] md:min-w-[260px] sm:min-w-[210px] line-clamp-1"
                      type="text"
                      name="phone"
                      onChange={handleForm}
                      value={information.phone}
                    />
                  </div>
                </div>
                <div className="flex mb-6 sm:py-1 flex-col  ">
                  <div className="flex items-center   justify-start ">
                    <label className=" mr-3 text-yellow-600 lg:text-lg text-base">
                      Mã số thuế:
                    </label>
                  </div>
                  <div className="flex  ">
                    <input
                      className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  max-w-[160px] md:min-w-[260px] sm:min-w-[210px] line-clamp-1"
                      type="text"
                      name="companyTaxcode_business"
                      onChange={handleForm}
                      value={information.companyTaxcode_business}
                    />
                  </div>
                </div>

                <div className="flex mb-6 sm:py-1 flex-col  ">
                  <div className="flex items-center   justify-start ">
                    <label className=" mr-3 text-yellow-600 lg:text-lg text-base">
                      Tên ngân hàng:
                    </label>
                  </div>
                  <select
                    id="dropdown-ward"
                    name="bank_name"
                    className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  max-w-[160px] md:min-w-[260px] sm:min-w-[210px] line-clamp-1"
                    onChange={handleForm}
                  >
                    <option data-select2-id="select2-data-154-1nut" value="">
                      {information.bank_name}
                    </option>

                    {banks?.length > 0 &&
                      banks.map((bank) => (
                        <option
                          className="text-[#161D25]"
                          value={bank.shortName}
                          key={bank.id}
                        >
                          {bank.shortName}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="flex mb-6 sm:py-1 flex-col  ">
                  <div className="flex items-center   justify-start ">
                    <label className=" mr-3 text-yellow-600 lg:text-lg text-base">
                      Số tài khoản:
                    </label>
                  </div>
                  <div className="flex  ">
                    <input
                      className="outline-none border-[1px] sm:px-2 rounded-md py-[6px] px-1 border-gray-200 text-base  max-w-[160px] md:min-w-[260px] sm:min-w-[210px] line-clamp-1"
                      type="text"
                      name="companyTaxcode_business"
                      onChange={handleForm}
                      value={information.bank_account_number}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-3 ">
              <div className="flex items-center w-2/5  justify-end ">
                <label className="text-gray-500 mr-3  "></label>
              </div>
              <div className="flex">
                <button
                  onClick={handleSubmit}
                  className="py-2 px-4 mt-2 mb-4 round-md font-extrabold bg-[#ffd124]  hover:translate-y-[-1px] transition-all text-[#00003B] rounded-sm"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    /*   </div> */
    /*  </div> */
  );
}
