import express from "express"
import dotenv from "dotenv"
import routes from "@/routes"
import multer from "multer"
import ErrorHandler from "@/main/exceptions/ErrorHandler"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000
const upload = multer()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(upload.any())

routes(app)

app.use(ErrorHandler)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})