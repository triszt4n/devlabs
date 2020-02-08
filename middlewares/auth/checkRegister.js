/**
 * checks, if registering is possible with the data passed. redirects with error
 * message if there's problem.
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {
        return next();

        // missing input: /register and message = "Please fill in all queries."
        // found email in db: /register and message = "Account already exists."
        // wrong email format: /register and message = "Not an email address."

    };
  
};