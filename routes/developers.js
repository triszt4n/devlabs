const renderMW = require("../middlewares/default/render");
const authMW = require("../middlewares/auth/auth");
const getMembershipListMW = require("../middlewares/membership/getMembershipList");
const getDeveloperByIDMW = require("../middlewares/developer/getDeveloperByID");
const getDeveloperListMW = require("../middlewares/developer/getDeveloperList");

const DeveloperModel = require("../models/developer");
const MembershipModel = require("../models/membership");
const ProjectModel = require("../models/project");

module.exports = function (app) {
    var objectRepository = {
        DeveloperModel: DeveloperModel,
        MembershipModel: MembershipModel,
        ProjectModel: ProjectModel
    };

    app.get("/developers",
        authMW(objectRepository),
        getDeveloperListMW(objectRepository),
        renderMW(objectRepository, "developers")
    );
    
    app.get("/developers/:devID",
        authMW(objectRepository),
        getDeveloperByIDMW(objectRepository),
        getMembershipListMW(objectRepository),
        renderMW(objectRepository, "developer_inspect")
    );
};