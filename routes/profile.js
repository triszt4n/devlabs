const authMW = require("../middlewares/auth/auth");
const renderMW = require("../middlewares/misc/render");

const retrieveIDMW = require("../middlewares/profile/retrieveID");
const checkDevLoggedInMW = require("../middlewares/profile/checkDevLoggedIn");

const deleteDevMW = require("../middlewares/dev/deleteDev");
const editDevMW = require("../middlewares/dev/editDev");
const getDevByIDMW = require("../middlewares/dev/getDevByID");

const getDevRoleListMW = require("../middlewares/role/getDevRoleList");
const deleteRoleMW = require("../middlewares/role/deleteRole");

module.exports = function(app) {

};