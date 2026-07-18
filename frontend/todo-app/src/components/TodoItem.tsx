import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
    case 'medium':
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900';
    case 'low':
      return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
    default:
      return '';
  }
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Work: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
    Personal: 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200',
    Shopping: 'bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200',
    Health: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
    Finance: 'bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200',
    Other: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200',
  };
  return colors[category] || colors.Other;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onEdit,
  onDelete,
  onToggleComplete,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-3 transition duration-200 ${
        todo.completed ? 'opacity-60' : ''
      } ${isOverdue ? 'border-l-4 border-red-500' : ''}`}
    >
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => onToggleComplete(todo.id, e.target.checked)}
          className="mt-1 w-5 h-5 cursor-pointer"
        />

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3
              className={`text-lg font-semibold ${
                todo.completed
                  ? 'line-through text-gray-500 dark:text-gray-400'
                  : 'text-gray-900 dark:text-white'
              }`}
            >
              {todo.title}
            </h3>
          </div>

          {todo.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {todo.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 items-center">
            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getCategoryColor(todo.category)}`}>
              {todo.category}
            </span>

            <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getPriorityColor(todo.priority)}`}>
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>

            {todo.dueDate && (
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                isOverdue
                  ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}>
                {formatDate(todo.dueDate)}
              </span>
            )}
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2"
          >
            ⋮
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-700 rounded-md shadow-lg z-10">
              <button
                onClick={() => {
                  onEdit(todo);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  onDelete(todo.id);
                  setShowMenu(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
