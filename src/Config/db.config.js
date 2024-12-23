import mongoose from "mongoose";
import User from "../Models/user.models.js";
import ENVIROMENT from "./enviroment.js";


const MONGO_URI = ENVIROMENT.MONGO_DB +'/'+ ENVIROMENT.MONGO_DB_DATABASE

mongoose.connect(MONGO_URI, {})
    .then(
        () => {
            console.log('Se conecto con exito')
        }
    )
    .catch(
        () => {
            console.error('Fallo la conexion', error)
        }
    )
    .finally(
        () => {
            console.log('Finalizo la conexion')
        }
    )

export default mongoose