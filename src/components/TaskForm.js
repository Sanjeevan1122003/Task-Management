import React, { useState, useEffect } from 'react';
import { getUsers, addTask } from '../utils/storage';

const TaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadUsers = () => {
      const allUsers = getUsers();
      const regularUsers = allUsers.filter(user => user.role === 'user');
      setUsers(regularUsers);
      if (regularUsers.length > 0) {
        setAssigneeId(regularUsers[0].id);
      }
    };
    loadUsers();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setMessage('Title is required');
      return;
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      assigneeId: parseInt(assigneeId),
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    addTask(newTask);
    onTaskAdded(newTask);
    
    setTitle('');
    setDescription('');
    setMessage('Task created successfully!');
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="task-form">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        <div className="form-group">
          <label>Assign to:</label>
          <select
            value={assigneeId}
            onChange={(e) => setAssigneeId(e.target.value)}
            required
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Create Task</button>
      </form>
      {message && (
        <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default TaskForm;