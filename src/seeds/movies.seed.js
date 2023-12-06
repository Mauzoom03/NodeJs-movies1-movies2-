const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config()
const Movies = require("../api/models/movie.models");

const DB_URL = process.env.DB_URL;

const arrayMovie = [
    {
        title: 'The Matrix',
        director: 'Hermanas Wachowski',
        year: 1999,
        genre: 'Acción',
      },
      {
        title: 'The Matrix Reloaded',
        director: 'Hermanas Wachowski',
        year: 2003,
        genre: 'Acción',
      },
      {
        title: 'Buscando a Nemo',
        director: 'Andrew Stanton',
        year: 2003,
        genre: 'Animación',
      },
      {
        title: 'Buscando a Dory',
        director: 'Andrew Stanton',
        year: 2016,
        genre: 'Animación',
      },
      {
        title: 'Interestelar',
        director: 'Christopher Nolan',
        year: 2014,
        genre: 'Ciencia ficción',
      },
      {
        title: '50 primeras citas',
        director: 'Peter Segal',
        year: 2004,
        genre: 'Comedia romántica',
      },
]



mongoose.connect(DB_URL).then(async () => {
    const allMovies = await Movies.find();
    if(allMovies.length > 0) {
        await Movies.collection.drop();
        console.log("La MOVIESBDD no existe");
    }
})

.catch((error) => console.log("error borrando la MOVIESBDD",error))
    .then(async () => {
        const moviesMap = arrayMovie.map((movies) => new Movies(movies))
        await Movies.insertMany(moviesMap);
        console.log("MOVIESBDD insertado con exito");
    })
    
    .catch((error) => console.log("Error borrando la MOVIESBDD ",error))

    .finally(() => mongoose.disconnect());