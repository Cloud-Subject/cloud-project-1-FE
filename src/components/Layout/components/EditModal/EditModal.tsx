import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./EditModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { TaskType, TaskStatus } from "../../../../models/typeTask";

const cx = classNames.bind(styles);
const baseURL = "http://[::1]:9000/tasks";

interface ModalProps {
  task: TaskType;
  onClose: () => void;
  onUpdate: (updatedTask: TaskType) => void;
}

function EditModal({ task, onClose, onUpdate }: ModalProps) {
  const [editedTask, setEditedTask] = useState<TaskType>({
    ...task,
    dueDate: task.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setEditedTask((prev) => ({
      ...prev,
      [name]: name === "priority" ? Number(value) : value,
    }));
  };

  const handleStatusChange = (status: TaskStatus) => {
    setEditedTask((prev) => ({ ...prev, status }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Không tìm thấy token, vui lòng đăng nhập lại.");
      return;
    }

    try {
      const requestBody = {
        ...editedTask,
        dueDate: new Date(editedTask.dueDate),
      };

      const response = await axios.put(`${baseURL}/${task.id}`, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Cập nhật thành công!");
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Lỗi khi cập nhật!");
    }
  };

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal")}>
        <div className={cx("modal-header")}>
          <FontAwesomeIcon icon={faListUl} className={cx("icon")} />
          <span className={cx("modal-title")}>Edit Task</span>
          <button className={cx("close-btn")} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form className={cx("modal-body")} onSubmit={handleSubmit}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            required
          />

          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={editedTask.dueDate}
            onChange={handleChange}
            required
          />

          <label>Priority</label>
          <select
            name="priority"
            value={editedTask.priority}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value={1}>1 - High</option>
            <option value={2}>2 - Medium</option>
            <option value={3}>3 - Low</option>
          </select>

          <label>Status</label>
          <div className={cx("radio-group")}>
            {Object.values(TaskStatus).map((status) => (
              <label key={status} className={cx("radio-item")}>
                <input
                  type="radio"
                  name="status"
                  value={status}
                  checked={editedTask.status === status}
                  onChange={() => handleStatusChange(status)}
                />
                {status.replace("_", " ")}
              </label>
            ))}
          </div>

          <label>Description</label>
          <textarea
            name="description"
            value={editedTask.description || ""}
            onChange={handleChange}
          />

          <button type="submit" className={cx("save-btn")}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
