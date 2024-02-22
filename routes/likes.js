const express = require("express");
const { addOrRemoveLike, checkUserLike, checkLikes } = require("../controllers/like");

const router = express.Router();

router.post("/like", addOrRemoveLike);
router.post("/checkUserLike", checkUserLike);
router.get('/:postId/likes', checkLikes);

module.exports = router;