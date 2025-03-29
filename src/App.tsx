import Table from "./components/Layout/components/Table/Table";
import { DefaultLayout } from "./components/Layout/exportLayout";

import classNames from "classnames/bind";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import AddModel from "./components/Layout/components/AddModel/AddModel";
import axios from "axios";
import { TaskType as taskType } from "./models/typeTask";
const cx = classNames.bind(styles);

const baseURL = "http://localhost:3000/api/tasks";
const baseURL2 = "http://localhost:3000/api/delete";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [tasks, setTasks] = useState<taskType[]>([]);

  // Fetch task từ API khi component mount
  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Cannot fetch tasks", error));
  }, []);

  // Hàm thêm task mới vào danh sách
  const addTask = (newTask: taskType) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

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
    <DefaultLayout onOpenModal={() => setIsModalOpen(true)}>
      <div className={cx("App")}>
        <Table
          tasks={tasks}
          handleDelete={handleDelete}
          setTasks={setTasks}
        ></Table>
        {isModalOpen && (
          <AddModel onClose={() => setIsModalOpen(false)} addTask={addTask} />
        )}
      </div>
    </DefaultLayout>
  );
}

export default App;
