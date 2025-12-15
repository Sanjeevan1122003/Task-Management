import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, draggable = false }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-tasks">
                <p>No tasks found.</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            <h3>{draggable ? 'All Tasks (Drag to reassign)' : 'My Tasks'}</h3>
            <div className="tasks-container">
                {tasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onUpdateTask={onUpdateTask}
                        onDeleteTask={onDeleteTask}
                        draggable={draggable}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;