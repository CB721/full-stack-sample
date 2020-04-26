const path = require("path");
const router = require("express").Router();
const users = require("./users");
const applications = require("./applications");

router.use("/users", users);
router.use("/applications", applications);

module.exports = router;