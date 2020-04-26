const { User, Application } = require("../models");
const { isByteLength } = require("validator");

module.exports = {
    createApplication: (req, res) => {
        const content = req.body.content;
        const id = req.session.user.id;
        // validate user is logged in
        if (!req.session.user) {
            return res.status(401).send("Log in to submit");
            // validate content is at least 10 characters
        } else if (!isByteLength(content, { min: 10, max: 10000 })) {
            return res.status().send("Content must be at least 10 characters");
        }
        // create application
        Application.create({
            applicant_id: id,
            content
        })
            .then(application => {
                return res.status(200).json(application);
            })
            .catch(err => res.status(500).json(err));
    }
}