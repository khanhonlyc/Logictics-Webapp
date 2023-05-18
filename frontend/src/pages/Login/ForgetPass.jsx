import React from "react";
import "antd/dist/antd.css";
import { Form, Button, Input, Typography, message } from "antd";
import styled from "styled-components";
import * as axios from "axios";
import { END_POINT } from "../../utils/constant";
import { Link } from "react-router-dom";

const ForgetForm = styled.div`
  .Forget {
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
    padding-top: 100px;
    padding-bottom: 50px;
    background-color: #f9f9f9;
    overflow: auto;
  }
  .Forget-header {
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
    margin-top: 24px;
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
}
.ant-form-item {
  margin-bottom: 6px;
}
`;

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

const { Title } = Typography;
function ForgetPass() {
  const [form] = Form.useForm();

  const success = () => {
    message.success({
      content: "Mật khẩu mới đã được gửi đến email hoặc số điện thoại của bạn",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const failed404 = () => {
    message.error({
      content: "Email hoặc số điện thoại không tồn tại",
      className: "custom-class",
      style: {
        marginTop: "20vh",
      },
    });
  };
  const failed400 = () => {
    message.error({
      content: "Tạo mật khẩu mới không thành công",
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

  const onFinish = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${END_POINT}/auth/forgot-pw`,
        data: {
          email: email,
          phone: phone,
        },
      });
      success();
    } catch (error) {
      if (error.message == "Request failed with status code 404") {
        failed404();
      }
      if (error.message == "Request failed with status code 400") {
        failed400();
      }
    }
  };
  return (
    <ForgetForm>
      <div className="Forget">
        <div className="Forget-header">
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
              Quên Mật Khẩu
            </Title>

            <Form.Item
              className=""
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

            <Form.Item wrapperCol={{ span: 24 }}>
              <ButtonContainer>
                <Button block type="primary" htmlType="submit">
                  Xác nhận
                </Button>
              </ButtonContainer>
            </Form.Item>
            <Form.Item className="mb-0" wrapperCol={{ span: 24 }}>
              <div className="sign">
                Quay lại trang đăng nhập ? {""}
                <Link to="/dang-nhap" className="font-semibold text-blue-700">
                  Đăng nhập
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </ForgetForm>
  );
}

export default ForgetPass;
