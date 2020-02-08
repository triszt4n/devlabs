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

module.exports = function (app) {
    var objectRepository = {};

    app.use("/account/edit",
        authMW(objectRepository),
        editAccountMW(objectRepository),
        getDeveloperByIDMW(objectRepository),
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
        checkPasswordsMW(objectRepository),
        changePasswordMW(objectRepository),
        renderMW(objectRepository, "account_pw")
    );
};