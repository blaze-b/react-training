const express = require("express");
const app = express();
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const bodyParser = require("body-parser");

app.get("/", (req, res) => res.send("Hello World"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// User routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
// Port Settings
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on the port ${port}`));

// DB Config Details
const db = require("./config/keys").mongoURI;
// Mongo connection details
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
