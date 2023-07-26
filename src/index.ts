import express from "express"
import routes from "@/routes"

const app = express()
const port = 8000

routes(app)

app.listen(port, () => {
    console.log("p");
})