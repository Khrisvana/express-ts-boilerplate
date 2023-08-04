import { autoInjectable } from "tsyringe";
import UserRepository from "@/user/repositories/UserRepository";
import type { CreateUserInput } from "@/types"

@autoInjectable()
export default class UserService {
    private userRepository: UserRepository
    
    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async list(queryParams: { email?: string, first_name?: string, last_name?: string }) {
        return await this.userRepository.list(queryParams)
    }

    async detail(id: number, queryParams: { email?: string, first_name?: string, last_name?: string }) {
        return await this.userRepository.detail(id, queryParams)
    }

    async detailUnique(payload: { email?: string, first_name?: string, last_name?: string }) {
        return this.userRepository.detailUnique(payload)
    }

    async create(validatedData: CreateUserInput) {
        return await this.userRepository.create(validatedData)
    }

}