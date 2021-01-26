const mongoose = require('mongoose');
const User = require('../models/User');
const faker = require('faker');
const Todo = require('../models/Todo');

require("../config/load") // load mongo connection details from config

console.log(`You are running the seed script.`);
console.log(`All your previous data will be purged.`);

// We connect to the database

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => console.log(`You are connected to the DB. Seed will start now...`))
.catch((err) => {
  console.error('connection error:', err)
});

(async function () {
  // We purge all the users
  try {
    await User.deleteMany({});
    console.log(`All users have been deleted...`);

    await Todo.deleteMany({});
    console.log(`All todos have been deleted...`);

  } catch (err) {
    console.log(err);
  }

  // We create 20 fake users

  const userPromises = Array(2)
    .fill(null)
    .map(() => {
      const user = new User({
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.random.arrayElement(['Admin', 'User']),
      });

      user.hashPassword()

      console.log(`We created a user: ${user.email} ${user.role}`);
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log(`All users are saved`);
  } catch (error) {
    console.log(error);
  }

  // We create 10 fake orders with existing userIds and recordIds

  const todoPromises = Array(5)
    .fill(null)
    .map(async () => {
      // grab random user from DB
      const randomUser = await User.aggregate([
        { $sample: { size: 1 } },
      ]);
      console.log(
        '--------------------------------------------'
      );
      console.log('HERE IS THE RANDOM USER', randomUser);

      const todo = new Todo({
        title: faker.random.words(5),
        user: randomUser[0]._id,
        status: faker.random.arrayElement(['OPEN', 'ACTIVE', 'DONE'])
      });

      console.log(`We created todo ${todo}`);
      return todo.save();
    });

  try {
    await Promise.all(todoPromises);
    console.log(`All the orders are saved`);
  } catch (error) {
    console.log(error);
  }

  // We close the db connection
  console.log(
    `We are closing the mongoose connection. Ciaaaaoo!`
  );

  mongoose.connection.close();
})();
