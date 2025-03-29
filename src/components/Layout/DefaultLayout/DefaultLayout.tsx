import React, { useEffect, useState } from "react";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import AddModel from "../components/AddModel/AddModel";

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {}, [setIsModalOpen]);
  return (
    <div className={cx("wrapper")}>
      <Header></Header>
      <div className={cx("container")}>
        <Sidebar onOpenModal={() => setIsModalOpen(true)}></Sidebar>
        <div className={cx("content")}>{children}</div>
        {isModalOpen && <AddModel onClose={() => setIsModalOpen(false)} />}
      </div>
    </div>
  );
}

export default DefaultLayout;
