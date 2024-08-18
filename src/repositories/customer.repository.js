import { addCustomerDB, getCustomersDB } from "../models/customer.model.js";

const createCustomerService = async (customerObj) => {
  await addCustomerDB(customerObj);
};

const getCustomersService = async (filterObj) => {
  const customers = await getCustomersDB(filterObj);

  return customers;
};

export { createCustomerService, getCustomersService };
