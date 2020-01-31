const authMW = require("../middlewares/auth/auth");
const renderMW = require("../middlewares/misc/render");

const checkDevLoggedInMW = require("../middlewares/profile/checkDevLoggedIn");

const deleteDevMW = require("../middlewares/dev/deleteDev");
const editDevMW = require("../middlewares/dev/editDev");
const getDevByIDMW = require("../middlewares/dev/getDevByID");
const getDevListMW = require("../middlewares/dev/getDevList");
const saveDevMW = require("../middlewares/dev/saveDev");

const getDevRoleListMW = require("../middlewares/role/getDevRoleList");

module.exports = function(app) {
    
    var objectRepository = {
    };

    app.get('/devs',
        authMW(objectRepository),
        getDevListMW(objectRepository),
        renderMW(objectRepository, "devs")
    );

    app.get('/devs/:devID',
        authMW(objectRepository),
        checkDevLoggedInMW(objectRepository),
        getDevByIDMW(objectRepository),
        getDevRoleListMW(objectRepository),
        renderMW(objectRepository, 'dev_manage')
    );

    app.use('/devs/edit/:devID',
        authMW(objectRepository),
        getDevByIDMW(objectRepository),
        editDevMW(objectRepository),
        renderMW(objectRepository, 'dev_edit')
    );

    app.use('/devs/new',
        authMW(objectRepository),
        saveDevMW(objectRepository),
        renderMW(objectRepository, 'dev_new')
    );

    app.use('/devs/delete/:devID',
        authMW(objectRepository),
        getDevRoleListMW(objectRepository),
        deleteDevMW(objectRepository)
    );

};