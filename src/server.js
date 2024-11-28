import express from 'express'
import statusRoute from './Routes/status.routes.js'
import authRouter from './Routes/auth.routes.js'

const PORT = 3030
const app = express()

app.use(express.json())


app.use('/api/status', statusRoute)
app.use('/api/auth', authRouter)



app.listen(PORT, () => {
    console.log(`El servidor se esta ejecutando en http://localhost:${PORT}`)
})
