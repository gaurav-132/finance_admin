/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.table('daily_collections', function(table) {
        table.renameColumn('payment_mode', 'paymentMode');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.table('daily_collections', function(table) {
        table.renameColumn('paymentMode', 'payment_mode');
    });
};
