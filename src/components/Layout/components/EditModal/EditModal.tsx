import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./EditModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { TaskType as taskType } from "../../../../models/typeTask";

const cx = classNames.bind(styles);
const baseURL =
  "http://backend-alb-1497298012.us-east-1.elb.amazonaws.com/tasks"; // API cập nhật

interface ModalProps {
  task: taskType;
  onClose: () => void;
  onUpdate: (updatedTask: taskType) => void;
}

function EditModal({ task, onClose, onUpdate }: ModalProps) {
  const [editedTask, setEditedTask] = useState<taskType>(task);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`${baseURL}/${task.id}`, editedTask);
      alert("Cập nhật thành công!");
      onUpdate(editedTask);
      onClose();
    } catch (error) {
      console.error("Lỗi khi cập nhật:", error);
      alert("Lỗi khi cập nhật!");
    }
  };

  return (
    <div className={cx("modal-overlay")}>
      <div className={cx("wrapper")}>
        <div className={cx("head-content")}>
          <FontAwesomeIcon
            icon={faListUl}
            className={cx("img-list")}
          ></FontAwesomeIcon>
          <label className={cx("title")}>Edit Task</label>
          <button className={cx("cancel-bnt")} onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form className={cx("form-content")} onSubmit={handleSubmit}>
          <label>Name Processes</label>
          <input
            type="text"
            name="name_task"
            value={editedTask.name_task}
            onChange={handleChange}
            required
          />

          <label>Due date</label>
          <input
            type="date"
            name="due_date"
            value={editedTask.due_date}
            onChange={handleChange}
            required
          />

          <label>Priority</label>
          <select
            name="priority"
            value={editedTask.priority}
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
                checked={editedTask.is_done}
                onChange={() =>
                  setEditedTask((prev) => ({ ...prev, is_done: true }))
                }
              />
              Completed
            </label>
            <label>
              <input
                type="radio"
                name="is_done"
                value="false"
                checked={!editedTask.is_done}
                onChange={() =>
                  setEditedTask((prev) => ({ ...prev, is_done: false }))
                }
              />
              Unfinished
            </label>
          </div>

          <label>Description</label>
          <textarea
            name="description"
            value={editedTask.description}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
