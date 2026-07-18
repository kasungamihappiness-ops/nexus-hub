# To-Do List Application

A modern, feature-rich to-do list application with local storage functionality. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Features

- ✅ **Add, Edit, Delete Tasks** - Full CRUD operations
- 💾 **Local Storage** - Persists data in browser
- 🎨 **Beautiful UI** - Modern Tailwind CSS design
- 📱 **Responsive Design** - Works on all devices
- 🔍 **Search & Filter** - Find tasks easily
- 🏷️ **Categories** - Organize tasks by category
- ⭐ **Priority Levels** - High, Medium, Low
- ✨ **Mark Complete** - Track task completion
- 🗑️ **Bulk Actions** - Delete multiple tasks
- 📊 **Statistics** - Task completion stats
- 🌙 **Dark Mode** - Toggle theme
- ⌨️ **Keyboard Shortcuts** - Keyboard navigation

## 🚀 Quick Start

### Installation

```bash
cd frontend
npm install
npm start
```

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   ├── TodoList.tsx
│   │   ├── TodoItem.tsx
│   │   ├── TodoForm.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── Statistics.tsx
│   │   └── ThemeToggle.tsx
│   ├── hooks/
│   │   ├── useTodoStorage.ts
│   │   ├── useFilter.ts
│   │   └── useTheme.ts
│   ├── types/
│   │   └── Todo.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   └── validators.ts
│   ├── styles/
│   │   └── index.css
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
└── tsconfig.json
```

## 🎨 UI Components

### TodoList
Main container component that displays all tasks.

### TodoItem
Individual task item with edit, delete, and complete actions.

### TodoForm
Form for adding and editing tasks with validation.

### SearchBar
Search functionality for finding tasks.

### FilterPanel
Filter tasks by status, category, priority.

### Statistics
Display task statistics and progress.

### ThemeToggle
Light/Dark mode toggle.

## 💾 Local Storage

Tasks are automatically saved to browser's localStorage:

```javascript
// Storage key
'nexus-hub-todos'

// Storage format
{
  todos: Task[],
  theme: 'light' | 'dark',
  filters: FilterSettings
}
```

## 🔧 Technologies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **localStorage API** - Data persistence

## 📋 Task Model

```typescript
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  priority: 'high' | 'medium' | 'low';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + K` | Focus search |
| `Ctrl/Cmd + N` | New task |
| `Ctrl/Cmd + L` | Toggle theme |
| `Enter` | Save task |
| `Escape` | Cancel edit |

## 🎯 Usage Examples

### Add a Task

```bash
1. Click "Add Task" button
2. Fill in title, description (optional)
3. Select category and priority
4. Click "Add"
```

### Edit a Task

```bash
1. Click edit icon on task
2. Modify details
3. Click "Save"
```

### Filter Tasks

```bash
1. Use SearchBar to find tasks
2. Use FilterPanel to filter by:
   - Status (All, Active, Completed)
   - Category
   - Priority
```

### Mark Complete

```bash
1. Click checkbox on task
2. Task moves to completed
3. Stats update automatically
```

## 📊 Statistics Features

- Total tasks
- Completed tasks
- Pending tasks
- Completion percentage
- Tasks by category
- Tasks by priority

## 🌙 Dark Mode

Toggle dark mode:
1. Click theme toggle button
2. Theme preference is saved in localStorage
3. Applies to entire application

## 🧪 Testing

```bash
npm test
```

## 📦 Build Output

```bash
npm run build
# Output in build/ directory
```

## 🚀 Deployment

### Deploy to GitHub Pages

```bash
npm run build
npm run deploy
```

### Deploy to Netlify

```bash
netlify deploy --prod --dir=build
```

## 🐛 Troubleshooting

### Tasks Not Saving
- Check browser localStorage is enabled
- Clear cache and reload
- Check browser console for errors

### Styling Issues
- Ensure Tailwind CSS is properly imported
- Clear node_modules and reinstall
- Check for conflicting CSS

## 🤝 Contributing

Contributions welcome! Please follow [CONTRIBUTING.md](../../CONTRIBUTING.md)

## 📄 License

MIT License - See LICENSE file

## 📞 Support

For issues or suggestions, please open a GitHub issue.

---

**Created for Nexus Hub** 🚀