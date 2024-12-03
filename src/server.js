import statusRoute from './Routes/status.routes.js'
import authRouter from './Routes/auth.routes.js'
import errorHandleMiddleware from './Middlewares/errorHandle.middleware.js'
import mongoose from './Config/db.config.js'
import express from 'express'
import cors from 'cors'

const PORT = 3030
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/status', statusRoute)
app.use('/api/auth', authRouter)



app.use(errorHandleMiddleware)

app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})
