import { Todo, FilterSettings } from '../types/Todo';

// Storage keys
const TODOS_KEY = 'nexus-hub-todos';
const THEME_KEY = 'nexus-hub-theme';
const FILTERS_KEY = 'nexus-hub-filters';

/**
 * Get all todos from localStorage
 */
export const getTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem(TODOS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading todos from storage:', error);
    return [];
  }
};

/**
 * Save todos to localStorage
 */
export const saveTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error('Error saving todos to storage:', error);
  }
};

/**
 * Add a new todo
 */
export const addTodo = (todo: Todo): Todo[] => {
  const todos = getTodos();
  todos.push(todo);
  saveTodos(todos);
  return todos;
};

/**
 * Update a todo
 */
export const updateTodo = (id: string, updates: Partial<Todo>): Todo[] => {
  const todos = getTodos();
  const index = todos.findIndex(t => t.id === id);
  if (index !== -1) {
    todos[index] = { ...todos[index], ...updates, updatedAt: new Date().toISOString() };
    saveTodos(todos);
  }
  return todos;
};

/**
 * Delete a todo
 */
export const deleteTodo = (id: string): Todo[] => {
  const todos = getTodos();
  const filtered = todos.filter(t => t.id !== id);
  saveTodos(filtered);
  return filtered;
};

/**
 * Delete multiple todos
 */
export const deleteTodos = (ids: string[]): Todo[] => {
  const todos = getTodos();
  const filtered = todos.filter(t => !ids.includes(t.id));
  saveTodos(filtered);
  return filtered;
};

/**
 * Clear all todos
 */
export const clearAllTodos = (): Todo[] => {
  saveTodos([]);
  return [];
};

/**
 * Get theme preference
 */
export const getTheme = (): 'light' | 'dark' => {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return (stored as 'light' | 'dark') || 'light';
  } catch (error) {
    return 'light';
  }
};

/**
 * Save theme preference
 */
export const saveTheme = (theme: 'light' | 'dark'): void => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error saving theme:', error);
  }
};

/**
 * Get filter settings
 */
export const getFilters = (): FilterSettings => {
  try {
    const stored = localStorage.getItem(FILTERS_KEY);
    return stored ? JSON.parse(stored) : getDefaultFilters();
  } catch (error) {
    return getDefaultFilters();
  }
};

/**
 * Save filter settings
 */
export const saveFilters = (filters: FilterSettings): void => {
  try {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
  } catch (error) {
    console.error('Error saving filters:', error);
  }
};

/**
 * Get default filter settings
 */
const getDefaultFilters = (): FilterSettings => ({
  searchQuery: '',
  status: 'all',
  sortBy: 'date',
});

/**
 * Export all data
 */
export const exportData = (): string => {
  const data = {
    todos: getTodos(),
    theme: getTheme(),
    filters: getFilters(),
    exportedAt: new Date().toISOString(),
  };
  return JSON.stringify(data, null, 2);
};

/**
 * Import data
 */
export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    if (data.todos && Array.isArray(data.todos)) {
      saveTodos(data.todos);
      if (data.theme) saveTheme(data.theme);
      if (data.filters) saveFilters(data.filters);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};
