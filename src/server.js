import mongoose from './Config/db.config.js'
import statusRoute from './Routes/status.routes.js'
import authRouter from './Routes/auth.routes.js'
import errorHandleMiddleware from './Middlewares/errorHandle.middleware.js'
import messageRoute from './Routes/messages.routes.js'
import express from 'express'
import cors from 'cors'
import contacRouter from './Routes/contac.route.js'


const PORT = 3000
const app = express()


app.use(cors())
app.use(express.json())

app.use('/api/status', statusRoute)
app.use('/api/auth', authRouter)
app.use('/api/message', messageRoute)
app.use('/api/contacts', contacRouter)

app.use(errorHandleMiddleware)

app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})
