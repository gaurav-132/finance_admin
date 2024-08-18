/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTableIfNotExists('employees', function(t) {
        t.increments('id').primary();         
        t.integer('userId').notNullable(); 
        t.string('firstName').notNullable(); 
        t.string('lastName').notNullable(); 
        t.string('name').notNullable(); 
        t.string('mobile').notNullable(); 
        t.string('aadhaarNo').notNullable(); 
        t.string('panNo').notNullable(); 
        t.string('check').notNullable(); 
        t.string('markSheet').notNullable(); 
        t.string('photo').notNullable(); 
        t.string('allocatedLocationId').notNullable(); 
        t.timestamp('created_at').defaultTo(knex.fn.now());        
        t.timestamp('updated_at').defaultTo(knex.fn.now()); 
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  
};
