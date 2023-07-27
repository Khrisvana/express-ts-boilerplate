import { autoInjectable } from "tsyringe";
import UserRepository from "@/repositories/UserRepositoriy";
import { Request } from "express";

@autoInjectable()
export default class UserService {
    private userRepository: UserRepository
    
    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async list(request: Request) {
        return await this.userRepository.list(request)
    }

    async create(request: Request) {
        return await this.userRepository.create(request)
    }
}