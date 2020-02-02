const authMW = require("../middlewares/auth/auth");
const renderMW = require("../middlewares/misc/render");
const logoutMW = require("../middlewares/auth/logout");

const retrieveIDMW = require("../middlewares/profile/retrieveID");
const checkDevLoggedInMW = require("../middlewares/profile/checkDevLoggedIn");
const deregisterDevMW = require("../middlewares/profile/deregisterDev");
const checkChangePwMW = require("../middlewares/profile/checkChangePw");
const changePwMW = require("../middlewares/profile/changePw");

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
        (req, res, next) => {
            if (typeof req.body.email !== 'undefined') {
                res.redirect('/profile');
            }
            else {
                next();
            }
        },
        renderMW(objectRepository, 'dev_edit')
    );

    app.use('/profile/pw',
        authMW(objectRepository),
        retrieveIDMW(objectRepository),
        checkChangePwMW(objectRepository),
        changePwMW(objectRepository),
        renderMW('profile_pw', objectRepository)
    );

    app.use('/profile/deregister',
        authMW(objectRepository),
        retrieveIDMW(objectRepository),
        deregisterDevMW(objectRepository),
        logoutMW(objectRepository)
    );

    app.use('/profile/delete',
        authMW(objectRepository),
        retrieveIDMW(objectRepository),
        getDevRoleListMW(objectRepository),
        deleteDevMW(objectRepository),
        logoutMW(objectRepository)
    );

};