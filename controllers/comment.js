const db = require("../db");
const jwt = require("jsonwebtoken");

const addComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { post_id, user_id, text } = req.body;
    const q = "INSERT INTO comments (post_id, user_id, text) VALUES (?, ?, ?)";
    db.query(q, [post_id, user_id, text], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).send("Comment created");
    });
  });
};

const getComments = (req, res) => {
  const { id } = req.params;
  const q = "SELECT comments.*, users.username FROM comments JOIN users ON comments.user_id = users.id WHERE post_id = ?";
  db.query(q, [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).json(result);
  });
};


const deleteComment = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { id } = req.params;
    const q = 'DELETE FROM comments WHERE id = ?';
    db.query(q, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send('Comment deleted');
    });
  });
};

module.exports = { addComment, getComments, deleteComment };
