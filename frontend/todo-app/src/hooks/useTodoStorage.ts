import { useState, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { getTodos, saveTodos, addTodo as storageAddTodo, updateTodo as storageUpdateTodo, deleteTodo as storageDeletTodo } from '../utils/storage';

export const useTodoStorage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Load todos from storage on mount
  useEffect(() => {
    const loadedTodos = getTodos();
    setTodos(loadedTodos);
    setLoading(false);
  }, []);

  const addTodo = (todo: Todo) => {
    const updated = storageAddTodo(todo);
    setTodos(updated);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    const updated = storageUpdateTodo(id, updates);
    setTodos(updated);
  };

  const deleteTodo = (id: string) => {
    const updated = storageDeletTodo(id);
    setTodos(updated);
  };

  const deleteTodos = (ids: string[]) => {
    const current = getTodos();
    const filtered = current.filter(t => !ids.includes(t.id));
    saveTodos(filtered);
    setTodos(filtered);
  };

  const clearAll = () => {
    saveTodos([]);
    setTodos([]);
  };

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteTodos,
    clearAll,
  };
};
