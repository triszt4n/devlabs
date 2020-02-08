/**
 * to see user's developer details, redirect with the session's userID to
 * the developers/:devID.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        return res.redirect(`/developers/${req.session.userID}`);
    };
};