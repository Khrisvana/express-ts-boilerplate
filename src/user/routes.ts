import express from "express"
import { container } from "tsyringe"
import UserController from "@/user/controllers/UserController"
import registrationValidator, {type SchemaType} from "@/user/validators/registrationValidator"
import validationMiddleware from "@/main/middlewares/ValidationMiddleware"

export default function(){
    const router = express.Router()
    const userController = container.resolve(UserController)
    
    router.get("/", userController.list.bind(userController))
    router.get("/:id", userController.detail.bind(userController))
    router.post("/", validationMiddleware<SchemaType>(registrationValidator), userController.create.bind(userController))
    return router
}