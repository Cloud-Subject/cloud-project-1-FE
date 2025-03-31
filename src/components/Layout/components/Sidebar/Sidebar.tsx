import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

interface SidebarProps {
  onOpenModal: () => void;
  onSort: (sortType: string) => void; // Hàm callback để thực hiện sắp xếp
}

function Sidebar({ onOpenModal, onSort }: SidebarProps) {
  const [isFilterVisible, setFilterVisible] = useState(false); // Trạng thái hiển thị filter

  // Hàm mở/đóng cửa sổ filter
  const toggleFilter = () => {
    setFilterVisible((prev) => !prev);
  };

  console.log("onSort trong Sidebar:", onSort);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("processes-item")}>
        <button className={cx("filter-processes")} onClick={toggleFilter}>
          <FontAwesomeIcon icon={faListUl}></FontAwesomeIcon>
        </button>
        Processes
      </div>

      {/* Cửa sổ filter */}
      <div className={cx("filter-modal", { show: isFilterVisible })}>
        <div
          className={cx("filter-option")}
          onClick={() => {
            onSort("due_date_asc");
            setFilterVisible(false);
          }}
        >
          Filter by Due Date (Ascending)
        </div>
        <div
          className={cx("filter-option")}
          onClick={() => {
            onSort("priority_asc");
            setFilterVisible(false);
          }}
        >
          Filter by Priority (Ascending)
        </div>
      </div>

      <button className={cx("add-bnt")} onClick={onOpenModal}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </button>
    </div>
  );
}

export default Sidebar;
