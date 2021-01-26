const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
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
app.use(express.json({ extended: false }));
app.use(cors());
app.use(cookieParser());

// CONTROLLER for the HOME ROUTE
const sayHello = (req, res) => {
  res.send({ welcome: 'Welcome to the Record Store API' });
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
  // log the WHOLE ERROR information just to US INTERNALLY
  // including the line numbers where the error happened, so we can debug easily
  console.log(err);

  // this is the error response for our users
  res.status(err.status || 500).send({
    error: {
      message: err.message || err
    },
  });
});
