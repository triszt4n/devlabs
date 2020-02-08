/**
 * checks, if changing pw with passed data is possible.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();

        // missing input: /profile/pw, message = "Please fill in all queries."
        // wrong old password: /profile/pw, message = "Wrong password!"
        // newpass1 and newpass2 are not the same: /profile/pw, message = "Non-matching new passwords."
    };
  
};