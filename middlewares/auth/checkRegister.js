/**
 * checks, if registering is possible, errors may be:
 * missing input: redirect to /register and set locals.err = "missing_input"
 * found username in db: redirect to /register and set locals.err = "already_exists"
 * (note to myself: lowercasify username)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};