/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.table('daily_collections', function (table) {
        table.integer('collectedBy').after('payment_mode');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.table('daily_collections', function (table) {
        table.dropColumn('collectedBy'); 
    })
};
