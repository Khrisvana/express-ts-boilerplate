import z, { type ZodTypeAny } from "zod"
import { Response, NextFunction } from "express"
import { ValidatedRequest } from "@/types"

export default function validationMiddleware<T extends ZodTypeAny>(schema: T) {
    return async function (request: ValidatedRequest, response: Response, next: NextFunction) {
        try {
            const payload = {...request.body, ...request.files}
            const result = await schema.parseAsync(payload)
            request.validated = result
    
            next()
        } catch (error) {
            if (error instanceof z.ZodError) {
                return next({
                    error: error
                })
            }

            next(error)
        }
    }
}