const dotenv = require("dotenv")
const path = require("path")

/** LOAD ENVIRONMENT CONFIGURATION */
  // special variable __dirname always gives us the current directory => "config" in this case)
let envFilename = ""

  // production environment?
  // hint: on deployment services like Heroku or Vercel NODE_ENV will be set to production!
if(process.env.NODE_ENV == "production") {
  envFilename = '.env'
}
  // no environment set? assume "development environment" => load local configuration 
else {
  envFilename += '.env.dev'
  // load env file content and store key-value pairs in process.env
  let envPath = path.join(__dirname, envFilename)
  let config = dotenv.config({ path: envPath })
}


// module.exports = config