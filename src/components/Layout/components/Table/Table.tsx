import React, { useState } from "react";
import styles from "./Table.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TaskType as taskType } from "../../../../models/typeTask";
import EditModal from "../EditModal/EditModal";
import { useSearch } from "../SearchContext/SearchContext"; // Import useSearch để lấy searchQuery

const cx = classNames.bind(styles);

interface TableProps {
  tasks: taskType[];
  setTasks: React.Dispatch<React.SetStateAction<taskType[]>>;
  handleDelete: (id: number) => void;
}

const ITEMS_PER_PAGE = 12;

function Table({ tasks, handleDelete, setTasks }: TableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingTask, setEditingTask] = useState<taskType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { searchQuery } = useSearch(); // Lấy searchQuery từ context

  // Tính tổng số trang
  const totalPages = Math.ceil(tasks.length / ITEMS_PER_PAGE);

  // Lọc các task dựa trên searchQuery
  const filteredTasks = tasks.filter((task) => {
    const lowerSearchQuery = searchQuery?.toLowerCase();
    return (
      task.title.toLowerCase().includes(lowerSearchQuery) ||
      task.dueDate.toLowerCase().includes(lowerSearchQuery)

    );
  });

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filteredTasks.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleEdit = (task: taskType) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  return (
    <div>
      {isEditModalOpen && editingTask && (
        <EditModal
          task={editingTask}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={(updatedTask) => {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              )
            );
          }}
        />
      )}
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
                  <td>{item.title}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.priority}</td>
                  <td>{item.status}</td>
                  <td>
                    <button
                      className={cx("delete-bnt", {
                        even: stt % 2 === 0,
                        odd: stt % 2 !== 0,
                      })}
                      onClick={() =>
                        item.id !== undefined && handleDelete(item.id)
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                    <button
                      className={cx("edit-bnt")}
                      onClick={() => handleEdit(item)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
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
