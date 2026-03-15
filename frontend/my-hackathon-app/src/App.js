import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', assignedTo: '', deadline: '' });
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    axios.get('https://task-manager-un0z.onrender.com/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTask = () => {
    if (!form.title || !form.assignedTo) return alert('Please fill all fields!');
    axios.post('https://task-manager-un0z.onrender.com/api/tasks', form)
      .then(res => setTasks([...tasks, res.data]));
  };

  const deleteTask = (id) => {
    axios.delete(`https://task-manager-un0z.onrender.com/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)));
  };

  const updateStatus = (id, status) => {
    axios.put(`https://task-manager-un0z.onrender.com/api/tasks/${id}`, { status })
      .then(res => setTasks(tasks.map(t => t._id === id ? res.data : t)));
  };

  const filtered = filter === 'All' ? tasks : tasks.filter(t => t.status === filter);

  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const done = tasks.filter(t => t.status === 'Done').length;

  return (
    <div className="container">

      {/* NAVBAR */}
      <nav className="navbar">
        <h1>⚙️ Task Manager</h1>
        <p>Industry Task Management System</p>
      </nav>

      {/* DASHBOARD COUNTERS */}
      <div className="dashboard">
        <div className="card total">
          <h2>{total}</h2>
          <p>Total Tasks</p>
        </div>
        <div className="card pending">
          <h2>{pending}</h2>
          <p>Pending</p>
        </div>
        <div className="card progress">
          <h2>{inProgress}</h2>
          <p>In Progress</p>
        </div>
        <div className="card done">
          <h2>{done}</h2>
          <p>Done</p>
        </div>
      </div>

      {/* ADD TASK FORM */}
      <div className="form-box">
        <h2>Add New Task</h2>
        <div className="form-row">
          <input
            placeholder="Task Title"
            onChange={e => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Assigned To"
            onChange={e => setForm({ ...form, assignedTo: e.target.value })}
          />
          <input
            type="date"
            onChange={e => setForm({ ...form, deadline: e.target.value })}
          />
          <button className="add-btn" onClick={addTask}>+ Add Task</button>
        </div>
      </div>

      {/* FILTER BUTTONS */}
      <div className="filters">
        {['All', 'Pending', 'In Progress', 'Done'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TASK TABLE */}
      <table className="task-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Task Title</th>
            <th>Assigned To</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                No tasks found!
              </td>
            </tr>
          ) : (
            filtered.map((task, index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.title}</td>
                <td>{task.assignedTo}</td>
                <td>{task.deadline}</td>
                <td>
                  <select
                    className={`status ${task.status.replace(' ', '-')}`}
                    value={task.status}
                    onChange={e => updateStatus(task._id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Done</option>
                  </select>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteTask(task._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

    </div>
  );
}

export default App;