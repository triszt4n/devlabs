const checkLoginMW = require("../middlewares/auth/checkLogin");
const checkRegisterMW = require("../middlewares/auth/checkRegister");
const registerMW = require("../middlewares/auth/register");
const logoutMW = require("../middlewares/auth/logout");
const checkNewPwMW = require("../middlewares/auth/checkNewPw");

const renderMW = require("../middlewares/misc/render");

const getDevByUsernameMW = require("../middlewares/dev/getDevByUsername");
var DevModel = {}, SprintModel = {}, RoleModel = {};

module.exports = function(app) {

    var objectRepository = {
        DevModel: DevModel,
        SprintModel: SprintModel,
        RoleModel: RoleModel
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
        logoutMW(objectRepository),
        function(req, res, next) {
            res.redirect('/');
        }
    );

};