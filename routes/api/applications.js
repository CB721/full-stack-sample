const router = require("express").Router();
const controller = require("../../controllers/applications");

router
    .route("/")
    .post(controller.createApplication)
    .get(controller.findUnassignedApplications);


module.exports = router;