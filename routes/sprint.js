const authMW = require("../middlewares/auth/auth");
const renderMW = require("../middlewares/misc/render");

const deleteSprintMW = require("../middlewares/sprint/deleteSprint");
const editSprintMW = require("../middlewares/sprint/editSprint");
const getSprintMW = require("../middlewares/sprint/getSprint");
const getSprintListMW = require("../middlewares/sprint/getSprintList");
const saveSprintMW = require("../middlewares/sprint/saveSprint");

const getSprintRoleListMW = require("../middlewares/role/getSprintRoleList");
const deleteRoleMW = require("../middlewares/role/deleteRole");

module.exports = function(app) {

    var objectRepository = {
    };

    app.get('/sprints',
        authMW(objectRepository),
        getSprintListMW(objectRepository),
        renderMW(objectRepository, "sprints")
    );

    app.get('/sprints/:sprintID',
        authMW(objectRepository),
        getSprintMW(objectRepository),
        getSprintRoleListMW(objectRepository),
        renderMW(objectRepository, 'sprint_manage')
    );

    app.use('/sprints/edit/:sprintID',
        authMW(objectRepository),
        getSprintMW(objectRepository),
        editSprintMW(objectRepository),
        renderMW(objectRepository, 'sprint_edit')
    );

    app.use('/sprints/new',
        authMW(objectRepository),
        saveSprintMW(objectRepository),
        renderMW(objectRepository, 'sprint_new')
    );

    app.use('/sprints/delete/:sprintID',
        authMW(objectRepository),
        getSprintRoleListMW(objectRepository),
        deleteSprintMW(objectRepository)
    );

};