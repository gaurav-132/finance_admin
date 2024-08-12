/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    knex.schema.hasTable('employees_monthly_salary').then(function (exists) {
        if (!exists) {
          return knex.schema.createTable('employees_monthly_salary', function (t) {
            t.increments('id').primary();
            t.integer('empId', 11).notNullable();
            t.tinyint('month', 2).notNullable();
            t.integer('year', 4).notNullable();
            t.tinyint('paid', 1).defaultTo(0);
            t.double('paidAmount').nullable();
            t.double('advanceAmountTaken').nullable();
            t.double('totalMonthlyExpense').nullable();
            t.timestamps(true, true);
          });
        }
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable('employees_monthly_salary'); // Drops the users table
};
