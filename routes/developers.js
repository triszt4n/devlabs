const renderMW = require("../middlewares/default/render");
const authMW = require("../middlewares/auth/auth");
const getMembershipListMW = require("../middlewares/membership/getMembershipList");
const getDeveloperByIDMW = require("../middlewares/developer/getDeveloperByID");
const getDeveloperListMW = require("../middlewares/developer/getDeveloperList");

module.exports = function (app) {
    var objectRepository = {};

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