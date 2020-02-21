/**
 * change user's password in db to a 10-character random key, "send it to them".
 * finally redirect to /
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        if (req.method === "GET") {
            return next();
        }

        let dev = res.locals.dev;
        if (dev === null) {
            req.session.message = "Account does not exist.";
            return res.redirect("/forgotten");
        }

        dev.pw = generateRandomString(10);

        dev.save((err) => {
            if (err) {
                console.error(err);
                req.session.message = "An error occured in our database. Try again.";
                return res.redirect("/forgotten");
            }

            req.session.message = "New password: " + dev.pw;
            req.session.messageColor = "green";
            return res.redirect("/");
        });
    };
};

function generateRandomString(length) {
    var result = '';
    var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += charSet.charAt(Math.floor(Math.random() * charSet.length));
    }
    return result;
}