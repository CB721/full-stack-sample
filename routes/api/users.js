const router = require("express").Router();
const controller = require("../../controllers/users");

router
    .route("/")
    .post(controller.createUser);
router
    .route("/login")
    .post(controller.login);
router
    .route("/logout")
    .get(controller.logout);

module.exports = router;