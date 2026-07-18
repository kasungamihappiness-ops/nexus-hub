const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 1000 },
    completed: { type: Boolean, default: false, index: true },
    category: { type: String, enum: ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Other'], default: 'Personal' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: Date, index: true },
    tags: [{ type: String, trim: true }],
    createdAt: { type: Date, default: Date.now, index: true },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

todoSchema.index({ userId: 1, completed: 1 });
todoSchema.index({ userId: 1, category: 1 });
todoSchema.index({ userId: 1, priority: 1 });

module.exports = mongoose.model('Todo', todoSchema);
