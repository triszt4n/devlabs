const checkLoginMW = require("../middlewares/auth/checkLogin");
const checkRegisterMW = require("../middlewares/auth/checkRegister");
const registerMW = require("../middlewares/auth/register");
const logoutMW = require("../middlewares/auth/logout");
const checkNewPwMW = require("../middlewares/auth/checkNewPw");
const forgottenPwMW = require("../middlewares/auth/forgottenPw");

const renderMW = require("../middlewares/misc/render");

const getDevByUsernameMW = require("../middlewares/dev/getDevByUsername");

module.exports = function(app) {

    var objectRepository = {
    };

    app.use('/',
        getDevByUsernameMW(objectRepository),
        checkLoginMW(objectRepository),
        checkNewPwMW(objectRepository),
        renderMW(objectRepository, 'login')
    );

    app.use('/register',
        getDevByUsernameMW(objectRepository),
        checkRegisterMW(objectRepository),
        registerMW(objectRepository),
        renderMW(objectRepository, 'register')
    );

    app.get('/logout',
        logoutMW(objectRepository)
    );

    app.use('/forgotten',
        getDevByUsernameMW(objectRepository),
        forgottenPwMW(objectRepository),
        renderMW(objectRepository, 'forgotten')
    );

};