import type { Express } from 'express'

import userProvider from './user/providers'

export default function( app: Express ){
    //user module
    userProvider(app)

    //bla bla module
    //~
}