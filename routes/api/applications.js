const router = require("express").Router();
const controller = require("../../controllers/applications");

router
    .route("/")
    .post(controller.createApplication);


module.exports = router;