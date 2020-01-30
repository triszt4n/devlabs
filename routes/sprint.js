const authMW = require("../middlewares/auth/auth");
const renderMW = require("../middlewares/misc/render");

const deleteSprintMW = require("../middlewares/sprint/deleteSprint");
const editSprintMW = require("../middlewares/sprint/editSprint");
const getSprintMW = require("../middlewares/sprint/getSprint");
const getSprintListMW = require("../middlewares/sprint/getSprintList");
const saveSprintMW = require("../middlewares/sprint/saveSprint");

const getSprintRoleListMW = require("../middlewares/role/getSprintRoleList");
const deleteRoleMW = require("../middlewares/role/deleteRole");

module.exports = function(app) {

};