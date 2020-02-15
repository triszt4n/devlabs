/**
 * checks, if editing the data of account is possible
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        if (req.body.email === "" || req.body.email.match(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/g) === null) {
            req.session.message = "Please enter a valid email address.";
            return res.redirect("/account/edit");
        }

        if ((res.locals.dev !== null) && (res.locals.dev._id != req.session.userID)) { //can't use !== (userID is not ObjectID())
            req.session.message = "Another account uses this email address. Please choose another one.";
            return res.redirect("/account/edit");
        }

        delete res.locals.dev;
        return next();
    };  
};