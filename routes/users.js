const express = require("express");
const addUser = require("../controllers/user");

const router = express.Router();

router.get("/", addUser);

module.exports = router;