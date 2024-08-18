/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTableIfNotExists('loan_requests', function(table) {
        table.increments('id').primary();
        table.integer('customerId');
        table.double('loanAmount');
        table.double('interest');
        table.double('totalAmount')
        table.string('check');
        table.date('startDate').nullable();
        table.date('endDate').nullable();
        table.integer('daysLeft').nullable();
        table.tinyint('isApproved').defaultTo(0);
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  
};
