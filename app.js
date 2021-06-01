const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require("./config/load")


/** CONNECT TO DB */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => console.log(`You are connected to the DB.`))
.catch((err) => {
  console.error('connection error:', err)
});

/** ROUTERS */
const usersRouter = require('./routes/users');
const todosRouter = require('./routes/todos');

app.listen(port, () => {
  console.log(
    `API listening at port ${port}`
  );
});

/** MIDDLEWARES */
app.use(express.json());
app.use(cors());

// CONTROLLER for the HOME ROUTE
const sayHello = (req, res) => {
  res.json({ welcome: 'Welcome to the TODO API' });
};

/** HOME ROUTE */
app.get('/', sayHello);

// HOOK IN OUR ROUTERS (= CHILD APIs) into our main api (= app)
app.use('/users', usersRouter);
app.use('/todos', todosRouter);

// 404 handler => kicks in if we did not found any matching route handler
app.use((req, res, next) => {
  let error = new Error(
    `The route ${req.url} does not exist`
  );
  error.status = 404;
  next(error);
});

// GENERIC ERROR HANDLER MIDDLEWARE OF EXPRESS
// - this will kick in on every error that our CODE produced!
app.use((err, req, res, next) => {
  // log the WHOLE ERROR information just to the terminal (= so internally to us only)
  // this way we get the line numbers where any error has happened, so we can debug "easily"
  console.log(err);

  // this is the error response for our users
  res.status(err.status || 500).send({
    error: err.message || err
  });
});
