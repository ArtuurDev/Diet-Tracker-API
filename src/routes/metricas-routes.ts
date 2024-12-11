import { FastifyInstance } from "fastify";
import { knex } from "../../database/database";

export function metricas(app:FastifyInstance) {

    
    app.get('/totalRegistros', async(request, reply) => {
        
        const session_id = request.cookies.session_id

        if(!session_id) {

            throw new Error('unauthorized')
        }

        try {

            const registros = await knex('Refeicao').where({
            session_id: session_id
        })
        .count('* as total')
        return reply.code(200).send({refeicoesCadastradas: registros[0]})
        
    }
    catch (error) {
        console.log(error)
        return reply.code(500).send('erro interno no servidor')
    }    
      

    })

    app.get('/totalRefeicoesNaDieta', async(request, reply) => {
        

        const session_id = request.cookies.session_id

        if(!session_id) {

            throw new Error('unauthorized')
        }

        try {

        
        const registros = await knex('Refeicao').where({
            session_id: session_id,
            dentroDaDieta: true
        })
        .count('* as total')

        return reply.code(200).send({DentroDaDieta: registros[0]})
    
    }catch (error) {
        console.log(error)
        return reply.code(500).send('erro interno no servidor')
    }    

    })

    app.get('/totalRefeicoesForaDaDieta', async(request, reply) => {
        

        const session_id = request.cookies.session_id

        if(!session_id) {

            throw new Error('unauthorized')
        }

        try {

        const registros = await knex('Refeicao').where({
            session_id: session_id,
            dentroDaDieta: false
        })
        .count('* as total')

        return reply.code(200).send({ForaDaDieta: registros[0]})
    }
    catch (error) {
        console.log(error)
        return reply.code(500).send('erro interno no servidor')
    }    

    })

    app.get('/melhorSequencia', async (request, reply) => {

        const session_id = request.cookies.session_id

        if(!session_id) {

            throw new Error('unauthorized')
        }

        try {
        const refeicao = await knex('Refeicao').where('session_id', session_id)
        console.log(refeicao)

        let sequenciaAtual = 0
        let maiorSequencia = 0

        refeicao.forEach(refeicoes => {
            if (refeicoes.dentroDaDieta === 1) {
                sequenciaAtual++
                maiorSequencia = Math.max(maiorSequencia, sequenciaAtual)
            } else{
                    sequenciaAtual = 0 
            }
            
        })

        return reply.code(201).send({maiorSequencia})
    }
    catch (error) {
        console.log(error)
        return reply.code(500).send('erro interno no servidor')
    }    
    })


}