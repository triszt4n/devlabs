const renderMW = require("../middlewares/default/render");
const authMW = require("../middlewares/auth/auth");
const logoutMW = require("../middlewares/auth/logout");
const getDeveloperByIDMW = require("../middlewares/developer/getDeveloperByID");
const editAccountMW = require("../middlewares/account/editAccount");
const deleteAccountMW = require("../middlewares/account/deleteAccount");
const removeRelationsMW = require("../middlewares/account/removeRelations");
const checkPasswordsMW = require("../middlewares/account/checkPasswords");
const changePasswordMW = require("../middlewares/account/changePassword");
const redirectWithUserIDMW = require("../middlewares/account/redirectWithUserID");
const getDeveloperByEmailMW = require("../middlewares/developer/getDeveloperByEmail");
const getMilestoneListByDevIDMW = require("../middlewares/milestone/getMilestoneListByDevID");
const checkEditAccountMW = require("../middlewares/account/checkEditAccount");
const getMembershipListMW = require("../middlewares/membership/getMembershipList");

const DeveloperModel = require("../models/developer");
const MilestoneModel = require("../models/milestone");
const MembershipModel = require("../models/membership");
const ProjectModel = require("../models/project");

module.exports = function (app) {
    var objectRepository = {
        DeveloperModel: DeveloperModel,
        MilestoneModel: MilestoneModel,
        MembershipModel: MembershipModel,
        ProjectModel: ProjectModel
    };

    app.use("/account/edit",
        authMW(objectRepository),
        getDeveloperByEmailMW(objectRepository),
        checkEditAccountMW(objectRepository),
        getDeveloperByIDMW(objectRepository),
        editAccountMW(objectRepository),
        renderMW(objectRepository, "account_edit")
    );

    app.get("/account/delete",
        authMW(objectRepository),
        getDeveloperByIDMW(objectRepository),
        getMembershipListMW(objectRepository),
        getMilestoneListByDevIDMW(objectRepository),
        deleteAccountMW(objectRepository),
        removeRelationsMW(objectRepository),
        logoutMW(objectRepository)
    );

    app.get("/account",
        authMW(objectRepository),
        redirectWithUserIDMW(objectRepository)
    );

    app.use("/account/pw",
        authMW(objectRepository),
        getDeveloperByIDMW(objectRepository),
        checkPasswordsMW(objectRepository),
        changePasswordMW(objectRepository),
        renderMW(objectRepository, "account_pw")
    );
};