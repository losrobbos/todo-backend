#### ToDo Backend

In order to make this app work, you need a configuration file.

Please see the file named ".env.dev" in the folder "config"

There you find the following lines:

```
MONGO_URI=mongodb://localhost/todo-db
JWT_SECRET=holySecretNobodyWillGuess
JWT_EXPIRY=5h
```

In case you do not have MongoDB locally running, please specify here your ATLAS url. Do not forget to also set the database name in the connection string (e.g. to "todo-db")

In case you have MongoDB installed locally and it is not starting automatically, run "sudo mongod" in a terminal (preferred outside VsCode)

Run "npm run seed" to seed in some initial data into your app.

Now you can startup the app with "npm start".

Testing (without a Frontend):
- Open POSTMAN or another REST client 
- Test out the route POST /users to sign up a new user
- Test out the route POST /users/login to login your signed up user
- Create a new todo using the POST route /todos and assign it to your new user
  - you need to provide the token in your request in a header named "Auth".
  - e.g. "Auth": "eyA163485585eggj"

Once it works locally - prepare deployment: 
- Create a file .env for your production data (=> fill in your MongoDB Atlas URL)
- Put the .env in the folder config
- Run your seed script in this way: `NODE_ENV=production npm run seed` 
  - this should write now some records into your CENTRAL database (so Atlas likely)
- Check if the users & todos were filled into the central DB, by looking into Atlas or Compass
- In case you wanna deploy to heroku: run "heroku create" in the app folder
  - For Heroku you need to set the environment variables online - in the project page
  - For Deployment: "git push heroku master"
- In case you deploy to vercel: Just run "vercel"

