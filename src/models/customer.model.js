import knex from "../config/db.js";

const addCustomerDB = async (customerObj) => {
  await knex("customers").insert(customerObj);
};

const getCustomersDB = async (FilterObj) => {
  const customers = await knex("customers");
  return customers;
};

export { addCustomerDB, getCustomersDB };
