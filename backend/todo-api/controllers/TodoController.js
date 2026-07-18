/**
 * Todo Controller
 */

const TodoModel = require('../models/Todo');

class TodoController {
  static async getAll(req, res) {
    try {
      const { status, category, priority, sortBy } = req.query;
      const userId = req.user.id;

      let query = { userId };

      if (status === 'completed') query.completed = true;
      if (status === 'active') query.completed = false;
      if (category) query.category = category;
      if (priority) query.priority = priority;

      let todos = await TodoModel.find(query);

      if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        todos.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
      } else if (sortBy === 'title') {
        todos.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        todos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      res.json({ status: 'success', data: todos });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: { code: 'GET_TODOS_FAILED', message: error.message },
      });
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const todo = await TodoModel.findOne({ _id: id, userId: req.user.id });

      if (!todo) {
        return res.status(404).json({
          status: 'error',
          error: { code: 'NOT_FOUND', message: 'Todo not found' },
        });
      }

      res.json({ status: 'success', data: todo });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: { code: 'GET_TODO_FAILED', message: error.message },
      });
    }
  }

  static async create(req, res) {
    try {
      const todo = new TodoModel({ ...req.body, userId: req.user.id });
      await todo.save();
      res.status(201).json({ status: 'success', data: todo });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        error: { code: 'CREATE_TODO_FAILED', message: error.message },
      });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const todo = await TodoModel.findOneAndUpdate(
        { _id: id, userId: req.user.id },
        { ...req.body, updatedAt: new Date() },
        { new: true }
      );

      if (!todo) {
        return res.status(404).json({
          status: 'error',
          error: { code: 'NOT_FOUND', message: 'Todo not found' },
        });
      }

      res.json({ status: 'success', data: todo });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        error: { code: 'UPDATE_TODO_FAILED', message: error.message },
      });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      await TodoModel.findOneAndDelete({ _id: id, userId: req.user.id });
      res.json({ status: 'success', message: 'Todo deleted' });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: { code: 'DELETE_TODO_FAILED', message: error.message },
      });
    }
  }

  static async deleteMultiple(req, res) {
    try {
      const { ids } = req.body;
      await TodoModel.deleteMany({ _id: { $in: ids }, userId: req.user.id });
      res.json({ status: 'success', message: 'Deleted todos' });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: { code: 'DELETE_TODOS_FAILED', message: error.message },
      });
    }
  }

  static async updateMultiple(req, res) {
    try {
      const updates = req.body;
      const results = [];

      for (const [id, data] of Object.entries(updates)) {
        const todo = await TodoModel.findOneAndUpdate(
          { _id: id, userId: req.user.id },
          { ...data, updatedAt: new Date() },
          { new: true }
        );
        if (todo) results.push(todo);
      }

      res.json({ status: 'success', data: results });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: { code: 'UPDATE_TODOS_FAILED', message: error.message },
      });
    }
  }

  static async export(req, res) {
    try {
      const { format } = req.params;
      const todos = await TodoModel.find({ userId: req.user.id });

      if (format === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=todos.csv');
        const csv = todos.map(t => `"${t.title}","${t.category}","${t.priority}",${t.completed}`).join('\n');
        res.send(csv);
      } else {
        res.json({ status: 'success', data: todos });
      }
    } catch (error) {
      res.status(500).json({
        status: 'error',
        error: { code: 'EXPORT_FAILED', message: error.message },
      });
    }
  }

  static async import(req, res) {
    try {
      const { todos } = req.body;
      if (!Array.isArray(todos)) {
        return res.status(400).json({
          status: 'error',
          error: { code: 'INVALID_FORMAT', message: 'Todos must be an array' },
        });
      }
      const imported = await TodoModel.insertMany(
        todos.map(t => ({ ...t, userId: req.user.id }))
      );
      res.status(201).json({ status: 'success', data: imported });
    } catch (error) {
      res.status(400).json({
        status: 'error',
        error: { code: 'IMPORT_FAILED', message: error.message },
      });
    }
  }
}

module.exports = TodoController;
