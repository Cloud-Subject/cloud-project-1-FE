import React from "react";
import classNames from "classnames/bind";
import styles from "./AddModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faListUl } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

interface ModalProps {
  onClose: () => void;
}

function AddModel({ onClose }: ModalProps) {
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
            <form className={cx("form-content")}>
              <label>Name-Processes</label>
              <input type="text" placeholder="Enter name" />
              <label>Due date</label>
              <input type="date" />
              <label>Priority</label>
              <select>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
              <label>Status</label>
              <div className={cx("check-box")}>
                <label>
                  <input type="radio" name="status" /> Completed
                </label>
                <label>
                  <input type="radio" name="status" /> Unfinished
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className={cx("addElement")}>
          <button>SUBMIT</button>
        </div>
      </div>
    </div>
  );
}

export default AddModel;
