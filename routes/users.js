const express = require('express');
const router = express.Router();
const {
  userValidationRules,
} = require('../middleware/validation/userValidationRules');
const {
  validationErrorHadling,
} = require('../middleware/validation/validationErrorHadling');

const {
  auth,
} = require('../middleware/authentication/authenticator');
const { isAdmin } = require('../middleware/roleChecker');

const {
  getAllUsers,
  addUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  getOrdersByUser,
} = require('../controllers/usersController');

const { getTodosByUser } = require('../controllers/todosController');


// specific routes must be BEFORE dynamic routes (/:id...)
router
  .route('/login')
  .post(
    userValidationRules(), 
    validationErrorHadling,
    loginUser
  )

router.get('/me', auth, getUser)
router.get('/me/todos', auth, getTodosByUser)
  
router
  .route('/')
  .get(auth, isAdmin, getAllUsers)
  .post(
    userValidationRules(),
    validationErrorHadling,
    addUser
  );

router
  .route('/:id')
  .get(auth, getUser)
  .patch(auth, updateUser)
  .delete(auth, deleteUser)


module.exports = router;
