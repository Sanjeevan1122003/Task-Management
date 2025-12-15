import React, { useState, useEffect } from 'react';
import { getUsers } from '../utils/storage';
import UserCard from './UserCard';

const UserList = ({ onTaskReassigned }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = () => {
            const allUsers = getUsers();
            setUsers(allUsers.slice(1));
        };
        loadUsers();
    }, []);

    const handleTaskReassigned = () => {
        if (onTaskReassigned) {
            onTaskReassigned();
        }
    };

    return (
        <div className="user-list">
            <h3>Users (Drop tasks to reassign)</h3>
            <div className="users-container">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onTaskReassigned={handleTaskReassigned}
                    />
                ))}
            </div>
        </div>
    );
};

export default UserList;
