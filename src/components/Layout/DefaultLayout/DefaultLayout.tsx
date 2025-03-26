import React from "react";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className={cx("wrapper")}>
      <Header></Header>
      <div className={cx("container")}>
        <Sidebar></Sidebar>
        <div className={cx("content")}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
