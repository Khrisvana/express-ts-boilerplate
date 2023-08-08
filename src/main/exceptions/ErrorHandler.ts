import responseFormat from "@/utils/responseFormat"
import { Prisma } from "@prisma/client"
import { Exception } from "@prisma/client/runtime/library"
import { NextFunction, Request, Response } from "express"
import z from "zod"

type ErrorFeedback = Exception & {
    error?: Object
}

export default function(error: any, request: Request, response: Response, next: NextFunction) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return prismaErrorHandler(error, response)   
    }

    if (error.error instanceof z.ZodError) {
        return validationErrorHandler(error, response)
    }
    
    /* Express default error handler */
    return next(error)
    /* Custom error handler */
    // return response.status(404).json(responseFormat({}, "something went wrong"))
}

function validationErrorHandler(
    err: ErrorFeedback,
    response: Response
) {
    const error = err.error as z.ZodError

    return response.status(400).json(responseFormat(error.format(), "validation error"))
}

function prismaErrorHandler(
    error: Prisma.PrismaClientKnownRequestError,
    response: Response
) {
    /* Prisma no user found */
    if (error.code === "P2025") {
        return response.status(404).json(responseFormat({}, error.message))
    }
}