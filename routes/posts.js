const express = require("express");
const { getPosts, getPost, deletePost, updatePost } = require("../controllers/post");


const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", deletePost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);


module.exports = router;