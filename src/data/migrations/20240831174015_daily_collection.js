/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable('daily_collections', function(table) {
        table.increments('id').primary();
        table.integer('customerId');
        table.integer('loanId');
        table.double('amount');
        table.date('date').nullable();
        table.tinyint('payment_mode').nullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('daily_collections'); 
};
