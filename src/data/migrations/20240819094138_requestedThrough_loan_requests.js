/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.table('loan_requests', function (table) {
        table.integer('requestedThrough').after('isApproved');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.table('loan_requests', function (table) {
        table.dropColumn('requestedThrough'); 
    });
};
