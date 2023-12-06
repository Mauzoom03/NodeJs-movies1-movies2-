const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");


//Register//


const User = require("../models/user.models");

const saltRounds = 8;

passport.use(
    'register',
    new localStrategy(
        {
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:true,
        },
        async (req,email,password,done) => {
            try{
                //buscamos si el usuario existe en nuestra BD//
                const previousUser = await User.findOne({ email: email });

                //si existe el usuario lanzamos error//
                if(previousUser) {
                    const error = new Error('Este usuario ya se ha registrado!!');
                    return done(error);
                }

                //Hsheamos el password anres de registrarlo si es un usuario nuevo//
                pwdHash = await bcrypt.hash(password,saltRounds);

                //Creamos el nuevo user y lo guardamos en la DB//
                const newUser = new User({
                    email:email,
                    password:pwdHash,
                });

                const savedUser = await newUser.save();

                done(null,savedUser);
            } catch(error) {
                return done(error);
            }
        }
    )
);

//LOGIN//

passport.use(
    'login',
    new localStrategy(
        {
            usernameField:'email',
            passwordField:'password',
            passReqToCallback:true,  
        },
        async (req,email,password,done) => {
            try {
                const currentUser = await User.findOne({ email:email });

                if(!currentUser) {
                    const error = new Error('El usuario no existe');
                    return done(error)
                }

                const isValidPassword = await bcrypt.compare(
                    password,
                    currentUser.password
                );

                if(!isValidPassword){
                    const error = new Error(
                        "La combinacion del password y el email es incorrecta!"
                    );
                    return done(error);
                }
        // Si todo se valida correctamente, eliminamos la contraseña del usuario devuelto 
        // por la db y completamos el callback con el usuario
        currentUser.password=null;
        return done(null,currentUser);
            } catch (error){
             return done(error);

            }
        }
    )
)
// Esta función usará el usuario de req.LogIn para registrar su id.
passport.serializeUser((user, done) => {
    return done(null, user._id);
  });
  
  // Esta función buscará un usuario dada su _id en la DB y populará req.user si existe
  passport.deserializeUser(async (userId, done) => {
    try {
      const existingUser = await User.findById(userId);
      return done(null, existingUser);
    } catch (err) {
      return done(err);
    }
  });


