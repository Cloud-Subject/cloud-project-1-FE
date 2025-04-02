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

  useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Cannot fetch tasks", error));
  }, []);

  const addTask = (newTask: taskType) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa task này không?")) return;
    try {
      await axios.delete(`${baseURL2}/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      alert("Xóa task thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
      alert("Lỗi khi xóa task!");
    }
  };

  // Hàm sắp xếp
  const handleSort = (sortType: string) => {
    console.log("Sorting by:", sortType);
    const sortedTasks = [...tasks];

    if (sortType === "due_date_asc") {
      sortedTasks.sort(
        (a, b) =>
          new Date(a.due_date).getTime() - new Date(b.due_date).getTime()
      );
    } else if (sortType === "priority_asc") {
      sortedTasks.sort((a, b) => a.priority - b.priority);
    }

    console.log("Sorted tasks:", sortedTasks);
    setTasks([...sortedTasks]); // Đảm bảo React nhận diện sự thay đổi
  };

  return (
    <DefaultLayout onOpenModal={() => setIsModalOpen(true)} onSort={handleSort}>
      <div className={cx("App")}>
        <Table tasks={tasks} handleDelete={handleDelete} setTasks={setTasks} />
        {isModalOpen && (
          <AddModel onClose={() => setIsModalOpen(false)} addTask={addTask} />
        )}
      </div>
    </DefaultLayout>
  );
}

export default App;
