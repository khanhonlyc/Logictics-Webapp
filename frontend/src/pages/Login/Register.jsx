import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Button, Input, Select, Typography, message, Modal } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../utils/constant";

const RegisForm = styled.div`
  .Regis {
    height: 150vh;
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
      flex-direction: column;
      height: 140vh;
    }
    @media (max-height: 628px) {
      flex-direction: column;
      height: 140vh;
    }
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    background-color: #f9f9f9;
  }
  .Regis-header {
    max-width: 500px;
    width: 100%;
    background-color: #fff;
    padding: 25px 30px;
    margin-top: 10px;
    border-radius: 14px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
    overflow: auto;
  }
  .ant-typography {
    color: #ffd124;
    font-size: 2em;
    font-weight: 500;
    position: relative;
  }
  .ant-input {
    font-size: 1.2em;
  }
  .ant-input-affix-wrapper {
    border: none;
    border-bottom: 1px solid #cfcfcf;
  }
  .sign {
    text-align: right;
  }
  .ant-form-item-label {
    margin-top: 2px;
    display: flex;
    flex: none;
  }
  .ant-form-item-control {
    max-width: unset;
  }
  .ant-form-item-required:after {
    content: none;
  }
`;
const ButtonContainer = styled.div`
  .ant-btn-primary {
    height: 100%;
    width: 100%;
    margin-top: 20px;
    border-radius: 8px;
    border: none;
    color: #fff;
    font-size: 18px;
    font-weight: 600;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    background-color: #ffd124;
    &:hover {
      background-color: #ffd124;
      background-image: linear-gradient(250deg, #f7ce68 0%, #fbab7e 100%);
    }
  }
`;

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const { Title } = Typography;

