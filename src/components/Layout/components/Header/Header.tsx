import React, { useState } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Logo from "../../../../assets/manager_icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Header() {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleChange = (even: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(even.target.value);
  };

  const handleClear = () => {
    setSearchValue(""); // Xoá input khi nhấn nút Clear
  };

  return (
    <div className={cx("wrapper")}>
      <img src={Logo} alt="Logo" className={cx("Logo")} />
      <div className={cx("search")}>
        <input
          placeholder="Type name , date , priority to search"
          value={searchValue}
          onChange={handleChange}
        />
        {searchValue && (
          <button className={cx("clear")} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
          </button>
        )}
        <button className={cx("search-bnt")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className={cx("action")}></div>
    </div>
  );
}

export default Header;
