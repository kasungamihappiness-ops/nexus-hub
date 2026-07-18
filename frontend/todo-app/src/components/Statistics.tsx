import React from 'react';
import { Todo } from '../types/Todo';

interface StatisticsProps {
  todos: Todo[];
}

export const Statistics: React.FC<StatisticsProps> = ({ todos }) => {
  const completed = todos.filter(t => t.completed).length;
  const pending = todos.filter(t => !t.completed).length;
  const completionPercentage = todos.length > 0 ? Math.round((completed / todos.length) * 100) : 0;

  const byCategory: Record<string, number> = {};
  const byPriority: Record<string, number> = {};

  todos.forEach(todo => {
    byCategory[todo.category] = (byCategory[todo.category] || 0) + 1;
    byPriority[todo.priority] = (byPriority[todo.priority] || 0) + 1;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Total Tasks</h4>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{todos.length}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completed</h4>
        <p className="text-3xl font-bold text-green-600 dark:text-green-400">{completed}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Pending</h4>
        <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{pending}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Completion</h4>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">{completionPercentage}%</p>
        </div>
      </div>
    </div>
  );
};
