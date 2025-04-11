import React from "react";
import classNames from "classnames/bind";
import styles from "./LoginLayout.module.scss";

const cx = classNames.bind(styles);

interface LoginLayoutType {
  children: React.ReactNode;
}

function LoginLayout({ children }: LoginLayoutType) {
  return <div className={cx("container")}>{children}</div>;
}

export default LoginLayout;
