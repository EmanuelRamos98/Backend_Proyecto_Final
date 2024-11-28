import express from 'express'
import getPingController from '../Controllers/getPingController.js'

const statusRoute = express.Router()

statusRoute.get('/ping', getPingController)

export default statusRoute