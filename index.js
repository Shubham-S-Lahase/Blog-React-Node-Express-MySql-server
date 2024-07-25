const express = require("express");
const postRoutes = require("./routes/posts");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const commentRoutes = require("./routes/comments");
const likeRoutes = require("./routes/likes");
const path = require("path");

const app = express();


app.use(express.json());
app.use(cookieParser());

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => {
      const formats = ['jpg', 'jpeg', 'png','webp'];
      const ext = path.extname(file.originalname).toLowerCase().substring(1);
      if (formats.includes(ext)) {
        return ext;
      }
      return 'jpg';
    },
    public_id: (req, file) => Date.now(),
  },
});

  
  const upload = multer({ storage });
  
  app.post("/api/upload", upload.single("file"), function (req, res) {
    const file = req.file;
    res.status(200).json({ url: file.path });
  });

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api", commentRoutes);
app.use("/api", likeRoutes);

app.listen(4000, () => {
    console.log("Server running on PORT:4000 && Connected");
})

