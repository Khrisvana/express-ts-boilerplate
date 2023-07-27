import express from "express"
import dotenv from "dotenv"
import routes from "@/routes"

dotenv.config()

const app = express()
const PORT = process.env.PORT ?? 8000

routes(app)

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})