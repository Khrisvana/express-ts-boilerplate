import type { Request } from "express"
import { Prisma } from "@prisma/client"

export type ValidatedRequest = Request & {
    validated?: Record<string, any>
}

export type CreateUserInput = {
    email: string,
    password: string,
    first_name: string,
    last_name: string | null,
}