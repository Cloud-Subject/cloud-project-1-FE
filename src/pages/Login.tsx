// src/pages/Login.tsx
import React, { useState } from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      // Ví dụ: res.data.token là token trả về từ server
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/"); // chuyển hướng về trang chính
      } else {
        alert("Sai thông tin đăng nhập!");
      }
    } catch (error) {
      alert("Lỗi đăng nhập!");
      console.error("Login error:", error);
    }
  };

  return (
    <div className={cx("form-container")}>
      <h2 className={cx("title")}>Đăng Nhập</h2>
      <form onSubmit={handleLogin} className={cx("form")}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng Nhập</button>
      </form>
      <p className={cx("redirect")}>
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
    </div>
  );
};

export default Login;
