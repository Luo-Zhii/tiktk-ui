import React, { useState } from "react";
import { Button, Divider, Form, Input, Select, message, notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Auth.module.scss";
import { callRegister } from "../../../config/api";
import routesConfig from "../../../config/routes";

const { Option } = Select;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);

  const onFinish = async (values) => {
    const { name, email, password, age, gender, address } = values;
    setIsSubmit(true);
    try {
      const res = await callRegister(name, email, password, +age, gender, address);

      // nếu backend trả về data._id là thành công
      if (res.data?._id) {
        message.success("Đăng ký tài khoản thành công!");
        window.location.href = 'http://localhost:5173/tiktk-ui/login';
      } else {
        notification.error({
          message: "Có lỗi xảy ra",
          description: Array.isArray(res.error)
            ? res.error[0]
            : res.error ?? res.message,
          duration: 5,
        });
      }
    } catch (err) {
      notification.error({
        message: "Đăng ký thất bại",
        description: err.response?.data?.message || err.message || "Lỗi server",
        duration: 5,
      });
    } finally {
      setIsSubmit(false);
    }
  };

  return (
    <div className={styles["register-page"]}>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.wrapper}>
            <div className={styles.heading}>
              <h2 className={`${styles.text} ${styles["text-large"]}`}>Đăng Ký Tài Khoản</h2>
              <Divider />
            </div>
            <Form
              name="register"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Họ tên"
                name="name"
                rules={[{ required: true, message: "Họ tên không được để trống!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Email không được để trống!" }]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="Mật khẩu"
                name="password"
                rules={[{ required: true, message: "Mật khẩu không được để trống!" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Tuổi"
                name="age"
                rules={[{ required: true, message: "Tuổi không được để trống!" }]}
              >
                <Input type="number" />
              </Form.Item>

              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Giới tính không được để trống!" }]}
              >
                <Select allowClear>
                  <Option value="male">Nam</Option>
                  <Option value="female">Nữ</Option>
                  <Option value="other">Khác</Option>
                </Select>
              </Form.Item>


              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit} block>
                  Đăng ký
                </Button>
              </Form.Item>

              <Divider>Or</Divider>

              <p className="text text-normal">
                Đã có tài khoản?{" "}
                <Link to={routesConfig.login} style={{ color: '#fe2c55', fontWeight: '600', textDecoration: 'underline' }}>
                  Đăng Nhập
                </Link>
              </p>
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
