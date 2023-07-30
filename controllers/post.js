const getPosts = (req, res) => {
    res.json("get all posts");
}

const getPost = (req, res) => {
    res.json("get single posts");
}

const addPost = (req, res) => {
    res.json("add post");
}

const deletePost = (req, res) => {
    res.json("delete post");
}

const updatePost = (req, res) => {
    res.json("update post");
}

module.exports = {getPosts, getPost, addPost, deletePost, updatePost};