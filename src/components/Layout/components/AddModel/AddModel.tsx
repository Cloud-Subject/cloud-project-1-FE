import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AddModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faListUl } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const cx = classNames.bind(styles);

const baseURL = "http://[::1]:9000/tasks";

interface ModalProps {
  onClose: () => void;
  addTask: (newTask: taskType) => void;
}

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

interface taskType {
  title: string;
  description?: string;
  status?: TaskStatus;
  dueDate: string;
  priority: number;
  userId?: string;
}

function AddModal({ onClose, addTask }: ModalProps) {
  const [task, setTask] = useState<taskType>({
    title: "",
    description: "",
    status: TaskStatus.TODO,
    dueDate: "",
    priority: 1,
    userId: "", // nếu không cần truyền thì giữ rỗng
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: name === "priority" ? Number(value) : value,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTask((prev) => ({
      ...prev,
      status: e.target.value as TaskStatus,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      alert("Thiếu token hoặc thông tin người dùng. Vui lòng đăng nhập lại.");
      return;
    }

    const user = JSON.parse(userData);
    const userId = user.id;

    // Đảm bảo date đúng ISO format
    const due_Date = new Date(task.dueDate);

    const requestPayload = {
      ...task,
      dueDate: due_Date,
      userId: userId, // gán id từ localStorage
    };

    try {
      const response = await axios.post(baseURL, requestPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      addTask(response.data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm task:", error);
      alert("Không thể thêm task. Vui lòng thử lại.");
    }
  };

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("modal")}>
        <div className={cx("modal-header")}>
          <FontAwesomeIcon icon={faListUl} className={cx("icon")} />
          <h2 className={cx("title")}>Create New Task</h2>
          <button className={cx("close-button")} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form className={cx("form")} onSubmit={handleSubmit}>
          <div className={cx("form-group")}>
            <label>Task Title</label>
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className={cx("form-group")}>
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className={cx("form-group")}>
            <label>Priority</label>
            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option value={1}>Low</option>
              <option value={2}>Medium</option>
              <option value={3}>High</option>
            </select>
          </div>

          <div className={cx("form-group")}>
            <label>Status</label>
            <select
              name="status"
              value={task.status}
              onChange={handleStatusChange}
            >
              <option value={TaskStatus.TODO}>To Do</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
              <option value={TaskStatus.DONE}>Done</option>
            </select>
          </div>

          <div className={cx("form-group")}>
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe the task"
              value={task.description}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={cx("submit-button")}>
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddModal;
