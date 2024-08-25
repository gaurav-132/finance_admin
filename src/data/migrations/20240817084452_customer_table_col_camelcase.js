/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up (knex) {
    return knex.schema.alterTable("customers", function (table) {
        table.renameColumn("aadhaar", "aadhaarNumber");
        table.renameColumn("pan", "panNumber");
        table.renameColumn("cheque", "chequePhoto");
        table.renameColumn("first_name", "firstName");
        table.renameColumn("last_name", "lastName");
        table.renameColumn("mobile", "mobileNumber");
        table.renameColumn("permanent_address", "permanentAddress");
        table.renameColumn("current_address", "currentAddress");
        table.renameColumn("work_location", "workLocation");
        table.renameColumn("added_by", "addedBy");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down (knex) {
  return knex.schema.alterTable("customers", function (table) {
    table.renameColumn("aadhaarNumber", "aadhaar");
    table.renameColumn("panNumber", "pan");
    table.renameColumn("chequePhoto", "cheque");
    table.renameColumn("firstName", "first_name");
    table.renameColumn("lastName", "last_name");
    table.renameColumn("mobileNumber", "mobile");
    table.renameColumn("permanentAddress", "permanent_address");
    table.renameColumn("currentAddress", "current_address");
    table.renameColumn("workLocation", "work_location");
    table.renameColumn("addedBy", "added_by");
  });
};
