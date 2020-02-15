/**
 * completes registration of developer/Dev with data passed by posting,
 * and redirect to /
 */
const requireOption = require('../default/requireOption');

module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        //Defining new Dev:
        var DeveloperModel = requireOption(objectRepository, 'DeveloperModel');
        var dev = new DeveloperModel();

        dev.name = (req.body.name !== "")? req.body.name : req.body.email.split("@")[0];
        dev.email = req.body.email;
        dev.pw = req.body.pw;
        dev.phone = req.body.phone;

        dev.save((err) => {
            if (err) {
                //req.session.message = err;
                console.log(err);
                return res.redirect("/register");
            }
            return res.redirect("/");
        });
    };
};