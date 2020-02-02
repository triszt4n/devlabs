/**
 * if developer is logged in according to session then next(), else:
 * check if email and pw from body is matching and has admin rights, 
 * if not matching: redirect /?err=no_match,
 * if not admin: redirect /?err=not_registered
 * else: session.devID = res.devID and next()
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};