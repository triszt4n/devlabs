const renderMW = require("../middlewares/default/render");
const authMW = require("../middlewares/auth/auth");
const getProjectMW = require("../middlewares/project/getProject");
const getMilestoneMW = require("../middlewares/milestone/getMilestone");
const editMilestoneMW = require("../middlewares/milestone/editMilestone");
const newMilestoneMW = require("../middlewares/milestone/newMilestone");
const deleteMilestoneMW = require("../middlewares/milestone/deleteMilestone");

const ProjectModel = require("../models/project");
const MilestoneModel = require("../models/milestone");

module.exports = function (app) {
    var objectRepository = {
        ProjectModel: ProjectModel,
        MilestoneModel: MilestoneModel
    };

    app.use("/milestone/edit/:msID",
        authMW(objectRepository),
        getMilestoneMW(objectRepository),
        editMilestoneMW(objectRepository),
        renderMW(objectRepository, "milestone_editnew")
    );

    app.use("/milestone/new/:projID",
        authMW(objectRepository),
        getProjectMW(objectRepository),
        newMilestoneMW(objectRepository),
        renderMW(objectRepository, "milestone_editnew")
    );

    app.get("/milestone/delete/:msID",
        authMW(objectRepository),
        getMilestoneMW(objectRepository),
        deleteMilestoneMW(objectRepository),
    );
};