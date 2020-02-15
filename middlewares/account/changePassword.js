/**
 * changes developer's password to the body.newpass1,
 * then redirect to /
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        let dev = res.locals.dev;
        dev.pw = req.body.newpw1;

        dev.save((err) => {
            if (err) {
                console.error(err);
                req.session.message = "An error occured in our database. Try again.";
                return res.redirect("/account/pw");
            }

            return res.redirect("/");
        });
    };
};