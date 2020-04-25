const path = require("path");
const router = require("express").Router();
const users = require("./users");
const applications = require("./applications");

router.use("/users", users);
router.use("/applications", applications);

router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../../client/public/index.html"));
});

module.exports = router;