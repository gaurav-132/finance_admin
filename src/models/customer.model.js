import knex from "../config/db.js";

const addCustomerDB = async (customerObj) => {
  await knex("customers").insert(customerObj);
};

export { addCustomerDB };
