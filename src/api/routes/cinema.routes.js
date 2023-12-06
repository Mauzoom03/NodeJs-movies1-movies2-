const express = require("express");

const Cinema = require("../models/cinema.models");

const { getCinema,postCinema,deleteCinema } = require("../controllers/movies.controllers");
const CinemaRouter = express.Router();

module.exports = CinemaRouter;