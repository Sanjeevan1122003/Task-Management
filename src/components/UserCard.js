import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { getTasksByUserId, updateTask } from '../utils/storage';

const UserCard = (props) => {
    const { user, onTaskReassigned } = props;
    const [tasks, setTasks] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'task',
        drop: (item) => {
            updateTask(item.id, { assigneeId: user.id });
            if (onTaskReassigned) {
                onTaskReassigned();
            }
            setIsActive(true);
            setRefreshKey(prev => prev + 1);
            setTimeout(() => setIsActive(false), 300);
            return { name: user.username };
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }), [user, onTaskReassigned]);

    useEffect(() => {
        const userTasks = getTasksByUserId(user.id);
        setTasks(userTasks);
    }, [user.id, refreshKey, onTaskReassigned]); 

    return (
        <div
            ref={drop}
            className={`user-card ${isOver ? 'drop-active' : ''} ${isActive ? 'drop-success' : ''}`}
        >
            <div className='user-details'>
                <div>
                    <h4>{user.username}</h4>
                    <p className="user-role">{user.role}</p>
                </div>
                <span className="status-badge task">Tasks: {tasks.length}</span>
            </div>
            <div className="user-task-count">
                <span className="status-badge pending">
                    Pending: {tasks.filter(t => t.status === 'Pending').length}
                </span>
                <span className='status-badge completed'>
                    Completed: {tasks.filter(t => t.status === 'Completed').length}
                </span>
            </div>
            {isOver && (
                <div className="drop-hint">
                    Drop task here to assign to {user.username}
                </div>
            )}
            {isActive && (
                <div className="drop-success-message">
                    ✓ Task assigned!
                </div>
            )}
        </div>
    );
};

export default UserCard;