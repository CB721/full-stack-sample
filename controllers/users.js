const { User, Application } = require("../models");
const bcrypt = require("bcryptjs");
const { isEmail, isByteLength } = require("validator");
const { corbato } = require("../utilities/hashPass");

module.exports = {
    createUser: (req, res) => {
        const { email, password, first_name, last_name, is_admin } = req.body;
        // validate email
        if (!isEmail(email)) {
            return res.status(400).send("Invalid email");
            // validate password is at between 8 and 16 characters
        } else if (!isByteLength(password, { min: 8, max: 16 })) {
            return res.status(400).send("Passwords must be between 8 and 16 characters");
            // validate first and last name
        } else if (!first_name || !last_name) {
            return res.status(400).send("First and last name required");
        }
        // hash password
        corbato(password)
            .then(hash => {
                // console.log(hash);
                checkEmail(hash);
            })
            .catch(err => res.status(500).json(err));
        // check if an email already exists on an existing user
        function checkEmail(hashedPassword) {
            User.findOne({
                where: {
                    email
                }
            })
                .then(results => {
                    // if there are any results, then a user already exists
                    if (results) {
                        return res.status(400).send("An account with that email already exists");
                    } else {
                        newUser(hashedPassword);
                    }
                })
                .catch(err => res.status(500).json(err));
        }
        // create user
        function newUser(hashedPassword) {
            User.create({
                email,
                password: hashedPassword,
                is_admin: is_admin || false,
                first_name,
                last_name
            })
                .then(results => {
                    // save user to session
                    req.session.user = {
                        email: results.email,
                        id: results.id,
                        is_admin: results.is_admin
                    }
                    // send success
                    return res.status(200).send("success");
                })
                .catch(err => res.status(500).json(err));
        }
    },
    login: (req, res) => {
        const { email, password } = req.body;
        // if the user is already signed in, check session
        if (req.session.user) {
            User.findOne({
                where: {
                    email: req.session.user.email
                }
            })
                .then(results => {
                    if (req.session.user.is_admin) {
                        admin(results);
                    } else {
                        applicant(results);
                    }
                })
                .catch(err => res.status(500).json(err));
        } else {
            // validate email
            if (!isEmail(email)) {
                return res.status(400).send("Invalid email");
                // validate password is at between 8 and 16 characters
            } else if (!isByteLength(password, { min: 8, max: 16 })) {
                return res.status(400).send("Passwords must be between 8 and 16 characters");
            }
            // find user by email
            User.findOne({
                where: {
                    email
                }
            })
                .then(results => {
                    if (!results) {
                        return res.status(404).send("No account found");
                    } else {
                        validatePass(results);
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        }
        // compare password with hashed password
        function validatePass(user) {
            bcrypt.compare(password, user.password)
                .then(match => {
                    // if the password matches
                    if (match) {
                        // save user to session
                        req.session.user = {
                            email: user.email,
                            id: user.id,
                            is_admin: user.is_admin
                        }
                        if (user.is_admin) {
                            admin(user);
                        } else {
                            applicant(user);
                        }
                    } else {
                        return res.status(401).send("Incorrect password");
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err);
                });
        }
        // if they are an admin, find all assigned applications
        function admin(user) {
            Application.findAll({
                where: {
                    admin_id: user.id
                },
                include: [{
                    model: User,
                    as: "applicant"
                }]
            })
                .then(applications => {
                    // send back user object with array of all applications
                    // omit the user's password;
                    const fullUser = {
                        applications,
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        is_admin: user.is_admin
                    }
                    return res.status(200).json(fullUser);
                })
                .catch(err => res.status(500).json(err));
        }
        // if they are an applicant, find all assigned applications
        function applicant(user) {
            Application.findAll({
                where: {
                    applicant_id: user.id
                }
            })
                .then(applications => {
                    // send back user object with array of all applications
                    // omit the user's password;
                    const fullUser = {
                        applications,
                        id: user.id,
                        email: user.email,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        is_admin: user.is_admin
                    }
                    return res.status(200).json(fullUser);
                })
                .catch(err => res.status(500).json(err));
        }
    },
    logout: (req, res) => {
        req.session.destroy(err => {
            if (err) throw err;
            else {
                return res.status(200).send("logged out");
            }
        });
    }
}