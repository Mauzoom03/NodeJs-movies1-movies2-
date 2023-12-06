const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require('express-session');
const bcrypt = require('bcrypt');
require("./src/api/authentication/passport");
dotenv.config()


const moviesRouter = require("./src/api/routes/movie.routes");
const CinemaRouter = require("./src/api/routes/cinema.routes");
const userRouter = require("./src/api/routes/user.routes");

const { connect } = require("./src/utils/db");
const PORT = process.env.PORT;


const app = express();
connect();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/movies",moviesRouter)
app.use("/Cinema",CinemaRouter)

app.use(passport.initialize())
app.use(passport.session());
app.use("/user",userRouter);

app.listen(PORT,() => console.log(`escuchando en el puerto : http://localhost:${PORT}`))










