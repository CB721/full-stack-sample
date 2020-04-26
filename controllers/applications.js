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
    },
    findUnassignedApplications: (req, res) => {
        // validate user is logged in
        if (!req.session.user) {
            return res.status(401).send("Log in to view");
            // validate the user is an admin
        } else if (!req.session.user.is_admin) {
            return res.status(403).send("Unauthorized access");
        }
        // find all applications that have not been assigned
        Application.findAll({
            where: {
                admin_id: null
            },
            include: [{
                model: User,
                as: "applicant"
            }]
        })
            .then(applications => {
                return res.status(200).json(applications);
            })
            .catch(err => res.status(500).json(err));
    },
    updateApplication: (req, res) => {
        // validate user is logged in
        if (!req.session.user) {
            return res.status(401).send("Log in to view");
        } else if (!req.body.id){
            return res.status(400).send("Application id missing");
        }
        const update = {};
        // iterate over req.body to find columns to update
        // omit the id column
        for (column in req.body) {
            if (column !== "id") {
                update[column] = req.body[column];
            }
        }
        Application.update(update, {
            where: {
                id: req.body.id
            }
        })
            .then(results => {
                // if an application was updated
                if (results[0]) {
                    return res.status(200).send("success");
                } else {
                    return res.status(404).send("No application found");
                }
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json(err);
            });
    }
}