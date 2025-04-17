import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./AddModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faListUl } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const cx = classNames.bind(styles);

const baseURL =
  "localhost:9000/tasks";

interface ModalProps {
  onClose: () => void;
  addTask: (newTask: taskType) => void;
}

interface taskType {
  name_task: string;
  due_date: string;
  priority: number;
  user_id: number;
  is_done: boolean;
  description: string;
}

function AddModal({ onClose, addTask }: ModalProps) {
  const [task, setTask] = useState<taskType>({
    name_task: "",
    due_date: "",
    priority: 1,
    user_id: 1, // Có thể chỉnh sau
    is_done: false,
    description: "",
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

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask((prev) => ({
      ...prev,
      is_done: e.target.value === "true",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(baseURL, task, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Task created:", response.data);
      addTask(response.data);
      onClose();
    } catch (error) {
      console.error("Lỗi khi thêm task:", error);
      alert("Thêm task thất bại. Vui lòng kiểm tra lại.");
    }
  };

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("head-content")}>
            <FontAwesomeIcon icon={faListUl} className={cx("img-list")} />
            <label className={cx("title")}>Add Processes</label>
            <button className={cx("cancel-bnt")} onClick={onClose}>
              <FontAwesomeIcon icon={faXmark} className={cx("img-cancel")} />
            </button>
          </div>

          <div className={cx("body-content")}>
            <form className={cx("form-content")} onSubmit={handleSubmit}>
              <label>Name-Processes</label>
              <input
                type="text"
                placeholder="Enter name"
                name="name_task"
                value={task.name_task}
                onChange={handleChange}
                required
              />
              <label>Due date</label>
              <input
                type="date"
                name="due_date"
                value={task.due_date}
                onChange={handleChange}
                required
              />
              <label>Priority</label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
              <label>Status</label>
              <div className={cx("check-box")}>
                <label>
                  <input
                    type="radio"
                    name="is_done"
                    value="true"
                    checked={task.is_done}
                    onChange={handleStatusChange}
                  />
                  Completed
                </label>
                <label>
                  <input
                    type="radio"
                    name="is_done"
                    value="false"
                    checked={!task.is_done}
                    onChange={handleStatusChange}
                  />
                  Unfinished
                </label>
              </div>
              <label>Description</label>
              <textarea
                name="description"
                placeholder="Enter description"
                className={cx("description-box")}
                value={task.description}
                onChange={handleChange}
              ></textarea>

              <div className={cx("addElement")}>
                <button type="submit">SUBMIT</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddModal;
