import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { SearchBar } from './SearchBar';
import { FilterPanel } from './FilterPanel';
import { Statistics } from './Statistics';
import { ThemeToggle } from './ThemeToggle';
import { useTodoStorage } from '../hooks/useTodoStorage';
import { useFilter } from '../hooks/useFilter';
import { useTheme } from '../hooks/useTheme';

const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Other'];

export const TodoList: React.FC = () => {
  const { todos, addTodo, updateTodo, deleteTodo, clearAll, loading } = useTodoStorage();
  const { filters, filteredTodos, updateFilters } = useFilter(todos);
  const { theme, toggleTheme } = useTheme();
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const handleAddTodo = (todo: Todo) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, todo);
      setEditingTodo(null);
    } else {
      addTodo(todo);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    updateTodo(id, { completed });
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTodo(id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This cannot be undone.')) {
      clearAll();
      setShowConfirmClear(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition duration-300">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">✓ My Tasks</h1>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        {/* Statistics */}
        <Statistics todos={todos} />

        {/* Form */}
        <TodoForm
          onAddTodo={handleAddTodo}
          editingTodo={editingTodo || undefined}
          onCancelEdit={handleCancelEdit}
        />

        {/* Search */}
        <SearchBar
          searchQuery={filters.searchQuery}
          onSearchChange={(query) => updateFilters({ searchQuery: query })}
        />

        {/* Filters */}
        <FilterPanel
          filters={filters}
          categories={categories}
          onFilterChange={updateFilters}
        />

        {/* Todo List */}
        <div className="mb-6">
          {filteredTodos.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No tasks found</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                {todos.length === 0
                  ? 'Start by creating your first task!'
                  : 'Try adjusting your filters or search query'}
              </p>
            </div>
          ) : (
            <div>
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onEdit={handleEditTodo}
                  onDelete={handleDeleteTodo}
                  onToggleComplete={handleToggleComplete}
                />
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        {todos.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleClearAll}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Clear All Tasks
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
