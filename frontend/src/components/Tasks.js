import React, { useState, useEffect } from 'react';
import { getTasks, addTask, updateTask, deleteTask } from '../api';

const Tasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks(token);
      setTasks(data);
    };

    fetchTasks();
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editTask) {
      await updateTask(editTask._id, form, token);
      setEditTask(null);
    } else {
      await addTask(form, token);
    }
    setForm({ title: '', description: '' });
    const data = await getTasks(token);
    setTasks(data);
  };

  const handleEdit = (task) => {
    setForm({ title: task.title, description: task.description });
    setEditTask(task);
  };

  const handleDelete = async (id) => {
    await deleteTask(id, token);
    const data = await getTasks(token);
    setTasks(data);
  };

  return (
    <div>
      <h2>Tasks</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <button type="submit">{editTask ? 'Update Task' : 'Add Task'}</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
