import React from "react";

import classNames from "classnames/bind";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("processes-item")}>
        <button className={cx("filter-processes")}>
          <FontAwesomeIcon icon={faListUl}></FontAwesomeIcon>
        </button>
        Processes
      </div>

      <div className={cx("add-bnt")}>
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
      </div>
    </div>
  );
}

export default Sidebar;
