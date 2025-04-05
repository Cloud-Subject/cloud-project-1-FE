import React, { useState } from "react";
import styles from "./Header.module.scss";
import classNames from "classnames/bind";
import Logo from "../../../../assets/manager_icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../SearchContext/SearchContext";

const cx = classNames.bind(styles);

function Header() {
  const [searchValue, setSearchValue] = useState<string>("");
  const { setSearchQuery } = useSearch(); // Sử dụng useSearch để set giá trị tìm kiếm

  // Xử lý khi thay đổi input
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  // Xử lý khi nhấn nút Clear
  const handleClear = () => {
    setSearchValue(""); // Xóa input khi nhấn nút Clear
  };

  // Xử lý khi nhấn Enter
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchQuery(searchValue); // Thực hiện tìm kiếm khi nhấn Enter
    }
  };

  // Xử lý khi nhấn nút Search
  const handleSearch = () => {
    setSearchQuery(searchValue); // Thực hiện tìm kiếm khi nhấn nút Search
  };

  return (
    <div className={cx("wrapper")}>
      <img src={Logo} alt="Logo" className={cx("Logo")} />
      <div className={cx("search")}>
        <input
          placeholder="Type name, date, priority to search"
          value={searchValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Lắng nghe sự kiện nhấn phím
        />
        {searchValue && (
          <button className={cx("clear")} onClick={handleClear}>
            <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
          </button>
        )}
        <button className={cx("search-bnt")} onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
      <div className={cx("action")}></div>
    </div>
  );
}

export default Header;
