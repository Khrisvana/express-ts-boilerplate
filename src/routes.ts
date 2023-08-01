import { Express } from "express"
import userRoutes from "@/user/routes"

const router = (app: Express) => {
    app.use("/user", userRoutes)
}

export default router