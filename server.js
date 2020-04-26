const express = require("express");
const path = require("path");
const session = require("express-session");
require('dotenv').config();
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const app = express();
const db = require("./models");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(session(
    {
        secret: "so many secrets",
        store: new SequelizeStore({
            db: db.sequelize
        }),
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 7200000
        }
    }
));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes);

// change to false for production
db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log(`App running on port ${PORT}`);
    });
});
