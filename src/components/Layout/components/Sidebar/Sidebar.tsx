import React from "react";

import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

interface sidebarProps {
  onOpenModal: () => void;
}

function Sidebar({ onOpenModal }: sidebarProps) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("processes-item")}>
        <button className={cx("filter-processes")}>
          <FontAwesomeIcon icon={faListUl}></FontAwesomeIcon>
        </button>
        Processes
      </div>

      <button className={cx("add-bnt")} onClick={onOpenModal}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </button>
    </div>
  );
}

export default Sidebar;
