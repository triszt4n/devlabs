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
const checkEditAccountMW = require("../middlewares/account/checkEditAccount");

const DevModel = require("../models/developer");
const MilestoneModel = require("../models/milestone");
const MembershipModel = require("../models/membership");

module.exports = function (app) {
    var objectRepository = {
        DevModel: DevModel,
        MilestoneModel: MilestoneModel,
        MembershipModel: MembershipModel
    };

    app.use("/account/edit",
        authMW(objectRepository),
        getDeveloperByEmailMW(objectRepository),
        checkEditAccountMW(objectRepository),
        (req, res, next) => {
            req.params.devID = req.session.userID;
            next();
        },
        getDeveloperByIDMW(objectRepository),
        editAccountMW(objectRepository),
        renderMW(objectRepository, "account_edit")
    );

    app.post("/account/delete",
        authMW(objectRepository),
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