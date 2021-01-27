const ToDo = require('../models/Todo');

exports.getAllTodos = async (req, res, next) => {
  try {
    const todos = await ToDo.find();
    res.send(todos);
  } catch (error) {
    next(error);
  }
};

exports.getTodosByUser = async (req, res, next) => {
  console.log("User Details: ", req.user)
  try {
    const todos = await ToDo.find({ user: req.user._id })
    res.send(todos)
  }
  catch(err) {
    next(err)
  }
}

exports.getToDo = async (req, res, next) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo)
      throw new Error(
        `No todo with id: ${req.params.id}`
      );
    res.send(todo);
  } catch (error) {
    next(error);
  }
};

exports.addToDo = async (req, res, next) => {

  let todoData = {...req.body}

  // add user ID from token
  if(!todoData.user) {
    todoData.user = req.user._id
  }

  try {
    const todo = new ToDo(todoData);
    const todoDb = await todo.save();
    res.send(todoDb);
  } catch (error) {
    next(error);
  }
};

exports.updateToDo = async (req, res, next) => {

  // TODO: check if user is the owner of given todo...

  try {
    const todo = await ToDo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!todo)
      throw new Error(
        `No todo with id: ${req.params.id}`
      );

    res.send(todo);
  } 
  catch (error) {
    next(error);
  }
};

exports.deleteToDo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await ToDo.findByIdAndDelete(
      req.params.id
    );
    if (!todo)
      throw new Error(
        `No todo with id: ${req.params.id}`
      );
    res.send(todo);
  } catch (error) {
    next(error);
  }
};
