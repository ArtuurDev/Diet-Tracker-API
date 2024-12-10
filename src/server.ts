import fastify from "fastify";
const app = fastify()
import {knex} from '../database/database'

app.get('/', () => {

    const test = knex('sqlite_schema').select("*")
    return test
})

app.listen({
    port: 3000
}).then(() => {
    console.log('http server ruuning')
})
