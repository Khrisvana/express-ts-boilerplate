import { autoInjectable } from "tsyringe";
import UserService from "@/services/UserService";
import { NextFunction, Request, Response } from "express";

@autoInjectable()
export default class UserController {
    private userService: UserService

    constructor (userService: UserService) {
        this.userService = userService
    }
    
    list() {
        let userService = this.userService

        return async function (request: Request, response: Response) {
            response.json(await userService.list(request))
        }
    }

    detail() {
        let userService = this.userService

        return async function (request: Request, response: Response, next: NextFunction) {
            try {
                response.json(await userService.detail(parseInt(request.params.id), request))
            } catch (error) {
                next(error)
            }
        }
    }

    create() {
        let userService = this.userService

        return async function (request: Request, response: Response) {
            response.json(await userService.create(request))
        }
    }
}