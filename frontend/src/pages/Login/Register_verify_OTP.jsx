import React, { useState } from "react";
import "antd/dist/antd.css";
import { Form, Button, Input, message } from "antd";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import * as axios from "axios";
import { END_POINT } from "../../utils/constant";

const Register_OTP_Form = styled.div`
  .Register_OTP {
    height: 100vh;
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
      flex-direction: column;
    }
    @media (max-height: 628px) {
      flex-direction: column;
    }
    justify-content: center;
    align-items: center;
    padding-bottom: 50px;
    background-color: #f9f9f9;
    overflow: auto;
  }

  .Register_OTP-header {
    max-width: 500px;
    width: 100%;
    background-color: #fff;
    padding: 25px 30px;
    border-radius: 14px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
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
  .ant-select {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
      rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
      rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;
  }
  .sign {
    text-align: right;
  }
  a {
    color: #348ceb;
  }
  .notification {
    text-align: center;
    padding-bottom: 30px;
    font-size: 20px;
  }
  .ant-row {
    justify-content: center;
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

function Register_OTP() {
  const [form] = Form.useForm();

  let navigate = useNavigate();

  const success = () => {
    message.success({
      content: "Đăng kí thành công",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

  const failed400 = () => {
    message.error({
      content: "Mã OTP không chính xác",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };

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

  const OTP = Form.useWatch("OTP", form);
  const regis_data = useLocation();
  const user = regis_data.state;

  const Update_OTP = async () => {
    try {
      console.log(user);
      const response = await axios({
        method: "post",
        url: `${END_POINT}/auth/update-otp`,
        data: {
          userId: user.userId,
          verify_op: user.verify_op,
        },
      });
      update_success();
    } catch (error) {
      if (error.message == "Request failed with status code 400") {
        update_failed400();
      }
    }
  };

  const onFinish = async () => {
    console.log(user);
    try {
      const response = await axios({
        method: "post",
        url: `${END_POINT}/auth/verify-otp`,
        data: {
          userId: user.userId,
          otp: OTP,
        },
      });
      console.log(response);
      success();
      navigate("/dang-nhap");
    } catch (error) {
      if (error.message == "Request failed with status code 400") {
        failed400();
      }
    }
  };
  return (
    <Register_OTP_Form>
      <div className="Register_OTP">
        <div className="Register_OTP-header">
          <Form
            form={form}
            q
            autoComplete="off"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 14 }}
            onFinish={onFinish}
            onFinishFailed={(error) => {
              console.log({ error });
            }}
          >
            <div className="notification">
              Quý khách vui lòng xác thực mã OTP, mã có thời hạn là 1 phút
            </div>
            <Form.Item name="OTP">
              <Input placeholder="Nhập mã OTP" />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <div className="sign">
                Mã hết hạn?
                <span className="font-semibold text-blue-700">
                  <Button type="link" onClick={Update_OTP}>
                    Gửi lại OTP
                  </Button>
                </span>
              </div>
            </Form.Item>

            <Form.Item className="mb-0" wrapperCol={{ span: 24 }}>
              <ButtonContainer>
                <Button block type="primary" htmlType="submit">
                  Xác nhận
                </Button>
              </ButtonContainer>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Register_OTP_Form>
  );
}

export default Register_OTP;
