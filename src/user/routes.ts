import express from "express"
import { container } from "tsyringe"
import UserController from "@/user/controllers/UserController"
import registrationValidator from "@/user/validators/registrationValidator"

export default function(){
    const router = express.Router()
    const userController = container.resolve(UserController)
    
    router.get("/", userController.list.bind(userController))
    router.get("/:id", userController.detail.bind(userController))
    router.post("/", registrationValidator(), userController.create.bind(userController))
    return router
}