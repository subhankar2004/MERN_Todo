import React from "react";

const TodoItem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <div className={`todo-card ${isCompleted ? "completed" : ""}`}>
      <div className="todo-content">
        <div className="todo-header">
          <h4 className="todo-title">{title}</h4>
          <div className="todo-actions">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => updateHandler(id, isCompleted)}
                className="todo-checkbox"
              />
              <span className="checkmark"></span>
            </label>
            <button
              className="delete-button"
              onClick={() => deleteHandler(id)}
              aria-label="Delete task"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </div>
        </div>
        <p className="todo-description">{description}</p>
      </div>
    </div>
  );
};

export default TodoItem;
