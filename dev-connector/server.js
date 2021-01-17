const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Server Test
// app.get("/", (req, res) => res.send("Hello User"));

// Passport Middleware
app.use(passport.initialize());
// Passport config create the strategy
require("./config/passport")(passport);

// User routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Port Settings
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on the port ${port}`));

// Mongo connection details
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
