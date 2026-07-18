import { useState, useEffect, useCallback } from 'react';
import { Todo } from '../types/Todo';
import { todoApi } from '../services/todoApi';
import { getTodos, saveTodos } from '../utils/storage';

interface SyncState {
  syncing: boolean;
  error: string | null;
  lastSyncTime: Date | null;
  syncStatus: 'idle' | 'syncing' | 'success' | 'error';
}

export const useSyncTodos = (enabled: boolean = false) => {
  const [syncState, setSyncState] = useState<SyncState>({
    syncing: false,
    error: null,
    lastSyncTime: null,
    syncStatus: 'idle',
  });

  /**
   * Sync todos from server
   */
  const syncFromServer = useCallback(async () => {
    if (!enabled) return;

    setSyncState(prev => ({ ...prev, syncing: true, syncStatus: 'syncing' }));

    try {
      const response = await todoApi.getAll();

      if (response.status === 'success' && response.data) {
        saveTodos(response.data);
        setSyncState(prev => ({
          ...prev,
          syncing: false,
          error: null,
          lastSyncTime: new Date(),
          syncStatus: 'success',
        }));
        return response.data;
      } else {
        throw new Error(response.error?.message || 'Sync failed');
      }
    } catch (error: any) {
      setSyncState(prev => ({
        ...prev,
        syncing: false,
        error: error.message,
        syncStatus: 'error',
      }));
    }
  }, [enabled]);

  /**
   * Sync todos to server
   */
  const syncToServer = useCallback(async (todos: Todo[]) => {
    if (!enabled) return;

    setSyncState(prev => ({ ...prev, syncing: true, syncStatus: 'syncing' }));

    try {
      const updates: Record<string, Partial<Todo>> = {};
      todos.forEach(todo => {
        updates[todo.id] = todo;
      });

      const response = await todoApi.updateMultiple(updates);

      if (response.status === 'success') {
        setSyncState(prev => ({
          ...prev,
          syncing: false,
          error: null,
          lastSyncTime: new Date(),
          syncStatus: 'success',
        }));
        return response.data;
      } else {
        throw new Error(response.error?.message || 'Sync failed');
      }
    } catch (error: any) {
      setSyncState(prev => ({
        ...prev,
        syncing: false,
        error: error.message,
        syncStatus: 'error',
      }));
    }
  }, [enabled]);

  /**
   * Auto-sync on interval
   */
  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(syncFromServer, 30000);

    return () => clearInterval(interval);
  }, [enabled, syncFromServer]);

  return {
    ...syncState,
    syncFromServer,
    syncToServer,
  };
};
