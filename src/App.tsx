import Table from "./components/Layout/components/Table/Table";
import {
  DefaultLayout,
  LoginLayout,
  RegisterLayout,
} from "./components/Layout/exportLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./App.module.scss";
import { useEffect, useState } from "react";
import AddModel from "./components/Layout/components/AddModel/AddModel";
import axios from "axios";
import { TaskType as taskType } from "./models/typeTask";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./config/PrivateRoute";
const cx = classNames.bind(styles);

const baseURL = "http://[::1]:9000/tasks";
const baseURL2 = "http://[::1]:9000/tasks";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<taskType[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(baseURL, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Thêm token vào header
        },
      })
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Cannot fetch tasks", error));
  }, []);

  const addTask = (newTask: taskType) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Bạn có chắc muốn xóa task này không?")) return;
    try {
      await axios.delete(`${baseURL2}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Thêm token vào header
        },
      });
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
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } else if (sortType === "priority_asc") {
      sortedTasks.sort((a, b) => a.priority - b.priority);
    }

    console.log("Sorted tasks:", sortedTasks);
    setTasks([...sortedTasks]); // Đảm bảo React nhận diện sự thay đổi
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DefaultLayout
                onOpenModal={() => setIsModalOpen(true)}
                onSort={handleSort}
              >
                <div className={cx("App")}>
                  <Table
                    tasks={tasks}
                    handleDelete={handleDelete}
                    setTasks={setTasks}
                  />
                  {isModalOpen && (
                    <AddModel
                      onClose={() => setIsModalOpen(false)}
                      addTask={addTask}
                    />
                  )}
                </div>
              </DefaultLayout>
            </PrivateRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <LoginLayout>
              <Login></Login>
            </LoginLayout>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <RegisterLayout>
              <Register></Register>
            </RegisterLayout>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
