import Table from "./components/Layout/components/Table/Table";
import { DefaultLayout } from "./components/Layout/exportLayout";

import classNames from "classnames/bind";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import AddModel from "./components/Layout/components/AddModel/AddModel";
import axios from "axios";
import { TaskType as taskType } from "./models/typeTask";

const cx = classNames.bind(styles);

localStorage.setItem(
  "token",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwic3ViIjoiMTU4YWUxODMtNmUxMS00NWFmLWJiMjItOTk2ZmE0N2JmMDEwIiwiaWF0IjoxNzQzODM2MzY3LCJleHAiOjE3NDM4Mzk5Njd9.gTZwLBo4pjgMJq0jgHwDja2uFwx5oiMjiGTp9nA7vv0"
);
// Cấu hình axios instance có auth header
const axiosClient = axios.create({
  baseURL: "http://backend-alb-1497298012.us-east-1.elb.amazonaws.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  },
});

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<taskType[]>([]);

  useEffect(() => {
    axiosClient
      .get("/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Cannot fetch tasks", error));
  }, []);

  const addTask = (newTask: taskType) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa task này không?")) return;
    try {
      await axiosClient.delete(`/tasks/delete/${id}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      alert("Xóa task thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
      alert("Lỗi khi xóa task!");
    }
  };

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
