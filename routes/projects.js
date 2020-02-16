const renderMW = require("../middlewares/default/render");
const authMW = require("../middlewares/auth/auth");
const getProjectListMW = require("../middlewares/project/getProjectList");
const getProjectMW = require("../middlewares/project/getProject");
const editProjectMW = require("../middlewares/project/editProject");
const newProjectMW = require("../middlewares/project/newProject");
const deleteProjectMW = require("../middlewares/project/deleteProject");
const getTopProjectListMW = require("../middlewares/project/getTopProjectList");
const inviteMemberMW = require("../middlewares/membership/inviteMember");
const kickMemberMW = require("../middlewares/membership/kickMember");
const getMemberListMW = require("../middlewares/membership/getMemberList");
const getDeveloperListMW = require("../middlewares/developer/getDeveloperList");
const trimDeveloperListMW = require("../middlewares/developer/trimDeveloperList");
const getMilestoneListMW = require("../middlewares/milestone/getMilestoneList");
const editMembershipMW = require("../middlewares/membership/editMembership");
const getMembershipMW = require("../middlewares/membership/getMembership");
const handOverLeadershipMW = require("../middlewares/membership/handOverLeadership");

const DeveloperModel = require("../models/developer");
const ProjectModel = require("../models/project");
const MilestoneModel = require("../models/milestone");
const MembershipModel = require("../models/membership");

module.exports = function (app) {
    var objectRepository = {
        DeveloperModel: DeveloperModel,
        ProjectModel: ProjectModel,
        MilestoneModel: MilestoneModel,
        MembershipModel: MembershipModel
    };

    app.use("/projects/edit/:projID",
        authMW(objectRepository),
        getProjectMW(objectRepository),
        editProjectMW(objectRepository),
        renderMW(objectRepository, "project_editnew")
    );

    app.use("/projects/new",
        authMW(objectRepository),
        newProjectMW(objectRepository),
        inviteMemberMW(objectRepository),
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

    app.get("/projects/kick/:memshipID",
        authMW(objectRepository),
        getMembershipMW(objectRepository),
        kickMemberMW(objectRepository)
    );

    app.get("/projects/handover/:memshipID",
        authMW(objectRepository),
        getMembershipMW(objectRepository),
        handOverLeadershipMW(objectRepository)
    );

    app.use("/projects/editrank/:memshipID",
        authMW(objectRepository),
        getMembershipMW(objectRepository),
        editMembershipMW(objectRepository),
        renderMW(objectRepository, "membership_rankedit")
    );
    
    app.get("/top",
        authMW(objectRepository),
        getTopProjectListMW(objectRepository),
        renderMW(objectRepository, "top")
    );

    app.get("/projects",
        authMW(objectRepository),
        getProjectListMW(objectRepository),
        renderMW(objectRepository, "projects")
    );

    app.get("/projects/:projID",
        authMW(objectRepository),
        getProjectMW(objectRepository),
        getDeveloperListMW(objectRepository),
        getMemberListMW(objectRepository),
        trimDeveloperListMW(objectRepository),
        getMilestoneListMW(objectRepository),
        renderMW(objectRepository, "project_inspect")
    );
};