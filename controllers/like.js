const db = require("../db");
const jwt = require("jsonwebtoken");

const addOrRemoveLike = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const { post_id, user_id } = req.body;
    const checkQuery = "SELECT * FROM likes WHERE post_id = ? AND user_id = ?";
    db.query(checkQuery, [post_id, user_id], (checkErr, checkResult) => {
      if (checkErr) return res.status(500).send(checkErr);
      if (checkResult.length > 0) {
        const q = "DELETE FROM likes WHERE post_id = ? AND user_id = ?";
        db.query(q, [post_id, user_id], (deleteErr, deleteResult) => {
          if (deleteErr) return res.status(500).send(deleteErr);
          db.query(
            "SELECT COUNT(*) as totalLikes FROM likes WHERE post_id = ?",
            [post_id],
            (err, results) => {
              if (err) return res.status(500).send(err);
              res
                .status(200)
                .json({
                  message: "Like removed",
                  totalLikes: results[0].totalLikes,
                });
            }
          );
        });
      } else {
        const q = "INSERT INTO likes (post_id, user_id) VALUES (?, ?)";
        db.query(q, [post_id, user_id], (insertErr, insertResult) => {
          if (insertErr) return res.status(500).send(insertErr);
          db.query(
            "SELECT COUNT(*) as totalLikes FROM likes WHERE post_id = ?",
            [post_id],
            (err, results) => {
              if (err) return res.status(500).send(err);
              res
                .status(201)
                .json({
                  message: "Like added",
                  totalLikes: results[0].totalLikes,
                });
            }
          );
        });
      }
    });
  });
};

const checkUserLike = (req, res) => {
  const { post_id, user_id } = req.body;
  const checkQuery = "SELECT * FROM likes WHERE post_id = ? AND user_id = ?";
  db.query(checkQuery, [post_id, user_id], (checkErr, checkResult) => {
    if (checkErr) return res.status(500).send(checkErr);
    const isLikedByCurrentUser = checkResult.length > 0;
    res.status(200).json({ isLikedByCurrentUser });
  });
};

const checkLikes = (req, res) => {
  const { postId } = req.params;
  const checkQuery =
    "SELECT COUNT(*) as totalLikes FROM likes WHERE post_id = ?";
  db.query(checkQuery, [postId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ totalLikes: results[0].totalLikes });
  });
};

module.exports = { addOrRemoveLike, checkUserLike, checkLikes };
