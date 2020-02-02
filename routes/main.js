const checkLoginMW = require("../middlewares/auth/checkLogin");
const checkRegisterMW = require("../middlewares/auth/checkRegister");
const registerMW = require("../middlewares/auth/register");
const logoutMW = require("../middlewares/auth/logout");
const checkNewPwMW = require("../middlewares/auth/checkNewPw");
const forgottenPwMW = require("../middlewares/auth/forgottenPw");

const renderMW = require("../middlewares/misc/render");
const authMW = require("../middlewares/auth/auth");
const getTopMW = require("../middlewares/sprint/getTop");

const getDevByEmailMW = require("../middlewares/dev/getDevByEmail");

module.exports = function(app) {

    var objectRepository = {
    };

    app.use('/',
        getDevByEmailMW(objectRepository),
        checkLoginMW(objectRepository),
        checkNewPwMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    app.use('/register',
        getDevByEmailMW(objectRepository),
        checkRegisterMW(objectRepository),
        registerMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    app.get('/logout',
        logoutMW(objectRepository)
    );

    app.use('/forgotten',
        getDevByEmailMW(objectRepository),
        forgottenPwMW(objectRepository),
        renderMW(objectRepository, 'forgotten')
    );

    app.get('/top',
        authMW(objectRepository),
        getTopMW(objectRepository),
        renderMW(objectRepository, 'top')
    );

};