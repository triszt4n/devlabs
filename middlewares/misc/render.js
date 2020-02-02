/**
 * render the required html embedding items
 * (note: if there's something in req.query.err, pass it to locals.message)
 */
module.exports = function (objectRepository) {

    return function (req, res, next) {

        if (typeof req.query.err !== 'undefined') {
            res.locals.message = req.query.err;
        }
        res.locals.activeBase = req.path.split('/')[1];

        return next();
    };
  
};