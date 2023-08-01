import { autoInjectable } from "tsyringe";
import UserRepository from "@/user/repositories/UserRepository";
import { Request } from "express";
import { Prisma } from "@prisma/client";

@autoInjectable()
export default class UserService {
    private userRepository: UserRepository
    
    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async list(request: Request) {
        return await this.userRepository.list(request)
    }

    async detail(id: number, request: Request) {
        return await this.userRepository.detail(id, request)
    }

    async detailUnique(query: Prisma.UserWhereUniqueInput) {
        return this.userRepository.detailUnique(query)
    }

    async create(request: Request) {
        return await this.userRepository.create(request)
    }

}