# full-stack-sample
A sample full stack application using Express, Postgres and React.

## Installation
1) Clone the repo
2) Create a new postgres database called "full_stack_sample"
3) CD into the folder where repo resides
4) Run "npm i" to install all of the dependencies
5) Run "npm run-script seed" to seed the database
6) Run "npm start" to start the application
* if React does not launch, add a .env into client folder
    * Add "SKIP_PREFLIGHT_CHECK=true" to this .env file (no quotes)

### Demo credentials
1) Admin user - email: c.brown@peanuts.com, password: football
2) Applicant user - email: m.ginobili@spurs.com, password: gospursG0

### Technologies Used
* Axios - API requests
* Bcrypt - password encryption
* Connect-session-sequelize - save session cookies to db
* Express - server
* Express-session - create session cookies
* Node-sass - modularized css
* React - UI
* React-router-dom - page routing for React
* Sequelize - connection to database / table schemas
* Validator - validate fields before attempting to input into the databse