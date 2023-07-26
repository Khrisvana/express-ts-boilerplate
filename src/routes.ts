import "reflect-metadata"
import { Express } from "express"
import { container } from "tsyringe"
import UserController from "@/controllers/UserController"

const userController = container.resolve(UserController)

export default function(app: Express) {
    app.get("/", userController.list())
}