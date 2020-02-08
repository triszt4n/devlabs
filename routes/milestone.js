const renderMW = require("../middlewares/default/render");
const authMW = require("../middlewares/auth/auth");
const getProjectMW = require("../middlewares/project/getProject");
const getMilestoneMW = require("../middlewares/milestone/getMilestone");
const editMilestoneMW = require("../middlewares/milestone/editMilestone");
const newMilestoneMW = require("../middlewares/milestone/newMilestone");
const deleteMilestoneMW = require("../middlewares/milestone/deleteMilestone");

module.exports = function (app) {
    var objectRepository = {};

    app.use("/milestone/edit/:msID",
        authMW(objectRepository),
        editMilestoneMW(objectRepository),
        getMilestoneMW(objectRepository),
        renderMW(objectRepository, "milestone_editnew")
    );

    app.use("/milestone/new/:projID",
        authMW(objectRepository),
        newMilestoneMW(objectRepository),
        getProjectMW(objectRepository),
        renderMW(objectRepository, "milestone_editnew")
    );

    app.post("/milestone/delete/:msID",
        authMW(objectRepository),
        deleteMilestoneMW(objectRepository),
    );
};