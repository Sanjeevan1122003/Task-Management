export const initializeDefaultData = () => {

    const users = [
        { id: 1, username: 'admin', password: 'Admin@123', role: 'admin' },
        { id: 2, username: 'sanjeevan', password: 'Sanjeevan@234', role: 'user' },
        { id: 3, username: 'sumanth', password: 'Sumanth@345', role: 'user' },
        { id: 4, username: 'ujval', password: 'Ujval@456', role: 'user' },
        { id: 5, username: 'rhul', password: 'rahul@123', role: 'user' }
    ];

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify([]));
    }

    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify(null));
    }
};

export const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
};

export const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
};

export const getUserByCredentials = (username, password) => {
    const users = getUsers();
    return users.find(user => user.username === username && user.password === password);
};

export const getTasks = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

export const addTask = (task) => {
    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);
};

export const updateTask = (taskId, updates) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
    );
    saveTasks(updatedTasks);
    return updatedTasks.find(task => task.id === taskId);
};

export const deleteTask = (taskId) => {
    const tasks = getTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
};

export const getTasksByUserId = (userId) => {
    const tasks = getTasks();
    return tasks.filter(task => task.assigneeId === userId);
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
};

export const clearCurrentUser = () => {
    localStorage.setItem('currentUser', JSON.stringify(null));
};
