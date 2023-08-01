import { autoInjectable } from "tsyringe";
import UserService from "@/user/services/UserService";
import { NextFunction, Request, Response } from "express";

@autoInjectable()
export default class UserController {
    private userService: UserService

    constructor (userService: UserService) {
        this.userService = userService
    }
    
    public async list(request: Request, response: Response) {
        response.json(await this.userService.list(request))
    }

    public async detail(request: Request, response: Response, next: NextFunction) {
        try {
            return response.json(await this.userService.detail(parseInt(request.params.id), request))
        } catch (error) {
            next(error)
        }
    }

    public async create(request: Request, response: Response) {
        return response.json(await this.userService.create(request))
    }
}