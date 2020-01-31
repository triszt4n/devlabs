/**
 * if developer is logged in according to session then next(), else:
 * check if username and pw from body is matching, if not: redirect / 
 * and set locals.err = "no_match", else: session.devID = res.devID and next()
 * (note to myself: lowercasify username)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};