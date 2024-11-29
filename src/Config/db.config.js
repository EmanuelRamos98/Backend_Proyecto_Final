import mongoose from "mongoose";
import User from "../Models/user.models.js";


const MONGO_URL = 'mongodb://localhost:27017/Warap'

mongoose.connect(MONGO_URL, {})
.then(
    ()=>{
        console.log('Se conecto con exito')
    }
)
.catch(
    ()=>{
        console.error('Fallo la conexion', error)
    }
)
.finally(
    ()=>{
        console.log('Finalizo la conexion')
    }
)

export default mongoose