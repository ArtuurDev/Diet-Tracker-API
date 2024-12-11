import { FastifyInstance } from "fastify"
import { knex } from "../../database/database"
import {z} from 'zod'
import { randomUUID } from "crypto"


export function refeicao(app: FastifyInstance) {

    app.post('/refeicao', async (request, reply) => {


        const session_id = request.cookies.session_id

        if(!session_id) {

            throw new Error('unauthorized')
        }

        const zod = z.object({
            nome: z.string(),
            descricao: z.string(),
            dentroDaDieta: z.boolean()
        })

        const validation = zod.safeParse(request.body)

        if (!validation.success) {

            console.log(validation.error.format())
            
            throw new Error(JSON.stringify(validation.error.format()))

        }

        const {nome, descricao, dentroDaDieta} = validation.data

        try {
            const refeicao = await knex('refeicao').insert({
                id: randomUUID(),
                nome,
                descricao,
                dentroDaDieta,
                session_id
            })
    
            return reply.code(201).send()
    
        } catch (error) {
            console.log(error)
            return reply.code(500).send('erro interno no servidor')
        }    
        
    })

    app.get('/refeicao', async(request, reply) => {

    
        const session_id = request.cookies.session_id

        if (!session_id) {
            throw new Error('unauthorized')
        }

        const refeicao = await knex('Refeicao').where('session_id', session_id).select()
        return reply.send({refeicao})
    })

    
    app.put('/refeicao/:id', async (request, reply) => {
    
        const session_id = request.cookies.session_id

        if (!session_id) {
            throw new Error('unauthorized')
        }

        const zodId = z.object({
            id: z.string()
        })
    
        const validationId = zodId.safeParse(request.params)
    
        if(!validationId.success) {
            console.log(validationId.error)
            throw new Error(JSON.stringify(validationId.error.format()))
        }
        const {id} = validationId.data
    
        const zod = z.object({
            nome: z.string(),
            descricao: z.string(),
            dentroDaDieta: z.boolean()
        })

        const validation = zod.safeParse(request.body)

        if (!validation.success) {

            console.log(validation.error.format())
            
            throw new Error(JSON.stringify(validation.error.format()))
        }
        const {nome, descricao, dentroDaDieta} = validation.data
        try {
            const refeicao = await knex('Refeicao').where({
                id: id,
                session_id: session_id
            }).update({
                nome,
                descricao,
                dentroDaDieta
            })
    
        }catch (error) {
            console.log(error)
            return reply.code(500).send('erro interno no servidor')
        }    
        
    }) 

    app.delete('/refeicao/:id', async(request, reply) =>{

        const session_id = request.cookies.session_id

        if (!session_id) {
            throw new Error('unauthorized')
        }

        const zodId = z.object({
            id: z.string()
        })

        const validationId = zodId.safeParse(request.params)

        if(!validationId.success) {
            console.log(validationId.error)
            throw new Error(JSON.stringify(validationId.error.format()))
        }
        const {id} = validationId.data
        
        if(!id) {
            throw new Error('id não existe')
        }

        try {
            const refeicao = await knex('Refeicao').where({
                id: id,
                session_id: session_id
            }).delete()
    
            return reply.code(201).send()
        } catch (error) {
            console.log(error)
            return reply.code(500).send('erro interno no servidor')
        }    

    })

}

