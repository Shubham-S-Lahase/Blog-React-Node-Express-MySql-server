const db = require("../db");
const jwt = require("jsonwebtoken");

const addLike = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { post_id, user_id } = req.body;
    const checkQuery = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';
    db.query(checkQuery, [post_id, user_id], (checkErr, checkResult) => {
      if (checkErr) return res.status(500).send(checkErr);
      if (checkResult.length > 0) {
        return res.status(400).send('User has already liked this post');
      } else {
        const q = "INSERT INTO likes (post_id, user_id) VALUES (?, ?)";
        db.query(q, [post_id, user_id], (insertErr, insertResult) => {
          if (insertErr) return res.status(500).send(insertErr);
          res.status(201).send("Like added");
        });
      }
    });
  });
};

const deleteLike = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { post_id, user_id } = req.body;
    const checkQuery = 'SELECT * FROM likes WHERE post_id = ? AND user_id = ?';
    db.query(checkQuery, [post_id, user_id], (checkErr, checkResult) => {
      if (checkErr) return res.status(500).send(checkErr);
      if (checkResult.length === 0) {
        return res.status(400).send('User has not liked this post');
      } else {
        const q = "DELETE FROM likes WHERE post_id = ? AND user_id = ?";
        db.query(q, [post_id, user_id], (deleteErr, deleteResult) => {
          if (deleteErr) return res.status(500).send(deleteErr);
          res.status(200).send("Like removed");
        });
      }
    });
  });
};

module.exports = { addLike, deleteLike };
