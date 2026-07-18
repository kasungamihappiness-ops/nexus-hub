import { useState, useEffect } from 'react';
import { Todo, FilterSettings } from '../types/Todo';
import { getFilters, saveFilters } from '../utils/storage';

export const useFilter = (todos: Todo[]) => {
  const [filters, setFilters] = useState<FilterSettings>(getFilters());
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);

  useEffect(() => {
    let result = todos;

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(query) ||
        todo.description?.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (filters.status === 'completed') {
      result = result.filter(todo => todo.completed);
    } else if (filters.status === 'active') {
      result = result.filter(todo => !todo.completed);
    }

    // Filter by category
    if (filters.category) {
      result = result.filter(todo => todo.category === filters.category);
    }

    // Filter by priority
    if (filters.priority) {
      result = result.filter(todo => todo.priority === filters.priority);
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        case 'title':
          return a.title.localeCompare(b.title);
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredTodos(result);
  }, [todos, filters]);

  const updateFilters = (newFilters: Partial<FilterSettings>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    saveFilters(updated);
  };

  return {
    filters,
    filteredTodos,
    updateFilters,
  };
};
