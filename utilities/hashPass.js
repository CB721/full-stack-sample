const bcrypt = require("bcryptjs");

module.exports = {
    corbato: function (resistance) {
        return new Promise(function (resolve, reject) {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(resistance, salt, (err, hash) => {
                    if (err) {
                        return reject(err);
                    } else {
                        return resolve(hash);
                    }
                });
            });
        })
    }
}