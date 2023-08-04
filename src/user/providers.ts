import { container } from 'tsyringe'
import type { Express } from 'express'

import routes from './routes'

import UserService from './services/UserService'
import UserRepository from './repositories/UserRepository'

export default function(app: Express){
    container.register("IUserRepository", { useClass: UserRepository })
    container.register("IUserService", { useClass: UserService })

    app.use("/user", routes())
}