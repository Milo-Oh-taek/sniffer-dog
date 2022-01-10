const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require('cookie-parser');

const dotenv = require("dotenv");
const passport = require("passport");
const db = require("../back/models");
const morgan = require("morgan");
const hpp = require("hpp");
const helmet = require("helmet");

const perfumesRouter = require("./routes/perfumes");
const perfumeRouter = require("./routes/perfume");
const brandsRouter = require("./routes/brands");
const notesRouter = require("./routes/notes");
const reviewsRouter = require("./routes/reviews");
const userRouter = require("./routes/user");
const postsRouter = require("./routes/posts");
const passportConfig = require("./passport");

dotenv.config();
const app = express();
db.sequelize
  .sync()
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.error(err);
  });

passportConfig();

if(process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'));
  app.use(hpp());
  app.use(helmet());
} else {
  app.use(morgan("dev"));
}


app.use(
  cors({
    origin: ["http://localhost:3000", "snifferDog.com", "http://13.124.119.194"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));

app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.SESSION_SECRET,
    cookie: { httpOnly: false},
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/perfumes", perfumesRouter);
app.use("/perfume", perfumeRouter);
app.use("/brands", brandsRouter);
app.use("/notes", notesRouter);
app.use("/reviews", reviewsRouter);
app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.get("/", (req, res) => {
  res.send("Hello World3333");
});

app.listen(80, () => console.log("server is working"));
