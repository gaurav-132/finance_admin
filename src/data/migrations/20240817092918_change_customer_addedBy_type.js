/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.alterTable("customers", function (table) {
    table.integer("addedBy").alter();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.alterTable("customers", function (table) {
    // Reverse the change by converting the column back to a string
    table.string("addedBy").alter();
  });
}
