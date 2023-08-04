import 'reflect-metadata'

import express from "express"
import dotenv from "dotenv"
import multer from "multer"
import ErrorHandler from "@/main/exceptions/ErrorHandler"
import registers from "./registers"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000
const upload = multer()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(upload.any())


registers(app)

app.use(ErrorHandler)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})