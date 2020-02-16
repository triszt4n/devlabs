/**
 * render the required html embedding items
 * (note: pass data from session like: message, userID, showAll, activeBase)
 */
module.exports = function (objectRepository, viewName) {
    return (req, res) => {
        //Some extra data for ejs templating:
        if (typeof req.session.message !== 'undefined') {
            res.locals.message = req.session.message;
            delete req.session.message;
        }
        if (typeof req.session.userID !== 'undefined') {
            res.locals.userID = req.session.userID;
        }
        res.locals.activeBase = req.path.split('/')[1];

        //Final rendering:
        res.render(viewName, res.locals);
    };
};