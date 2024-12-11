import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {

    await knex.schema.createTable('User', (table) => {
        table.uuid('id').primary().notNullable()
        table.uuid('session_id').after('id').index()
        table.text('name').notNullable()
        table.integer('age').notNullable()
        table.float('height').notNullable()
        table.float('weight').notNullable()
    })

}

export async function down(knex: Knex): Promise<void> {

    await knex.schema.dropTable('User')

}

