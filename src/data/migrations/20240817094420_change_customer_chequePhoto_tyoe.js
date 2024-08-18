/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
  return knex.schema.alterTable("customers", function (table) {
    table.varchar("chequePhoto", 255).alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  return knex.schema.alterTable("customers", function (table) {
    table.integer("chequePhoto").alter();
  });
};
