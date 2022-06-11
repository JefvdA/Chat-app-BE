const express = require("express");
const cookieSession = require("cookie-session");
const app = express();

const authConfig = require("./src/config/auth.config");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cookieSession({
    name: "chat-app-session",
    secret: authConfig.cookieSecret,
    httpOnly: true,
  })
);
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

// Test route
app.get("/api", (req, res) => {
    res.json({ message: "ok" });
});

// Import routes
const authRouter = require("./src/routes/auth.routes");
const testRouter = require("./src/routes/test.routes");

// Use routes
app.use("/api/auth", authRouter);
app.use("/api/test", testRouter);

module.exports = app;