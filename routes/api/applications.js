const router = require("express").Router();
const controller = require("../../controllers/applications");

router
    .route("/")
    .post(controller.createApplication)
    .get(controller.findUnassignedApplications)
    .put(controller.updateApplication);

module.exports = router;