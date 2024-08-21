import knex from "../config/db.js";

const addCustomerDB = async (customerObj) => {
  await knex("customers").insert(customerObj);
};

const applyFilters = (query, filterObj) => {};

const getCustomersDB = async (filterObj) => {
  const totalQuery = knex("customers").count("id as count");
  applyFilters(totalQuery, filterObj);

  const totalResult = await totalQuery.first();
  const total = totalResult.count;

  let customersQuery = knex("customers").select("*");

  if (filterObj.limit) {
    customersQuery.limit(filterObj.limit);
  }

  if (filterObj.offset) {
    customersQuery.offset(filterObj.offset);
  }

  const customers = await customersQuery;

  return { customers, total };
};

export { addCustomerDB, getCustomersDB };
