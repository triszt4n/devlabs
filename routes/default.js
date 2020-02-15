const renderMW = require("../middlewares/default/render");
const checkSessionMW = require("../middlewares/auth/checkSession");
const checkLoginMW = require("../middlewares/auth/checkLogin");
const checkRegisterMW = require("../middlewares/auth/checkRegister");
const loginMW = require("../middlewares/auth/login");
const logoutMW = require("../middlewares/auth/logout");
const registerMW = require("../middlewares/auth/register");
const resetPwMW = require("../middlewares/auth/resetPw");
const getDeveloperByEmailMW = require("../middlewares/developer/getDeveloperByEmail");

const DeveloperModel = require("../models/developer");

module.exports = function (app) {
    var objectRepository = {
        DeveloperModel: DeveloperModel
    };

    app.get("/error",
        renderMW(objectRepository, "error")
    );

    app.use("/register",
        checkSessionMW(objectRepository),
        getDeveloperByEmailMW(objectRepository),
        checkRegisterMW(objectRepository),
        registerMW(objectRepository),
        renderMW(objectRepository, "register")
    );

    app.get("/logout",
        logoutMW(objectRepository)
    );

    app.use("/forgotten",
        getDeveloperByEmailMW(objectRepository),
        resetPwMW(objectRepository),
        renderMW(objectRepository, "forgotten")
    );

    app.all("/",
        checkSessionMW(objectRepository),
        getDeveloperByEmailMW(objectRepository),
        checkLoginMW(objectRepository),
        loginMW(objectRepository),
        renderMW(objectRepository, "login")
    );
};