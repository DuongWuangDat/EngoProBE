const express = require("express");
const { SearchForKeyword } = require("../controller/search_controller");

const route = express.Router();

route.post("", SearchForKeyword);

module.exports = route;
