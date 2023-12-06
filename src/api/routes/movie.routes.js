const express = require("express");

const { getMovies,postMovies,deleteMovies, putMovies } = require("../controllers/movies.controllers");
const moviesRouter = express.Router();

moviesRouter.get("/",getMovies)
moviesRouter.post("/",postMovies)
moviesRouter.post("/",deleteMovies)
moviesRouter.post("/",putMovies)

module.exports = moviesRouter ;