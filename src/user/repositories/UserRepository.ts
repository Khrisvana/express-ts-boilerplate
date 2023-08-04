import { PrismaClient, Prisma } from '@prisma/client'
import type { CreateUserInput } from "@/types"

const prisma = new PrismaClient()

export default class UserRepository {
    async list(queryParams: { email?: string, first_name?: string, last_name?: string }) {
        const users = await prisma.user.findMany({
            where: queryParams
        }) 
        return users 
    }

    async detail(id: number, queryParams: { email?: string, first_name?: string, last_name?: string }) {
        const users = await prisma.user.findFirstOrThrow({
            where: {
                id,
                ...queryParams
            }
        }) 
        return users 
    }

    async create(validatedData: CreateUserInput) {
        const user = await prisma.user.create({
            data: validatedData
        })

        return user
    }

    async detailUnique(queryParams: { email?: string, first_name?: string, last_name?: string }) {
        let where: Prisma.UserWhereInput = {} as Prisma.UserWhereInput

        if (queryParams.email) {
            where.email = queryParams.email
        }

        if (queryParams.first_name) {
            where.first_name = queryParams.first_name
        }

        if (queryParams.last_name) {
            where.last_name = queryParams.last_name
        }

        const users = await prisma.user.findFirst({
            where
        }) 
        return users 
    }
}