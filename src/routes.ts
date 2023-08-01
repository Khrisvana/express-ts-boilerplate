import "reflect-metadata"
import { Express } from "express"
import { container } from "tsyringe"
import UserController from "@/controllers/UserController"
import registrationValidator from "@/validators/registrationValidator"

const userController = container.resolve(UserController)

export default function(app: Express) {
    app.get("/user", userController.list())
    app.get("/user/:id", userController.detail())
    app.post("/user", registrationValidator(), userController.create())
}