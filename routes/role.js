const authMW = require("../middlewares/auth/auth");
const renderMW = require("../middlewares/misc/render");

const getDevByIDMW = require("../middlewares/dev/getDevByID");
const getDevListMW = require("../middlewares/dev/getDevList");

const getSprintMW = require("../middlewares/sprint/getSprint");

const deleteRoleMW = require("../middlewares/role/deleteRole");
const editRoleMW = require("../middlewares/role/editRole");
const getRoleMW = require("../middlewares/role/getRole");
const saveRoleMW = require("../middlewares/role/saveRole");

module.exports = function(app) {

    var objectRepository = {
    };

    app.use('/role/edit/:roleID',
        authMW(objectRepository),
        getRoleMW(objectRepository),
        editRoleMW(objectRepository),
        getSprintMW(objectRepository),
        getDevByIDMW(objectRepository),
        renderMW(objectRepository, 'role_edit')
    );

    app.use('/role/new/:sprintID',
        authMW(objectRepository),
        saveRoleMW(objectRepository),
        getSprintMW(objectRepository),
        getDevListMW(objectRepository),
        renderMW(objectRepository, 'role_new')
    );

    app.use('/role/delete/:roleID',
        authMW(objectRepository),
        deleteRoleMW(objectRepository)
    );

};