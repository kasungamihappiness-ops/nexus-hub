# To-Do List App - Development Guide

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- TypeScript knowledge (optional)

### Installation

```bash
# Navigate to todo-app directory
cd frontend/todo-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3001`

## Project Structure

```
src/
├── components/          # React components
│   ├── TodoList.tsx     # Main container
│   ├── TodoItem.tsx     # Individual task
│   ├── TodoForm.tsx     # Add/edit form
│   ├── SearchBar.tsx    # Search input
│   ├── FilterPanel.tsx  # Filter controls
│   ├── Statistics.tsx   # Stats display
│   └── ThemeToggle.tsx  # Dark mode toggle
├── hooks/               # Custom hooks
│   ├── useTodoStorage.ts
│   ├── useFilter.ts
│   └── useTheme.ts
├── types/               # TypeScript types
│   └── Todo.ts
├── utils/               # Utility functions
│   ├── storage.ts       # localStorage operations
│   └── validators.ts    # Validation logic
├── styles/              # CSS files
│   └── index.css
├── App.tsx              # Root component
└── index.tsx            # Entry point
```

## Key Features Implementation

### 1. Adding a Todo

```typescript
const handleAddTodo = (todo: Todo) => {
  addTodo(todo);  // Saved to localStorage
};
```

### 2. Filtering Todos

```typescript
const { filters, filteredTodos, updateFilters } = useFilter(todos);

// Update filter
updateFilters({ status: 'completed' });
```

### 3. Dark Mode

```typescript
const { theme, toggleTheme } = useTheme();

// Toggle theme (persisted)
toggleTheme();
```

### 4. Local Storage

```typescript
const todos = getTodos();  // Load from localStorage
saveTodos(updatedTodos);  // Save to localStorage
```

## Styling

### Tailwind CSS

The app uses Tailwind CSS for styling. Classes are already applied in components.

#### Dark Mode

Dark mode is implemented using Tailwind's `dark:` prefix:

```jsx
<div className="bg-white dark:bg-gray-800">
  Light and dark mode styling
</div>
```

### Custom CSS

Additional styles in `src/styles/index.css`:
- Scrollbar customization
- Smooth transitions
- Base styles

## Adding New Features

### Add a Category

1. Update categories in `components/TodoList.tsx`:

```typescript
const categories = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'NewCategory'];
```

2. Update color mapping in `components/TodoItem.tsx`:

```typescript
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    // ...
    NewCategory: 'bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200',
  };
};
```

### Add a Filter

1. Update `FilterSettings` in `types/Todo.ts`
2. Add filter logic in `hooks/useFilter.ts`
3. Add UI control in `components/FilterPanel.tsx`

### Add a Hook

1. Create new file in `hooks/`:

```typescript
import { useState, useEffect } from 'react';

export const useCustomHook = () => {
  const [state, setState] = useState(null);
  
  useEffect(() => {
    // Setup
    return () => {
      // Cleanup
    };
  }, []);
  
  return { state };
};
```

2. Use in component:

```typescript
const { state } = useCustomHook();
```

## Testing

### Run Tests

```bash
npm test
```

### Test Structure

Tests are located next to components with `.test.tsx` extension.

## Building for Production

```bash
# Build
npm run build

# Output in 'dist' directory

# Preview build
npm run preview
```

## Deployment

### GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Build and deploy
npm run build
npm run deploy
```

### Netlify

```bash
# Build
npm run build

# Drag and drop 'dist' folder to Netlify
# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## Performance Optimization

### Code Splitting

Vite automatically handles code splitting.

### Tree Shaking

Unused code is automatically removed in production build.
### Lazy Loading

Optionally use React.lazy:

```typescript
const TodoList = React.lazy(() => import('./components/TodoList'));
```

## Troubleshooting

### Storage not working?

1. Check if localStorage is available:
```javascript
if (typeof localStorage === 'undefined') {
  console.error('localStorage not available');
}
```

2. Check browser console for errors
3. Clear cache and reload

### Styling issues?

1. Ensure Tailwind CSS is properly imported
2. Check `tailwind.config.js` is correct
3. Rebuild with `npm run build`

### Performance slow?

1. Check DevTools Performance tab
2. Use React DevTools Profiler
3. Check for unnecessary re-renders

## Environment Variables

Create `.env` file:

```env
VITE_API_URL=http://localhost:3000
VITE_DEBUG=true
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Useful Resources

- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Docs](https://vitejs.dev/)
- [localStorage MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Contributing

See main [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.
