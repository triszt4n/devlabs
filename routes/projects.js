const renderMW = require("../middlewares/default/render");
const authMW = require("../middlewares/auth/auth");
const getProjectListMW = require("../middlewares/project/getProjectList");
const getProjectMW = require("../middlewares/project/getProject");
const checkIfLeaderMW = require("../middlewares/project/checkIfLeader");
const editProjectMW = require("../middlewares/project/editProject");
const newProjectMW = require("../middlewares/project/newProject");
const deleteProjectMW = require("../middlewares/project/deleteProject");
const getTopProjectListMW = require("../middlewares/project/getTopProjectList");
const inviteMemberMW = require("../middlewares/membership/inviteMember");
const kickMemberMW = require("../middlewares/membership/kickMember");
const getMemberListMW = require("../middlewares/membership/getMemberList");
const getDeveloperListMW = require("../middlewares/developer/getDeveloperList");
const getMilestoneListMW = require("../middlewares/milestone/getMilestoneList");

module.exports = function (app) {
    var objectRepository = {};

    app.use("/projects/edit/:projID",
        authMW(objectRepository),
        editProjectMW(objectRepository),
        getProjectMW(objectRepository),
        renderMW(objectRepository, "project_editnew")
    );

    app.use("/projects/new",
        authMW(objectRepository),
        newProjectMW(objectRepository),
        renderMW(objectRepository, "project_editnew")
    );

    app.post("/projects/delete/:projID",
        authMW(objectRepository),
        deleteProjectMW(objectRepository),
    );

    app.post("/projects/invite/:projID",
        authMW(objectRepository),
        inviteMemberMW(objectRepository)
    );

    app.post("/projects/kick/:memshipID",
        authMW(objectRepository),
        kickMemberMW(objectRepository)
    );
    
    app.get("/top",
        authMW(objectRepository),
        getTopProjectListMW(objectRepository),
        renderMW(objectRepository, "top")
    );

    app.get("/projects(/all)?",
        authMW(objectRepository),
        getProjectListMW(objectRepository), //(if /all passed, return every project, otherwise, only Dashboard)
        renderMW(objectRepository, "projects")
    );

    app.get("/projects/:projID",
        authMW(objectRepository),
        getProjectMW(objectRepository),
        getDeveloperListMW(objectRepository),
        getMemberListMW(objectRepository),
        getMilestoneListMW(objectRepository),
        checkIfLeaderMW(objectRepository),
        renderMW(objectRepository, "project_inspect")
    );
};