/**
 * checks, if changing pw is possible, errors may be:
 * missing input: redirect to /profile/pw?err=missing_data
 * wrong old password: redirect to /profile/pw?err=wrong_pw
 * newpass1 and newpass2 are not the same: redirect to /profile/pw?err=no_match
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();
    };
  
};