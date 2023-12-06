const Movies = require("../models/movie.models")

//GET//
const getMovies = async(req,res) => {
    try {
        const allMovies = await Movies.find();
        return res.status(200).json(allMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//POST//
const postMovies = async (req,res) => {
    try {
        const newMovies = new Movies (req.body)
        const createdMovies = await newMovies.save();
        return res.status(201).json(createdMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}



//DELETE//
const deleteMovies = async (req,res) => {
    try {
        const {id} = req.params;
        const deletedMovies = await Movies.findByIdAndDelete(id);
        if(!deletedMovies) {
            return res.status(404).json({message:"el id de Movies no existe"});
        }
        return res.status(200),json(deletedMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//PUT// 
const putMovies = async (req,res) => {
    try {
        const {id} = req.params;
        const movieModify = await Movies.findByIdAndUpdate(id);
        if(!movieModify){
            return res.status(404).json({message:"no se puede actualizar"});
        }
        return res.status(200),json(putMovies);
    } catch (error) {
        return res.status(500).json(error);
    }
}




module.exports = {getMovies,postMovies,deleteMovies,putMovies};