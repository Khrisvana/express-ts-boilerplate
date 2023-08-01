import "reflect-metadata"
import app from "express"
import { container } from "tsyringe"
import UserController from "@/user/controllers/UserController"
import registrationValidator from "@/user/validators/registrationValidator"

const routes = app.Router()
const userController = container.resolve(UserController)

routes.get("/", userController.list.bind(userController))
routes.get("/:id", userController.detail.bind(userController))
routes.post("/", registrationValidator(), userController.create.bind(userController))

export default routes