/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const tableExists = await knex.schema.hasTable('employees');
    if (!tableExists) {
        return await table.increments('id').primary();         
        table.integer('userId').notNullable(); 
        table.string('firstName').notNullable(); 
        table.string('lastName').notNullable(); 
        table.string('name').notNullable(); 
        table.string('mobile').notNullable().unique(); 
        table.string('aadhaarNo').notNullable().unique(); 
        table.string('panNo').notNullable().unique(); 
        table.string('check').notNullable().unique(); 
        table.string('markSheet').notNullable().unique(); 
        table.string('photo').notNullable().unique(); 
        table.string('allocatedLocationId').notNullable().unique(); 
        table.timestamp('created_at').defaultTo(knex.fn.now());        
        table.timestamp('updated_at').defaultTo(knex.fn.now()); 
    }
    // return knex.schema.createTableIfNotExists('employees', (table) => {
    //     table.increments('id').primary();         
    //     table.integer('userId').notNullable(); 
    //     table.string('firstName').notNullable(); 
    //     table.string('lastName').notNullable(); 
    //     table.string('name').notNullable(); 
    //     table.string('mobile').notNullable().unique(); 
    //     table.string('aadhaarNo').notNullable().unique(); 
    //     table.string('panNo').notNullable().unique(); 
    //     table.string('check').notNullable().unique(); 
    //     table.string('markSheet').notNullable().unique(); 
    //     table.string('photo').notNullable().unique(); 
    //     table.string('allocatedLocationId').notNullable().unique(); 
    //     table.timestamp('created_at').defaultTo(knex.fn.now());        
    //     table.timestamp('updated_at').defaultTo(knex.fn.now()); 
    // });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('users'); // Drops the users table
}
