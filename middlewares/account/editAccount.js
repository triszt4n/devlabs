/**
 * edit account with passed data, then redirect to /account.
 * if problem occurs, pass a message to session.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        let dev = res.locals.dev;
        dev.email = req.body.email;
        dev.name = (req.body.name !== "")? req.body.name : req.body.email.split("@")[0];
        dev.phone = req.body.phone;

        dev.save((err) => {
            if (err) {
                console.error(err);
                req.session.message = "An error occured during applying changes. Try again.";
                return res.redirect("/account/edit");
            }

            return res.redirect("/account");
        });
    };
  
};