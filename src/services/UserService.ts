import { autoInjectable } from "tsyringe";
import UserRepository from "@/repositories/UserRepositoriy";

@autoInjectable()
export default class UserService {
    private userRepository: UserRepository
    
    constructor (userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    print() {
        return this.userRepository.print()
    }
}