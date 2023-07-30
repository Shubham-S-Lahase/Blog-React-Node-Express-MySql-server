const express = require("express");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(4000, () => {
    console.log("Server running on PORT:4000 && Connected");
})
