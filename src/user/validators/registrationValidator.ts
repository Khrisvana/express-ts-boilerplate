import { NextFunction, Request, Response } from "express"
import { z } from "zod"
import { container } from "tsyringe"
import UserService from "@/user/services/UserService"
import { ValidatedRequest } from "@/types"
import responseFormat from "@/utils/responseFormat"

export default function() {
    let userService = container.resolve(UserService)

    const schema = z.object({
        email: z.string().email().refine(async (value: string) => {
            return !await userService.detailUnique({ email: value })
        }, "Email has been taken"),
        first_name: z.string(),
        last_name: z.string().optional(),
        password: z.string(),
        confirm_password: z.string(),
    }).refine((data) => data.password === data.confirm_password, {
        message: "Passwords don't match",
        path: ["confirm_password"], // path of error
    });

    return async function (request: ValidatedRequest, response: Response, next: NextFunction) {
        
        try {
            const payload = request.body
            const result = await schema.safeParseAsync(payload)
            if (!result.success) {
                return response.status(400).json(responseFormat(result.error.format(), "validation error"))
            }
    
            request.validated = result
            next()
        } catch (error) {
            next(error)
        }
    }
}