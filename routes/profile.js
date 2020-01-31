const authMW = require("../middlewares/auth/auth");
const renderMW = require("../middlewares/misc/render");

const retrieveIDMW = require("../middlewares/profile/retrieveID");
const checkDevLoggedInMW = require("../middlewares/profile/checkDevLoggedIn");

const deleteDevMW = require("../middlewares/dev/deleteDev");
const editDevMW = require("../middlewares/dev/editDev");
const getDevByIDMW = require("../middlewares/dev/getDevByID");

const getDevRoleListMW = require("../middlewares/role/getDevRoleList");

module.exports = function(app) {

    var objectRepository = {
    };

    app.get('/profile',
        authMW(objectRepository),
        retrieveIDMW(objectRepository),
        getDevByIDMW(objectRepository),
        getDevRoleListMW(objectRepository),
        renderMW(objectRepository, 'profile')
    );

    app.use('/profile/edit',
        authMW(objectRepository),
        retrieveIDMW(objectRepository),
        getDevByIDMW(objectRepository),
        editDevMW(objectRepository),
        renderMW(objectRepository, 'dev_edit')
    );

    app.use('/profile/delete/',
        authMW(objectRepository),
        retrieveIDMW(objectRepository),
        getDevRoleListMW(objectRepository),
        deleteDevMW(objectRepository),
        function(req, res, next) {
            req.session.destroy();
            res.redirect("/");            
            res.end();
        }
    );

};