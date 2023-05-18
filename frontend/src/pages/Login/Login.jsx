import React, { useContext, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Button, Input, Typography, message } from "antd";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { MainContext } from "../../context/MainContext";
import axios from "axios";
import { END_POINT } from "../../utils/constant";

const LoginForm = styled.div`
  .Login {
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
  .Login-header {
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

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const { Title } = Typography;

function Login() {
  const { setMetadata } = useContext(MainContext);
  useEffect(() => {
    setMetadata((prev) => {
      return {
        ...prev,
        title: "Đăng nhập | TKTL",
      };
    });
  }, []);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { loginHandle } = useContext(MainContext);
  const success = () => {
    message.success({
      content: "Đăng nhập thành công",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
    navigate(-1);
  };
  const failed403 = () => {
    message.error({
      content: "Role của bạn chưa được xác nhận, từ chối đăng nhập",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const failed400 = () => {
    message.error({
      content: "Email, số điện thoại hoặc mật khẩu không đúng",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const emailphone = Form.useWatch("email/phone", form);
  let email;
  let phone;
  isValidEmail(emailphone) ? (email = emailphone) : (phone = emailphone);
  let password = Form.useWatch("password", form);

  const onFinish = async () => {
    try {
      const response = await axios.post(`${END_POINT}/auth/login`, {
        email: email,
        phone: phone,
        password: password,
      });
      success();
      const { data } = response.data;
      loginHandle(data.accessToken, data.refreshToken, data.user);
    } catch (error) {
      if (error.message === "Request failed with status code 403") {
        failed403();
      }
      if (error.message === "Request failed with status code 400") {
        failed400();
      }
    }
  };
  return (
    <LoginForm>
      <div className="Login">
        <div className="Login-header">
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
              Đăng Nhập
            </Title>

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

            <Form.Item wrapperCol={{ span: 24 }} className="relative">
              <div className="sign relative">
                <Link
                  to="/quen-mat-khau"
                  className="font-semibold text-blue-700"
                >
                  Quên mật khẩu
                </Link>

              </div>
              <div className="absolute bottom-1/2 translate-y-1/2">
                <Link
                  to="/dang-nhap-nhan-vien"
                  className="font-semibold text-blue-700 "
                >
                  Đăng nhập nhân viên
                </Link>
              </div>
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              <ButtonContainer>
                <Button block type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </ButtonContainer>
            </Form.Item>
            <Form.Item className="mb-0" wrapperCol={{ span: 24 }}>
              <div className="sign">
                Bạn chưa có tài khoản ? {""}
                <Link to="/dang-ki" className="font-semibold text-blue-700">
                  Đăng kí
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </LoginForm>
  );
}

export default Login;
