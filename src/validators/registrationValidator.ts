import { NextFunction, Request, Response } from "express"
import { z } from "zod"

export default function() {
    const schema = z.object({
        email: z.string().min(1, "required"),
        name: z.string().min(1, "required"),
    })

    return async function (request: Request, response: Response, next: NextFunction) {
        const { email, name } = request.body
        
        const result = await schema.safeParseAsync({ email, name })
        if (result.success) {
            return next()
        }
        return response.status(400).send(result.error)
    }
}