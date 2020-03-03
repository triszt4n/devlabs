/**
 * Arbitrary middleware to see user/developer's details. Redirect with the session's userID to
 * the developers/:devID.
 */
module.exports = function (objectRepository) {
    return function (req, res, next) {
        return res.redirect(`/developers/${req.session.userID}`);
    };
};