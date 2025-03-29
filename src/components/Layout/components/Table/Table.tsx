import React, { useEffect, useState } from "react";

import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const cx = classNames.bind(styles);

interface taskType {
  id: number;
  name_task: string;
  due_date: string;
  priority: number;
  is_done: boolean;
  description: string;
}

const baseURL = "http://localhost:3000/api/tasks";
const baseURL2 = "http://localhost:3000/api/delete";

const ITEMS_PER_PAGE = 16;

function Table() {
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get<taskType[]>(baseURL)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error("Can not get data", error);
      });
  }, []);

  // Tính tổng số trang
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  // Lấy dữ liệu của trang hiện tại
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = tasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa task này không?")) return;

    try {
      await axios.delete(`${baseURL2}/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id)); // Cập nhật UI ngay lập tức
      alert("Xóa task thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
      alert("Lỗi khi xóa task!");
    }
  };

  return (
    <div>
      <div className={cx("wrapper")}>
        <table className={cx("table-processes")}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Due date</th>
              <th>Priority</th>
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
                  <td>{item.name_task}</td>
                  <td>{item.due_date}</td>
                  <td>{item.priority}</td>
                  <td>{item.is_done ? "Complete" : "Unfinished"}</td>
                  <button
                    className={cx("delete-bnt", {
                      even: stt % 2 === 0,
                      odd: stt % 2 !== 0,
                    })}
                    onClick={() => handleDelete(item.id)}
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
