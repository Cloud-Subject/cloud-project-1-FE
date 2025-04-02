import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import SearchContext from "../components/SearchContext/SearchContext";
import { useState } from "react";

const cx = classNames.bind(styles);

interface DefaultLayoutProps {
  children: React.ReactNode;
  onOpenModal: () => void;
  onSort: (sortType: string) => void; // Truyền hàm sắp xếp từ App
}

function DefaultLayout({ children, onOpenModal, onSort }: DefaultLayoutProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  console.log("onSort trong DefaultLayout:", onSort);

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      <div className={cx("wrapper")}>
        <Header />
        <div className={cx("container")}>
          <Sidebar onOpenModal={onOpenModal} onSort={onSort} />
          <div className={cx("content")}>{children}</div>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default DefaultLayout;
