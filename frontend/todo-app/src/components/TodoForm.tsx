import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { validateTodo } from '../utils/validators';

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void;
  editingTodo?: Todo;
  onCancelEdit?: () => void;
}

const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Other'];
const priorities = ['low', 'medium', 'high'] as const;

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo, editingTodo, onCancelEdit }) => {
  const [title, setTitle] = useState(editingTodo?.title || '');
  const [description, setDescription] = useState(editingTodo?.description || '');
  const [category, setCategory] = useState(editingTodo?.category || 'Personal');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>(editingTodo?.priority || 'medium');
  const [dueDate, setDueDate] = useState(editingTodo?.dueDate || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = validateTodo(title, category, priority, description, dueDate);
    if (!validation.valid) {
      setError(validation.error || 'Validation failed');
      return;
    }

    const now = new Date().toISOString();
    const todo: Todo = {
      id: editingTodo?.id || Date.now().toString(),
      title,
      description: description || undefined,
      category,
      priority,
      dueDate: dueDate || undefined,
      completed: editingTodo?.completed || false,
      createdAt: editingTodo?.createdAt || now,
      updatedAt: now,
    };

    onAddTodo(todo);
    setTitle('');
    setDescription('');
    setCategory('Personal');
    setPriority('medium');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {editingTodo ? 'Edit Task' : 'Add New Task'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={200}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category *
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority *
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as 'high' | 'medium' | 'low')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {priorities.map(p => (
              <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          maxLength={1000}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {editingTodo ? 'Update Task' : 'Add Task'}
        </button>
        {editingTodo && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};
