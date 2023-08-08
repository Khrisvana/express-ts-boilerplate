import { ZodType, z } from "zod"
import { container } from "tsyringe"
import UserService from "@/user/services/UserService"

const schema : ZodType = z.object({
    email: z.string().email().refine(async (value: string) => {
        let userService = container.resolve(UserService)
        return !await userService.detailUnique({ email: value })
    }, "Email has been taken"),
    first_name: z.string(),
    last_name: z.string().optional(),
    password: z.string(),
    confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"], // path of error
})


export default schema
export type SchemaType = z.infer<typeof schema>