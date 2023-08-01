import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import UserRepository from "@/user/repositories/UserRepository"
import UserService from "@/user/services/UserService"

export default function() {
    let userService = new UserService(new UserRepository())

    const schema = z.object({
        email: z.string().nonempty().email().refine(async (value: string) => {
            return !await userService.detailUnique({ email: value })
        }, "Email has been taken"),
        name: z.string().nonempty(),
    })

    return async function (request: Request, response: Response, next: NextFunction) {
        const { email, name } = request.body
        
        const result = await schema.safeParseAsync({ email, name })
        if (result.success) {
            return next()
        }
        return response.status(400).send(result.error.flatten())
    }
}