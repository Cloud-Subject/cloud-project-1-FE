import React, { useState } from "react";

import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const testData = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    dueDate: "2025-04-01",
    priority: "Cao",
    status: "Đang xử lý",
  },
  {
    id: 2,
    name: "Trần Thị B",
    dueDate: "2025-04-05",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 3,
    name: "Phạm Văn C",
    dueDate: "2025-04-10",
    priority: "Thấp",
    status: "Chờ xử lý",
  },
  {
    id: 4,
    name: "Lê Thị D",
    dueDate: "2025-04-15",
    priority: "Cao",
    status: "Đang xử lý",
  },
  {
    id: 5,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 6,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 7,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 8,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 9,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 10,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 11,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 12,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 13,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 14,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 15,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 16,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 17,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 18,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
  {
    id: 19,
    name: "Hoàng Văn E",
    dueDate: "2025-04-20",
    priority: "Trung bình",
    status: "Hoàn thành",
  },
];

const ITEMS_PER_PAGE = 16;

function Table() {
  const [currentPage, setCurrentPage] = useState(1);

  // Tính tổng số trang
  const totalPages = Math.ceil(testData.length / ITEMS_PER_PAGE);

  // Lấy dữ liệu của trang hiện tại
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = testData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <div className={cx("wrapper")}>
        <table className={cx("table-processes")}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Due date</th>
              <th>priority</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index) => {
              const stt = startIndex + index + 1;
              return (
                <tr
                  key={item.id}
                  className={cx({ even: stt % 2 === 0, odd: stt % 2 !== 0 })}
                >
                  <td>{startIndex + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.priority}</td>
                  <td>{item.status}</td>
                  <button
                    className={cx("delete-bnt", {
                      even: stt % 2 === 0,
                      odd: stt % 2 !== 0,
                    })}
                  >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                  </button>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className={cx("pagination")}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={cx({ active: currentPage === index + 1 })}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            »
          </button>
        </div>
      )}
    </div>
  );
}

export default Table;
