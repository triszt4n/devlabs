/**
 * edit developer with devID with passed data, then redirect to /account.
 * if problem occurs, pass a message to session.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();

        // missing input: /devs/edit/:devID and message = "Please fill in all queries."
        // found email in db: /devs/edit/:devID and message = "Account already exists."
        // wrong email format: /devs/edit/:devID and message = "Not an email address."
    };
  
};