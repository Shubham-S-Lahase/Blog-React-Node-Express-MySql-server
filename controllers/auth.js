const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = (req, res) => {
  console.log("Request body:", req.body);
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) {
      console.log("Error selecting users:", err);
      return res.status(500).json(err);
    }
    if (data.length) {
      console.log("User already exists!");
      return res.status(409).json("User already exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users(`username`,`email`,`password`, `img`) VALUES (?)";
    const values = [req.body.username, req.body.email, hash, req.body.img];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.log("Error inserting user:", err);
        return res.status(500).json(err);
      }
      console.log("User has been created.");
      return res.status(200).json("User has been created.");
    });
  });
};

const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].id }, "jwtkey", {expiresIn: '1h'});
    const { password, ...other } = data[0];

    res
      .cookie("access_token", token, { httpOnly: true, sameSite: 'None' })
      .status(200)
      .json(other);
  });
};

const logout = (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      sameSite: "None",
    })
    .status(200)
    .json("User has been logged out.");
};

module.exports = { register, login, logout };
