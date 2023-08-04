import responseFormat from "@/utils/responseFormat"
import { Prisma } from "@prisma/client"
import { NextFunction, Request, Response } from "express"

export default function(error: any, request: Request, response: Response, next: NextFunction) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        /* Prisma no user found */
        if (error.code === "P2025") {
            return response.status(404).json(responseFormat({}, error.message))
        }
    }
    
    return next(error)
}