import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('Refeicao', (table) => {

        table.uuid('id').primary()
        table.text('nome').notNullable(),
        table.text('descricao').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
        table.boolean('dentroDaDieta').notNullable()
        table.uuid('session_id').notNullable()

    })

}


export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('Refeicao')
}

