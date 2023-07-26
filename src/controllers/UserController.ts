import { autoInjectable } from "tsyringe";
import UserService from "@/services/UserService";
import { Request, Response } from "express";

@autoInjectable()
export default class UserController {
    private userService: UserService

    constructor (userService: UserService) {
        this.userService = userService
    }
    
    list() {
        let userService = this.userService

        return function (request: Request, response: Response) {
            response.send(userService.print());
        }
    }
}