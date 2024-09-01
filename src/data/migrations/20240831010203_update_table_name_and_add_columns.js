/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
    return knex.schema
      .renameTable('loan_requests', 'loans')
      .then(() => {
        return knex.schema.table('loans', function(table) {
            table.double('amountPaid').defaultTo(null).after('requestedThrough');
            table.string('remark').defaultTo(null).after('amountPaid');
            table.double('loanFixAmount').defaultTo(null).after('remark');
        });
    });
};
  
 

  

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const down = function(knex) {
    return knex.schema
        .table('loans', function(table) {
            table.dropColumn('amountPaid');
            table.dropColumn('remark');
            table.dropColumn('loanFixAmount');
        })
        .then(() => {
            return knex.schema.renameTable('loans', 'loan_requests');
    });
};