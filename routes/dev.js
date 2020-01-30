const authMW = require("../middlewares/auth/auth");
const renderMW = require("../middlewares/misc/render");

const deleteDevMW = require("../middlewares/dev/deleteDev");
const editDevMW = require("../middlewares/dev/editDev");
const getDevByIDMW = require("../middlewares/dev/getDevByID");
const getDevListMW = require("../middlewares/dev/getDevList");
const saveDevMW = require("../middlewares/dev/saveDev");

const getDevRoleListMW = require("../middlewares/role/getDevRoleList");
const deleteRoleMW = require("../middlewares/role/deleteRole");

module.exports = function(app) {

};