/**
 * Todo API Service - Handles all todo-related API calls
 */

import { apiService } from './api';
import { Todo } from '../types/Todo';

const TODO_ENDPOINT = '/api/v1/todos';

export const todoApi = {
  /**
   * Get all todos
   */
  async getAll(filters?: Record<string, any>) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `${TODO_ENDPOINT}?${queryParams}` : TODO_ENDPOINT;
    return apiService.get<Todo[]>(endpoint);
  },

  /**
   * Get single todo
   */
  async getById(id: string) {
    return apiService.get<Todo>(`${TODO_ENDPOINT}/${id}`);
  },

  /**
   * Create todo
   */
  async create(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) {
    return apiService.post<Todo>(TODO_ENDPOINT, todo);
  },

  /**
   * Update todo
   */
  async update(id: string, updates: Partial<Todo>) {
    return apiService.put<Todo>(`${TODO_ENDPOINT}/${id}`, updates);
  },

  /**
   * Delete todo
   */
  async delete(id: string) {
    return apiService.delete<void>(`${TODO_ENDPOINT}/${id}`);
  },

  /**
   * Delete multiple todos
   */
  async deleteMultiple(ids: string[]) {
    return apiService.post<void>(`${TODO_ENDPOINT}/bulk-delete`, { ids });
  },

  /**
   * Bulk update todos
   */
  async updateMultiple(updates: Record<string, Partial<Todo>>) {
    return apiService.patch<Todo[]>(`${TODO_ENDPOINT}/bulk-update`, updates);
  },

  /**
   * Export todos
   */
  async export(format: 'json' | 'csv' = 'json') {
    return apiService.get(`${TODO_ENDPOINT}/export?format=${format}`);
  },
};

export default todoApi;
