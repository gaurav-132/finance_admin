/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable("customers", function (table) {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("aadhaar", 12).notNullable().unique(); // Aadhaar number with 12 digits, unique
        table.string("pan", 10).notNullable().unique(); // PAN number with 10 digits, unique
        table.boolean("cheque").nullable(); // Cheque Photo
        table.string("first_name").notNullable(); // First name
        table.string("last_name").notNullable(); // Last name
        table.string("mobile", 15).notNullable(); // Mobile number
        table.string("occupation").notNullable(); // Occupation
        table.text("permanent_address").notNullable(); // Permanent address
        table.text("current_address").notNullable(); // Current address
        table.string("work_location").notNullable(); // Work location
        table.string("added_by").notNullable(); // Added by (could be a username or ID of the person who added the record)
        table.timestamps(true, true); // Adds created_at and updated_at columns
    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("customers"); // Drops the users table
}
