import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../main";
import toast from "react-hot-toast";
import { server } from "../main";
import axios from "axios";
import TodoItem from "../components/TodoItem";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);
  const [tasks, setTasks] = useState([]);

  const updateHandler = async (id, currentStatus) => {
    try {
      const { data } = await axios.put(
        `${server}/tasks/${id}/toogle`,
        { isCompleted: !currentStatus },
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      fetchTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      fetchTasks();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${server}/tasks/all`, {
        withCredentials: true,
      });
      //console.log(res.data.tasks);
      setTasks(res.data.tasks); // this should trigger rerender
    } catch (error) {
      console.error(error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(
        `${server}/tasks/new`,
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setTitle("");
      setDescription("");
      setLoader(false);

      //Now fetch updated task list immediately
      fetchTasks();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button type="submit" disabled={loader}>
              Add Task
            </button>
          </form>
        </section>
      </div>
      <section className="todosContainer">
        {tasks.map((task) => (
          <TodoItem
            title={task.title}
            description={task.description}
            isCompleted={task.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={task._id}
            key={task._id}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
