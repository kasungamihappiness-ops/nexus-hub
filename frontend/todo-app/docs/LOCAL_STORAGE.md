# To-Do List App - Local Storage Guide

## Overview

This to-do list application uses browser's localStorage API to persist data locally on the user's device. No backend server is required for basic functionality.

## Local Storage Implementation

### Storage Keys

```typescript
'nexus-hub-todos'     // Stores all tasks
'nexus-hub-theme'     // Stores theme preference
'nexus-hub-filters'   // Stores filter settings
```

### Data Persistence

#### 1. **Todos Storage**

Each todo is stored with the following structure:

```json
{
  "id": "1234567890",
  "title": "Complete project",
  "description": "Finish the React app",
  "completed": false,
  "category": "Work",
  "priority": "high",
  "dueDate": "2024-12-31",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z",
  "tags": ["important", "urgent"]
}
```

#### 2. **Theme Storage**

```json
"light" | "dark"
```

#### 3. **Filters Storage**

```json
{
  "searchQuery": "",
  "status": "all",
  "category": "Work",
  "priority": "high",
  "sortBy": "date"
}
```

## Storage Utilities

### Core Functions

```typescript
// Get all todos
const todos = getTodos();

// Save todos
saveTodos(todos);

// Add a new todo
const updated = addTodo(newTodo);

// Update a todo
const updated = updateTodo(id, updates);

// Delete a todo
const updated = deleteTodo(id);

// Delete multiple todos
const updated = deleteTodos(ids);

// Clear all todos
const empty = clearAllTodos();
```

### Theme Functions

```typescript
// Get current theme
const theme = getTheme(); // 'light' | 'dark'

// Save theme
saveTheme('dark');
```

### Filter Functions

```typescript
// Get filter settings
const filters = getFilters();

// Save filter settings
saveFilters(filterSettings);
```

### Data Export/Import

```typescript
// Export all data as JSON
const json = exportData();

// Import data from JSON
const success = importData(jsonString);
```

## Browser Storage Limits

### Storage Capacity

| Browser | Limit |
|---------|-------|
| Chrome | 10 MB |
| Firefox | 10 MB |
| Safari | 5 MB |
| Edge | 10 MB |
| IE | 10 MB |

### Current Usage

For the to-do app:
- **Per Task**: ~200-500 bytes (depending on content length)
- **App Overhead**: ~1 KB
- **Max Tasks**: ~10,000-20,000 tasks (with 10 MB limit)

## Custom Hooks

### useTodoStorage

Manages todo CRUD operations:

```typescript
const {
  todos,           // Current todos array
  loading,         // Loading state
  addTodo,         // Add a new todo
  updateTodo,      // Update existing todo
  deleteTodo,      // Delete a todo
  deleteTodos,     // Delete multiple todos
  clearAll,        // Clear all todos
} = useTodoStorage();
```

### useFilter

Handles filtering and sorting:

```typescript
const {
  filters,         // Current filter settings
  filteredTodos,   // Filtered/sorted todos
  updateFilters,   // Update filter settings
} = useFilter(todos);
```

### useTheme

Manages dark/light mode:

```typescript
const {
  theme,           // Current theme
  toggleTheme,     // Toggle theme
} = useTheme();
```

## Storage Limitations

### What's NOT Persisted

- Real-time sync across multiple tabs (requires server)
- Automatic backups (use export feature)
- Conflict resolution (last-write-wins)
- Encryption (data stored in plaintext)
- Access control (any code can read/modify)

### Workarounds

#### 1. **Cross-Tab Sync**

Use `storage` event listener:

```typescript
window.addEventListener('storage', (event) => {
  if (event.key === 'nexus-hub-todos') {
    const updated = JSON.parse(event.newValue);
    setTodos(updated);
  }
});
```

#### 2. **Automatic Backups**

Periodically export and save to server:

```typescript
setInterval(() => {
  const backup = exportData();
  // Send to server
}, 3600000); // Every hour
```

#### 3. **Data Encryption**

Encrypt before storing:

```typescript
import { encrypt, decrypt } from 'crypto-js';

const encrypted = encrypt(JSON.stringify(todos));
localStorage.setItem('nexus-hub-todos', encrypted);
```

## Debugging

### Check Storage in DevTools

1. Open DevTools (F12)
2. Go to **Application** tab
3. Select **Local Storage**
4. Choose your domain
5. View stored data

### Clear Storage

```javascript
// Clear all
localStorage.clear();

// Clear specific keys
localStorage.removeItem('nexus-hub-todos');
localStorage.removeItem('nexus-hub-theme');
localStorage.removeItem('nexus-hub-filters');
```

### Test Storage

```typescript
const testStorage = () => {
  try {
    const key = 'test';
    localStorage.setItem(key, 'value');
    localStorage.getItem(key);
    localStorage.removeItem(key);
    return true; // Storage available
  } catch (e) {
    return false; // Storage not available
  }
};
```

## Best Practices

1. **Always handle errors** when accessing storage
2. **Check storage availability** before using
3. **Validate data** before parsing from storage
4. **Provide export/import** for user backup
5. **Set reasonable limits** on todo count
6. **Use JSON.stringify/parse** for data serialization
7. **Handle corrupted data** gracefully

## Migration to Backend

When you're ready to add a server:

1. Create API endpoints for CRUD
2. Update storage functions to use API
3. Add server-side validation
4. Implement data sync
5. Handle conflicts and concurrency

## Resources

- [MDN localStorage Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [Web Storage API](https://html.spec.whatwg.org/multipage/webstorage.html)
- [Local Storage Best Practices](https://web.dev/storage/)
