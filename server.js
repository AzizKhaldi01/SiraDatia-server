const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const passport = require("passport");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const session = require("express-session");
const socialRoutes = require("./routes/socialRoutes");
const morgan = require("morgan");
const logger = require("./utils/logger");
const userRoutes = require("./routes/userRoutes");
const cvRoutes = require("./routes/cvRoutes");
require("./config/passport");
dotenv.config();
connectDB();

const app = express();
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.session());

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/auth", socialRoutes);
app.use("/user", userRoutes);
app.use("/cv", cvRoutes);

const PORT = process.env.PORT || 3000; // Change to port 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
