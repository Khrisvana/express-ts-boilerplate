import express from "express"
import routes from "@/routes"
import multer from "multer"

const app = express()
const port = 8000
const upload = multer()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(upload.array(""))

routes(app)

app.listen(port, () => {
    console.log("Express app running");
})