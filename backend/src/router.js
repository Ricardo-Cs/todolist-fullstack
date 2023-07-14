const express = require('express');
const router = express.Router();

const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

router.get('/tasks', tasksController.getAll);
router.get('/tasks/:search', tasksController.getBySearch);
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.insertTask);
router.delete('/tasks/:id', tasksController.deleteTask);
router.put('/tasks/:id', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldStatus, tasksController.updateTask);

module.exports = router;