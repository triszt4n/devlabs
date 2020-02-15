/**
 * checks the login credentials, redirects with errormessage if there's problem.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        if (req.body.email === "" || req.body.pw === "") {
            req.session.message = "Please fill in all queries.";
            return res.redirect("/");
        }

        if (res.locals.dev === null) {
            req.session.message = "No developer registered under this email address.";
            return res.redirect("/");
        }

        if (res.locals.dev.pw !== req.body.pw) {
            req.session.message = "Wrong email address and password combination.";
            return res.redirect("/");
        }

        if (req.body.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/g) === null) {
            req.session.message = "Not an email address.";
            return res.redirect("/");
        }

        return next();
    };  
};