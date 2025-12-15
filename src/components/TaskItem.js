import React from 'react';
import { useDrag } from 'react-dnd';

const TaskItem = (props) => {
    const { task, onUpdateTask, onDeleteTask, draggable } = props;

    const [{ isDragging }, dragRef] = useDrag(
        () => ({
            type: 'task',
            item: { id: task.id, currentAssigneeId: task.assigneeId },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            canDrag: draggable,
        }),
        [task, draggable]
    );

    const handleStatusChange = () => {
        const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
        onUpdateTask(task.id, { status: newStatus });
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDeleteTask(task.id);
        }
    };

    const dragStyle = {
        opacity: isDragging ? 0.5 : 1,
        cursor: draggable ? 'move' : 'default',
        backgroundColor: isDragging ? '#f0f0f0' : 'white',
    };

    return (
        <div
            ref={dragRef}
            className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}
            style={dragStyle}
        >
            <div className="task-header">
                <h4>{task.title}</h4>
                {draggable && <span className="drag-handle">↔ Drag me</span>}
            </div>
            <p className="task-description">{task.description}</p>
            <div className="task-footer">
                <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status}
                </span>
                <div className="task-actions">
                    <button
                        onClick={handleStatusChange}
                        className="status-button"
                    >
                        Mark as {task.status === 'Pending' ? 'Completed' : 'Pending'}
                    </button>
                    {onDeleteTask && (
                        <button
                            onClick={handleDelete}
                            className="delete-button"
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
            <div className="task-meta">
                <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
                <small>ID: {task.id}</small>
            </div>
        </div>
    );
};

export default TaskItem;