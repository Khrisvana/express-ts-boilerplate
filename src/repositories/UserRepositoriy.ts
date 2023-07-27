import { PrismaClient } from '@prisma/client'
import { Request } from "express"

const prisma = new PrismaClient()

export default class UserRepository {
    async list(request: Request) {
        const users = await prisma.user.findMany() 
        return users 
    }

    async create(request: Request) {
        const { email, name } = request.body
        const user = await prisma.user.create({
            data: {
                email: email,
                name: name,
            }
        })

        return user
    }
}