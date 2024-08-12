/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    const tableExists = await knex.schema.hasTable('employees').then(function (exists){
        if (!exists) {
            return kxex.schema.createTable('employees', function(t){
                t.increments('id').primary();         
                t.integer('userId').notNullable(); 
                t.string('firstName').notNullable(); 
                t.string('lastName').notNullable(); 
                t.string('name').notNullable(); 
                t.string('mobile').notNullable().unique(); 
                t.string('aadhaarNo').notNullable().unique(); 
                t.string('panNo').notNullable().unique(); 
                t.string('check').notNullable().unique(); 
                t.string('markSheet').notNullable().unique(); 
                t.string('photo').notNullable().unique(); 
                t.string('allocatedLocationId').notNullable().unique(); 
                t.timestamp('created_at').defaultTo(knex.fn.now());        
                t.timestamp('updated_at').defaultTo(knex.fn.now()); 
            }); 
        }
    });
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
