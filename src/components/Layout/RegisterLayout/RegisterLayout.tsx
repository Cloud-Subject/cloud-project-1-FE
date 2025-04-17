// src/components/Layout/RegisterLayout/RegisterLayout.tsx
import React from "react";
import styles from "./RegisterLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className={cx("container")}>{children}</div>;
};

export default RegisterLayout;
