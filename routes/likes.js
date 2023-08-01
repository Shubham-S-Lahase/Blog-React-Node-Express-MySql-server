const express = require("express");
const { addLike, deleteLike } = require("../controllers/like");

const router = express.Router();

router.post("/like", addLike);
router.delete("/like", deleteLike);



module.exports = router;