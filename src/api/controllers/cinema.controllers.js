const Cinema = require("../models/cinema.models");

//GET//
const getCinema = async (req,res) => {
    try {
      const allCinemas = await Cinema.find().populate("allMovies");
      return res.status(200).json(allCinemas)
  } catch (error) {
      return res.status(500).json(error);
  }
}

//POST//
const postCinema = async (req,res) => {
    
}