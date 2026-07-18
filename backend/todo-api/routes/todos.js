/**
 * Todo API Routes
 */

const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const TodoController = require('../controllers/TodoController');

router.use(authenticate);

router.get('/', TodoController.getAll);
router.get('/:id', TodoController.getById);
router.post('/', TodoController.create);
router.put('/:id', TodoController.update);
router.delete('/:id', TodoController.delete);
router.post('/bulk-delete', TodoController.deleteMultiple);
router.patch('/bulk-update', TodoController.updateMultiple);
router.get('/export/:format', TodoController.export);
router.post('/import', TodoController.import);

module.exports = router;