function Register() {
  const { setMetadata } = useContext(MainContext);
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Đăng kí | TKTL",
      };
    });
    fetchBankAPI();
  }, []);

  const [form] = Form.useForm();
  const emailphone = Form.useWatch("email/phone", form);
  let email;
  let phone = emailphone;

  //valid email
  if (isValidEmail(emailphone)) {
    email = emailphone;
  }


  let name = Form.useWatch("name", form);
  let address = Form.useWatch("address", form);
  let customer_type = Form.useWatch("customer_type", form);
  let tax = Form.useWatch("tax", form);
  let description = Form.useWatch("description", form);
  let password = Form.useWatch("password", form);
  let verify_password = Form.useWatch("confirmPassword", form);
  let bank_name = Form.useWatch("bank_name", form);
  let bank_account_number = Form.useWatch("bank_account_number", form);

  let verify_op;
  email ? (verify_op = "email") : (verify_op = "phone");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [otp, setOtp] = useState(null);
  const [banks, setBanks] = useState([]);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  let navigate = useNavigate();
  //message cua otp submit
  const otp_success = () => {
    message.success({
      content: "Đăng kí thành công",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const otp_failed400 = () => {
    message.error({
      content: "Mã OTP không chính xác",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const otpsubmit = async () => {
    //submit otp
    try {
      const response = await axios({
        method: "post",
        withCredentials: true,
        url: `${END_POINT}/auth/verify-otp`,
        data: {
          otp: otp,
        },
      });
      otp_success();
      navigate("/dang-nhap");
    } catch (error) {
      if (error.message == "Request failed with status code 400") {
        otp_failed400();
      }
      if (error.message == "Request failed with status code 500") {
        failed500();
      }
    }
  };
  //message cua otp update
  const update_success = () => {
    message.success({
      content: "Mã OTP mới đã được gửi đến email hoặc số điện thoại của bạn",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const update_failed400 = () => {
    message.error({
      content: "Gửi lại mã OTP gửi không thành công",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const update_failed404 = () => {
    message.error({
      content: "Quyền xác thực không còn hiệu lực",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const otpupdate = async () => {
    //udate otp
    try {
      const response = await axios({
        method: "get",
        withCredentials: true,
        url: `${END_POINT}/auth/update-otp`,
        param: {
          verify_op: verify_op,
        },
      });
      update_success();
    } catch (error) {
      if (error.message == "Request failed with status code 400") {
        update_failed400();
      }
      if (error.message == "Request failed with status code 404") {
        update_failed404();
      }
      if (error.message == "Request failed with status code 500") {
        failed500();
      }
    }
  };

  //message cua register
  const success = () => {
    message.success({
      content:
        "Mã OTP đã được gửi về email hoặc số điện thoại của bạn, vui lòng nhập mã OTP để xác thực tài khoản",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const business_success = () => {
    message.success({
      content: "Xin vui lòng đợi quản trị viên kích hoạt tài khoản của bạn",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const existed = () => {
    message.error({
      content: "Email hoặc số điện thoại đã tồn tại",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const failed400 = () => {
    message.error({
      content: "Đăng kí không thành công",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const failed500 = () => {
    message.error({
      content: "Lỗi hệ thống",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  const fetchBankAPI = async () => {
    try {
      const res = await axios.get('https://api.vietqr.io/v2/banks')
      if (res.status === 200) {
        setBanks(res.data.data);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onFinish = async () => {
    //disable submit button
    console.log("test spam submit");
    document.getElementById("submit").disabled = true;
    const enableSubmit = () => {
      document.getElementById("submit").disabled = false;
    };
    //submit register form
    try {
      const response = await axios({
        method: "post",
        withCredentials: true,
        url: `${END_POINT}/auth/register`,
        data: {
          name: name,
          email: email,
          phone: phone,
          password: password,
          verify_password: verify_password,
          address: address,
          description: description,
          customer_type: customer_type,
          verify_op: verify_op,
        },
      });
      if (customer_type != "business") {
        success();
        handleShowModal();
        enableSubmit();
      } else {
        business_success();
        enableSubmit();
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
      // document.getElementById("submit").disabled = false;
    } catch (error) {
      if (error.response.data.message == "user is exist") {
        existed();
        enableSubmit();
      }
      if (error.message == "Request failed with status code 400") {
        failed400();
        enableSubmit();
      }
      if (error.message == "Request failed with status code 500") {
        failed500();
        enableSubmit();
      }
    }
  };

  console.log(banks)

  return (
    <div>
      <>
        <div
          className={`${isModalVisible ? `block` : `hidden`
            } overflow-y-auto overflow-x-hidden fixed  z-50 w-full top-0 left-0   h-full bg-[#1114]`}
        >
          <div className="relative min-w-[350px] top-[15%] sm:min-w-[550px]  md:mx-auto flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 min-w-[350px] sm:min-w-[400px] mx-1 ">
              <div className="flex item-center justify-end ">
                <span
                  className="cursor-pointer mr-1 text-2xl"
                  onClick={handleCloseModal}
                >
                  X
                </span>
              </div>

              <div className="pb-6 pt-[6px] px-6 ">
                <h3 className="mb-3 text-xl font-semibold text-gray-900 dark:text-white ">
                  Vui lòng nhập mã OTP, mã sẽ hết hạn sau 1 phút
                </h3>
                <form className="space-y-4">
                  <div>
                    <div className="relative">
                      <input
                        placeholder="Nhập mã OTP"
                        name="OTP"
                        onChange={(e) => setOtp(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white relative"
                      />
                    </div>
                  </div>

                  <div className="text-right dark:text-white">
                    Mã hết hạn?
                    <span className="font-semibold text-blue-700">
                      <Button type="link" onClick={otpupdate}>
                        Gửi lại OTP
                      </Button>
                    </span>
                  </div>

                  <ButtonContainer>
                    <Button block type="primary" onClick={otpsubmit}>
                      Xác nhận
                    </Button>
                  </ButtonContainer>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
      <RegisForm>
        <div className="Regis">
          <div className="Regis-header">
            <Form
              form={form}
              autoComplete="off"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 14 }}
              onFinish={onFinish}
              onFinishFailed={(error) => {
                console.log({ error });
              }}
            >
              <Title level={2} className="text-center">
                Đăng Kí
              </Title>

              <Form.Item
                name="name"
                label=" "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên tài khoản",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Nhập tên tài khoản" />
              </Form.Item>

              <Form.Item
                name="email/phone"
                label=" "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email hoặc số điện thoại",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Nhập email hoặc số điện thoại" />
              </Form.Item>

              <Form.Item
                name="password"
                label=" "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu",
                  },
                  {
                    min: 6,
                    message: "Mật khẩu phải dài hơn 6 chữ số",
                  },
                  {
                    max: 24,
                    message: "Mật khẩu chỉ được tối đa 24 chữ số",
                  },
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Nhập mật khẩu" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label=" "
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Mật khẩu không khớp",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject("Mật khẩu không khớp");
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password placeholder="Xác nhận mật khẩu" />
              </Form.Item>

              <Form.Item
                name="address"
                label=" "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập địa chỉ",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Nhập địa chỉ" />
              </Form.Item>
              <Form.Item
                name="bank_name"
                label=" "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên ngân hàng",
                  },
                ]}
                hasFeedback
              >
                <Select placeholder="Chọn ngân hàng">
                  {banks?.length > 0 &&
                    banks.map((bank) => (
                      <Select.Option value={bank.shortName}>{bank.shortName}</Select.Option>
                    ))
                  }
                </Select>
              </Form.Item>

              <Form.Item
                name="bank_account_number"
                label=" "
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập số tài khoản",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Nhập số tài khoản" />
              </Form.Item>

              <Form.Item
                name="customer_type"
                label=" "
                rules={[
                  {
                    required: true,
                    message: "Xin vui lòng chọn loại khách hàng",
                  },
                ]}
                hasFeedback
              >
                <Select placeholder="Chọn loại khách hàng">
                  <Select.Option value="intermediary">Trung gian</Select.Option>
                  <Select.Option value="business">Doanh nghiệp</Select.Option>
                  <Select.Option value="passers">Khách vãng lai</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item
                className="ml-2.5"
                name="tax"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, tax) {
                      if (
                        (tax &&
                          getFieldValue("customer_type") === "business") ||
                        getFieldValue("customer_type") === "passers" ||
                        getFieldValue("customer_type") === "intermediary"
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Vui lòng nhập mã số thuế nếu là doanh nghiệp"
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input placeholder="Nhập mã số thuế" />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <ButtonContainer>
                  <Button
                    disabled={false}
                    id="submit"
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Đăng kí
                  </Button>
                </ButtonContainer>
              </Form.Item>
              <Form.Item className="mb-0" wrapperCol={{ span: 24 }}>
                <div className="sign">
                  Bạn đã có tài khoản ? {""}
                  <Link to="/dang-nhap" className="font-semibold text-blue-700">
                    Đăng nhập
                  </Link>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
      </RegisForm>
    </div>
  );
}

export default Register;
