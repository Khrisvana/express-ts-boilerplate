import { autoInjectable, inject } from "tsyringe";
import UserService from "@/user/services/UserService";
import type { NextFunction, Request, Response } from "express";
import type { ValidatedRequest } from "@/types"
import userSerializer from "@/user/serializers/UserSerializer";

@autoInjectable()
export default class UserController {
    constructor(@inject("IUserService") private readonly userService: UserService ){}

    public async list(request: Request, response: Response, next: NextFunction) {
        console.log(this.userService)
        try {
            let result = await this.userService.list(request.query) 
            response.json(result.map(userSerializer))
        } catch (error) {
            next(error)
        }
    }

    public async detail(request: Request, response: Response, next: NextFunction) {
        try {
            return response.json(await this.userService.detail(parseInt(request.params.id), request.query))
        } catch (error) {
            next(error)
        }
    }

    public async create(request: ValidatedRequest, response: Response, next: NextFunction) {
        let payload = {
            email: request.validated?.email.toString(),
            password: request.validated?.password.toString(),
            first_name: request.validated?.first_name.toString(),
            last_name: request.validated?.last_name.toString(),
        }
        try {
            return response.json(await this.userService.create(payload))
        } catch (error) {
            next(error)
        }
    }
}