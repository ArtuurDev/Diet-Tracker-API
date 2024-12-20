import {Knex, knex as setupConfig} from "knex";


export const config: Knex.Config = {

    client: 'sqlite',

    connection: {
        filename: './database/app.db'
    },
    
    migrations: {
        directory: './database/migrations',
        extension: 'ts'
    }, 
    useNullAsDefault: true

}

export const knex = setupConfig(config)