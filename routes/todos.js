const express = require('express');
const router = express.Router();
const {
  auth,
} = require('../middleware/authentication/authenticator');
const { isAdmin } = require('../middleware/roleChecker');

const {
  getAllTodos,
  addToDo,
  getToDo,
  updateToDo,
  deleteToDo,
} = require('../controllers/todosController');

router
  .route('/')
  .get(getAllTodos)
  .post(auth, addToDo)

router
  .route('/:id')
  .get(getToDo)
  .patch(auth, updateToDo)
  .delete(auth, deleteToDo)


module.exports = router;
