const express = require("express");
const { addComment, getComments, deleteComment } = require("../controllers/comment");



const router = express.Router();

router.post("/comments/add", addComment);
router.get("/post/:id/comments", getComments);
router.delete("/comments/:id", deleteComment);



module.exports = router;