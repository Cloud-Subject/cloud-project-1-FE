import React, { useState } from "react";
import styles from "./Register.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(true); // có thể ẩn hoặc giữ tuỳ theo mong muốn


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    if (!isActive) {
      alert("Bạn phải kích hoạt tài khoản để đăng ký.");
      return;
    }

    try {
      const response = await axios.post("http://[::1]:9000/auth/register", {
        email,
        password,
        fullName,
        role: "user",
        isActive,
      });


      if (response.status === 201 || response.status === 200) {
        alert("Đăng ký thành công!");
        window.location.href = "/login";
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.message) {
        alert(`Lỗi: ${error.response.data.message}`);
      } else {
        alert("Đăng ký thất bại. Vui lòng thử lại sau.");
      }
      console.error("Lỗi đăng ký:", error);
    }
  };

  return (
    <div className={cx("form-container")}>
      <h2 className={cx("title")}>Đăng Ký</h2>
      <form onSubmit={handleRegister} className={cx("form")}>
        <input
          type="text"
          placeholder="Họ và tên"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <label className={cx("checkbox-label")}>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            style={{ paddingTop: 10, margin: 5 }}
          />
          Kích hoạt tài khoản
        </label>
        <button type="submit">Đăng Ký</button>
      </form>
      <p className={cx("redirect")}>
        Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default Register;
