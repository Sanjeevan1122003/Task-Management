import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import UserList from './UserList';
import { getTasks, updateTask, deleteTask, getTasksByUserId } from '../utils/storage';

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = () => {
            const allTasks = getTasks();
            setTasks(allTasks);
        };
        loadTasks();
    }, []);

    const handleTaskAdded = () => {
        const allTasks = getTasks();
        setTasks(allTasks);
    };

    const handleUpdateTask = (taskId, updates) => {
        updateTask(taskId, updates);
        const allTasks = getTasks();
        setTasks(allTasks);
    };

    const handleDeleteTask = (taskId) => {
        deleteTask(taskId);
        const allTasks = getTasks();
        setTasks(allTasks);
    };

    const handleTaskReassigned = () => {
        const allTasks = getTasks();
        setTasks(allTasks);
    };

    return (
        <div className="dashboard admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div className="admin-content">
                <div className="admin-top-section">
                    <div className="admin-left">
                        <TaskForm onTaskAdded={handleTaskAdded} />
                    </div>
                    <div className="admin-right">
                        <TaskList
                            tasks={tasks}
                            onUpdateTask={handleUpdateTask}
                            onDeleteTask={handleDeleteTask}
                            draggable={true}
                        />
                    </div>
                </div>

                <div className="admin-bottom-section">
                    <UserList onTaskReassigned={handleTaskReassigned} />
                </div>
            </div>
        </div>
    );
};

const UserDashboard = ({ userId }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const loadTasks = () => {
            const userTasks = getTasksByUserId(userId);
            setTasks(userTasks);
        };
        loadTasks();
    }, [userId]);

    const handleUpdateTask = (taskId, updates) => {
        updateTask(taskId, updates);
        const userTasks = getTasksByUserId(userId);
        setTasks(userTasks);
    };

    return (
        <div className="dashboard user-dashboard">
            <h2>My Tasks</h2>

            <div className="user-info">
                <p>Welcome! Here are your assigned tasks. Click "Mark as Completed" to update task status.</p>
            </div>

            <TaskList
                tasks={tasks}
                onUpdateTask={handleUpdateTask}
                draggable={false}
            />
        </div>
    );
};

const Dashboard = ({ isAdmin, userId }) => {
    return (
        <DndProvider backend={HTML5Backend}>
            {isAdmin ? (
                <AdminDashboard />
            ) : (
                <UserDashboard userId={userId} />
            )}
        </DndProvider>
    );
};

export default Dashboard;