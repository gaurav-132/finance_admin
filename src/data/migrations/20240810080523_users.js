/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTableIfNotExists('users', function(table) {
        table.increments('id').primary();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('mobile').notNullable();
        table.string('password').notNullable();
        table.string('showPassword').notNullable();
        table.boolean('isAdmin').notNullable();
        table.boolean('isActive').notNullable().defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable('employees'); // Drops the users table
};
