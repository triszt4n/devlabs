/**
 * checks, if changing pw with passed data is possible.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        if (req.body.newpw1 === "" || req.body.newpw2 === "" || req.body.oldpw === "") {
            req.session.message = "Please fill in all queries.";
            return res.redirect("/account/pw");
        }

        if (req.body.newpw1 !== req.body.newpw2) {
            req.session.message = "Non-matching new passwords.";
            return res.redirect("/account/pw");
        }

        if (res.locals.dev.pw !== req.body.oldpw) {
            req.session.message = "Wrong old password!";
            return res.redirect("/account/pw");
        }

        if (req.body.newpw1.length < 6) {
            req.session.message = "Password too short.";
            return res.redirect("/account/pw");
        }

        return next();
    };  
};