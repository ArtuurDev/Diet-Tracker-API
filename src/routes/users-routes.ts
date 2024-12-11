import { FastifyInstance } from "fastify"
import { knex } from "../../database/database"
import {z} from  'zod'
import { randomUUID } from "crypto"
export function users(app: FastifyInstance) {
    
    app.post('/', async (request, reply) => {

        const zod = z.object({

            name: z.string(),
            age: z.number(),
            height: z.number(),
            weight: z.number(),
    
        })
    
        const validation = zod.safeParse(request.body)
    
        if (!validation.success) {
            console.log(validation.error)
            throw new Error(JSON.stringify(validation.error.format()))
        }
    
        const {name, age, height, weight} = validation.data
    
        let session_id = request.cookies.session_id

        if (!session_id) {
            
            const session_id = randomUUID()

            reply.cookie('session_id', session_id, {
                path: '/',
                maxAge: 60 * 60 * 24 * 30 // 30 days
            })
        }        
    
        const user = await knex('User').insert({
            id: crypto.randomUUID(),
            name,
            age,
            height,
            weight,
            session_id
        })
    
        return reply.code(201).send()
    })
    
    app.get('/', async(request, reply) => {
    
        const users = await knex('User').select()
        return reply.send({users})
    })


}
